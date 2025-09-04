import { User } from "@/generated/prisma";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/types/define";

interface UserMenuProps {
  user: User;
}

export default async function ReturnTotal({ user }: UserMenuProps) {
  const cart: Cart | null = await redis.get(`cart-${user.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return total;
}
