import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

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
        model: 'orion',
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to get a response from the Orion engine. Please ensure the service is running.' },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      answer: data.response,
      model: 'orion-v1',
      usage: {
        prompt_tokens: prompt.split(/\s+/).length,
        completion_tokens: data.response?.split(/\s+/).length || 0,
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
