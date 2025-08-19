import { prisma } from "@/lib/prisma"; // adjust to your setup
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, order } = await req.json();

  if (!id || typeof order !== "number") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  await prisma.banner.update({
    where: { id },
    data: { order },
  });

  return NextResponse.json({ success: true });
}
