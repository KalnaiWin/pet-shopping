"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/types/define";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AddItemCartAction(productId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  let cart: Cart | null = await redis.get(`cart-${session.user.id}`);

  const selectedProduct = await prisma.products.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      maxPrice: true,
      price: true,
      images: true,
      discount: true,
    },
  });

  if (!selectedProduct) {
    throw new Error(`No product with this id: ${productId}`);
  }

  let myCart = {} as Cart;

  if (!cart || !cart?.items) {
    myCart = {
      userId: session.user.id,
      items: [
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: Number(selectedProduct.price ?? 0),
          maxPrice: Number(selectedProduct.maxPrice ?? 0),
          images: selectedProduct.images[0],
          discount: Number(selectedProduct.discount ?? 0),
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;
    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        item.quantity += 1;
      }

      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        images: selectedProduct.images[0],
        name: selectedProduct.name,
        price: Number(selectedProduct.price ?? 0),
        maxPrice: Number(selectedProduct.maxPrice ?? 0),
        discount: Number(selectedProduct.discount ?? 0),
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${session.user.id}`, myCart);

  revalidatePath("/", "layout"); // refresh page 
}
