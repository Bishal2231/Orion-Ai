import { NextResponse } from 'next/server';

function generateApiKey(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const segments = [8, 4, 4, 4, 12];
  const key = segments
    .map((len) =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    )
    .join('-');
  return `oai-${key}`;
}

export async function POST() {
  const apiKey = generateApiKey();

  return NextResponse.json({
    apiKey,
    createdAt: new Date().toISOString(),
    model: 'orion-v1',
    rateLimit: '100 requests/day (Explorer plan)',
    expiresAt: null,
  });
}
