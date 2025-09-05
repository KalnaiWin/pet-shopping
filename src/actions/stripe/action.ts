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

  let cart: Cart | null = await redis.get(`cart-${user.id}`);

  const VND_TO_CAD = 25000;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    cart?.items.map((item) => {
      const priceInCAD = item.maxPrice * (item.discount / 100) / VND_TO_CAD;
      let unitAmount = Math.round(priceInCAD * 100);
      return {
        price_data: {
          currency: "usd",
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
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    });

    return redirect(sess.url as string);
  }
}
