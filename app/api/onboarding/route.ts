import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const onboardingSchema = z.object({
  degree: z.string().min(1),
  graduationDate: z.string().min(1),
  experience: z.string().min(1),
  skills: z.string().optional(),
  jobPreferences: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const profile = await prisma.userProfile.upsert({
    where: { userId: session.user.id },
    update: { ...parsed.data, onboardingDone: true },
    create: { userId: session.user.id, ...parsed.data, onboardingDone: true },
  });

  return NextResponse.json({ profile }, { status: 200 });
}
