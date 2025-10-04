import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { query = "" } = await req.json().catch(() => ({}));
  return NextResponse.json({ reply: `Mock answer for: "${query}"` });
}
