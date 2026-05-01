import { NextRequest, NextResponse } from "next/server";

// TODO: Phase 5 — fan-out to JSearch, Adzuna, and USA Jobs APIs with Redis rate limiting
export async function GET(req: NextRequest) {
  return NextResponse.json({ jobs: [], message: "Job search API coming soon" });
}
