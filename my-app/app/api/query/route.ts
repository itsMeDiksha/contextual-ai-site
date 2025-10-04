import { NextResponse } from "next/server";

// Mark this route as static for static export on GitHub Pages
export const dynamic = "force-static";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query") ?? "";
  return NextResponse.json({
    reply: query ? `Mock answer for: "${query}"` : "Hello from static API.",
  });
}
