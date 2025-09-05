import CartPage from "@/components/product/cart-page";
import { auth } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/types/define";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${session.user.id}`);

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    const unitPrice =
      Number(item.maxPrice) -
      (Number(item.maxPrice) * Number(item.discount)) / 100;
    totalPrice += unitPrice * Number(item.quantity);
  });

  let totalProduct = 0;
  cart?.items.forEach((item) => (totalProduct += item.quantity));

  return (
    <>
      <CartPage
        cart={cart}
        totalPrice={totalPrice}
        totalProduct={totalProduct}
      />
    </>
  );
}
