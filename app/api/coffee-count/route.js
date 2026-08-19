import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

export async function GET() {
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
  try {
    ensureFile();
    const raw = fs.readFileSync(countFilePath, 'utf8');
    const data = JSON.parse(raw);
    const next = { count: (data.count ?? 0) + 1 };
    fs.writeFileSync(countFilePath, JSON.stringify(next), 'utf8');
    return NextResponse.json(next);
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
