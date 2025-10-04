// my-app/app/api/query/route.ts
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query") ?? "";
  return NextResponse.json({
    reply: query ? `Mock answer for: "${query}"` : "Hello from static API.",
  });
}
