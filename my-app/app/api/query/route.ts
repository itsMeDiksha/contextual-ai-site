import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  // Static JSON response for demo; no access to request at build time
  return NextResponse.json({ reply: "Hello from static API." });
}
