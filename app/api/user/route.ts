import { NextRequest, NextResponse } from "next/server";

// TODO: Phase 2/8 — user profile CRUD (register, update username/password)
export async function GET(req: NextRequest) {
  return NextResponse.json({ user: null, message: "User API coming soon" });
}

export async function PATCH(req: NextRequest) {
  return NextResponse.json({ message: "Update user coming soon" });
}
