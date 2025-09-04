// app/api/cart/total/route.ts
import { redis } from "@/lib/redis";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Cart } from "@/lib/types/define";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  let total = 0;

  if (session?.user) {
    const cart: Cart | null = await redis.get(`cart-${session.user.id}`);
    total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }

  return NextResponse.json({ total });
}
