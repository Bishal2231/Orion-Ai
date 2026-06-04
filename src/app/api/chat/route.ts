import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import Chat from '../../../models/Chat';

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > windowMs) {
    record.count = 1;
    record.lastReset = now;
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before sending another message.' },
        { status: 429 }
      );
    }

    const { prompt, model = 'orion' } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'A "prompt" field (string) is required in the request body.' },
        { status: 400 }
      );
    }

    const apiUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434/api/generate';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { error: 'Failed to get a response from the Orion engine. Please ensure the service is running.' },
        { status: 502 }
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let fullResponse = '';

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.trim()) continue;
              try {
                const parsed = JSON.parse(line);
                if (parsed.response) {
                  fullResponse += parsed.response;
                  controller.enqueue(encoder.encode(parsed.response));
                }
              } catch (e) {
                // Ignore parse errors on incomplete chunks
              }
            }
          }

          if (buffer.trim()) {
            try {
              const parsed = JSON.parse(buffer);
              if (parsed.response) {
                fullResponse += parsed.response;
                controller.enqueue(encoder.encode(parsed.response));
              }
            } catch (e) {}
          }
        } catch (error) {
          controller.error(error);
        } finally {
          // Save to database BEFORE closing the controller.
          // This prevents Next.js from terminating the function before the save finishes.
          try {
            await dbConnect();
            await Chat.create({
              prompt,
              response: fullResponse,
              aiModel: model
            });
          } catch (dbError) {
            console.error('Failed to save chat to database:', dbError);
          }
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Unable to connect to the Orion engine. Is the service running on localhost:11434?' },
      { status: 500 }
    );
  }
}
// 
