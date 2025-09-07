"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/types/define";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AddItemCartAction(productId: string, quantity: number) {
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
          quantity: quantity,
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
        quantity: quantity,
      });
    }
  }

  await redis.set(`cart-${session.user.id}`, myCart);

  revalidatePath("/", "layout"); // refresh page
}

export async function DeleteCartItemAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  const productId = formData.get("productId");

  let cart: Cart | null = await redis.get(`cart-${session.user.id}`);

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: session.user.id,
      items: cart.items.filter((item) => item.id !== productId),
    };

    await redis.set(`cart-${session.user.id}`, updateCart);
  }

  revalidatePath("/", "layout");
}
