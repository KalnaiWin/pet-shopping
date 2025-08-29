// app/api/blog/[id]/reaction/route.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { reactionSchema } from "@/lib/zodSchema";
import { headers } from "next/headers";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const postId = id;
  const body = await req.json();

  const parsed = reactionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const { type } = parsed.data;
  const userId = session.user.id;

  const existing = await prisma.reaction.findFirst({
    where: { userId, postId, commentId: null },
  });

  if (existing) {
    if (existing.type === type) {
      await prisma.reaction.delete({ where: { id: existing.id } });
    } else {
      await prisma.reaction.update({
        where: { id: existing.id },
        data: { type },
      });
    }
  } else {
    await prisma.reaction.create({
      data: { userId, postId, type },
    });
  }

  const counts = await prisma.reaction.groupBy({
    by: ["type"],
    where: { postId },
    _count: true,
  });

  const likes = counts.find((c) => c.type === "LIKE")?._count ?? 0;
  const dislikes = counts.find((c) => c.type === "DISLIKE")?._count ?? 0;

  return NextResponse.json({ likes, dislikes });
}
