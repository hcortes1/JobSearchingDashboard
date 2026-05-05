import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { jobApplicationSchema } from "@/lib/validations";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const applications = await prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    orderBy: { appliedAt: "desc" },
  });

  return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = jobApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const application = await prisma.jobApplication.create({
    data: {
      userId: session.user.id,
      jobTitle: parsed.data.jobTitle,
      company: parsed.data.company,
      url: parsed.data.url || null,
      status: parsed.data.status,
      notes: parsed.data.notes || null,
    },
  });

  return NextResponse.json(application, { status: 201 });
}
