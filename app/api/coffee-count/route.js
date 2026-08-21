import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const COUNT_KEY = 'coffee_count';

const countFilePath = path.join(process.cwd(), 'data', 'coffee-count.json');

function ensureFile() {
  const dir = path.dirname(countFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(countFilePath)) {
    fs.writeFileSync(countFilePath, JSON.stringify({ count: 0 }), 'utf8');
  }
}

async function upstashGet() {
  if (!UPSTASH_URL) return null;
  try {
    const res = await fetch(`${UPSTASH_URL}/get/${COUNT_KEY}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data.result;
    const num = Number(raw);
    return Number.isFinite(num) ? num : null;
  } catch {
    return null;
  }
}

async function upstashSet(value) {
  if (!UPSTASH_URL) return;
  try {
    await fetch(`${UPSTASH_URL}/set/${COUNT_KEY}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: String(value) }),
      cache: 'no-store',
    });
  } catch {
    // ignore Upstash errors and fall back to filesystem
  }
}

export async function GET() {
  if (UPSTASH_URL) {
    const upstashCount = await upstashGet();
    if (upstashCount !== null) return NextResponse.json({ count: upstashCount });
  }

  try {
    ensureFile();
    const raw = fs.readFileSync(countFilePath, 'utf8');
    const data = JSON.parse(raw);
    return NextResponse.json({ count: data.count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function POST() {
  const nextCount = (await getCurrentCount()) + 1;

  if (UPSTASH_URL) {
    await upstashSet(nextCount);
  }

  try {
    ensureFile();
    fs.writeFileSync(countFilePath, JSON.stringify({ count: nextCount }), 'utf8');
  } catch {
    // filesystem write failed; Upstash may still persist the count
  }

  return NextResponse.json({ count: nextCount });
}

async function getCurrentCount() {
  if (UPSTASH_URL) {
    const upstashCount = await upstashGet();
    if (upstashCount !== null) return upstashCount;
  }

  try {
    ensureFile();
    const raw = fs.readFileSync(countFilePath, 'utf8');
    const data = JSON.parse(raw);
    return data.count ?? 0;
  } catch {
    return 0;
  }
}
