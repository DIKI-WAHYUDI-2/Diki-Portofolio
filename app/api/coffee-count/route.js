import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;
const KV_COUNT_KEY = 'coffee_count';

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

async function kvGet() {
  if (!KV_REST_API_URL) return null;
  try {
    const res = await fetch(`${KV_REST_API_URL}/get/${KV_COUNT_KEY}`, {
      headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.result === 'number' ? data.result : null;
  } catch {
    return null;
  }
}

async function kvSet(value) {
  if (!KV_REST_API_URL) return;
  try {
    await fetch(`${KV_REST_API_URL}/set/${KV_COUNT_KEY}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
      cache: 'no-store',
    });
  } catch {
    // ignore KV errors and fall back to filesystem
  }
}

export async function GET() {
  if (KV_REST_API_URL) {
    const kvCount = await kvGet();
    if (kvCount !== null) return NextResponse.json({ count: kvCount });
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

  if (KV_REST_API_URL) {
    await kvSet(nextCount);
  }

  try {
    ensureFile();
    fs.writeFileSync(countFilePath, JSON.stringify({ count: nextCount }), 'utf8');
  } catch {
    // filesystem write failed; KV may still persist the count
  }

  return NextResponse.json({ count: nextCount });
}

async function getCurrentCount() {
  if (KV_REST_API_URL) {
    const kvCount = await kvGet();
    if (kvCount !== null) return kvCount;
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
