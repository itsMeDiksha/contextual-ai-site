// my-app/app/api/query/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let query = "";
  try {
    const body = await req.json();
    query = body?.query ?? "";
  } catch {
    // ignore
  }
  const reply = query
    ? `Mock answer for: "${query}". Backend will be added later.`
    : "Hello! Send { query: 'your question' } in the request body.";
  return NextResponse.json({ reply, citations: [] });
}
