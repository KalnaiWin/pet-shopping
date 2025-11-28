"use server";

import { auth } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { Cart } from "@/lib/types/define";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function CheckOut() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) redirect("/");

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    cart?.items.map((item) => {
      const priceInVND = item.maxPrice * (item.discount / 100);
      const unitAmount = Math.round(priceInVND);
      return {
        price_data: {
          currency: "vnd",
          unit_amount: unitAmount,
          product_data: {
            name: item.name,
            images: [item.images],
          },
        },
        quantity: item.quantity,
      };
    }) ?? [];

  if (cart && cart.items) {
    const sess = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/success`,
      metadata: {
        userId: user.id,
      },
    });

    return redirect(sess.url as string);
  }
}
