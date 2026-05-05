import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { jobApplicationSchema } from "@/lib/validations";

async function getOwnedApplication(id: string, userId: string) {
  return prisma.jobApplication.findFirst({ where: { id, userId } });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await getOwnedApplication(params.id, session.user.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const parsed = jobApplicationSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const updated = await prisma.jobApplication.update({
    where: { id: params.id },
    data: {
      ...(parsed.data.jobTitle !== undefined && { jobTitle: parsed.data.jobTitle }),
      ...(parsed.data.company !== undefined && { company: parsed.data.company }),
      ...(parsed.data.url !== undefined && { url: parsed.data.url || null }),
      ...(parsed.data.status !== undefined && { status: parsed.data.status }),
      ...(parsed.data.notes !== undefined && { notes: parsed.data.notes || null }),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await getOwnedApplication(params.id, session.user.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.jobApplication.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}
