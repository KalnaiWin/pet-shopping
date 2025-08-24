"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function CreatedPostAction(
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
    schema: postSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.post.create({
    data: {
      images: submission.value.images,
      title: submission.value.title,
      content: submission.value.content,
      userId: session.user.id,
    },
  });

  redirect("/admin/blog");
}

export async function DeletePostAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }

  const postName = formData.get("postName") as string;

  await prisma.post.delete({
    where: {
      id: postName,
    },
  });

  redirect("/admin/blog");
}

export async function EditPostAction(prevState: unknown, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const postName = formData.get("postName") as string;
  await prisma.post.update({
    where: {
      id: postName,
    },
    data: {
      images: submission.value.images,
      title: submission.value.title,
      content: submission.value.content,
      userId: session.user.id,
    },
  });

  redirect("/admin/blog");
}
