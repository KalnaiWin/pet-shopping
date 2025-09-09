"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productsSchema } from "@/lib/zodSchema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// npm i zod
// npm install @conform-to/react @conform-to/zod zod

export async function CreateProductAction(
  prevState: unknown,
  formData: FormData
) {
  // console.log("Server action triggered!");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productsSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  // console.log("Go to product create");

  await prisma.products.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price ?? null,
      maxPrice: submission.value.maxPrice,
      delivery: submission.value.delivery,
      status: submission.value.status,
      images: flattenUrls,
      discount: submission.value.discount ?? 0,
      stock: submission.value.stock,
      category: submission.value.category,
      brand: submission.value.brand,
      origin: submission.value.origin,
      expired: submission.value.expired,
    },
  });

  // console.log("Go out and redirect to product");

  redirect("/admin/product");
}

export async function EditProductAction(
  prevState: unknown,
  formData: FormData
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: productsSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;
  await prisma.products.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price ?? null,
      maxPrice: submission.value.maxPrice,
      delivery: submission.value.delivery,
      status: submission.value.status,
      images: flattenUrls,
      discount: submission.value.discount ?? 0,
      stock: submission.value.stock,
      category: submission.value.category,
      brand: submission.value.brand,
      origin: submission.value.origin,
      expired: submission.value.expired,
    },
  });

  redirect("/admin/product");
}

export async function DeleteProductAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }
  const productId = formData.get("productId") as string;

  await prisma.products.delete({
    where: {
      id: productId,
    },
  });

  redirect("/admin/product");
}

export async function CreateBannerAction(
  prevState: unknown,
  formData: FormData
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const count = (await prisma.banner.count()) + 1;

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
      order: count,
    },
  });

  redirect("/admin/banner");
}

export async function DeleteBannerAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }
  const bannerId = formData.get("bannerId") as string;

  await prisma.banner.delete({
    where: {
      id: bannerId,
    },
  });

  revalidatePath("/", "layout");
}
