"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { commentSchema, postSchema } from "@/lib/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
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
      status: submission.value.status,
      topic: submission.value.topic,
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
      status: submission.value.status,
      topic: submission.value.topic,
      title: submission.value.title,
      content: submission.value.content,
      userId: session.user.id,
    },
  });
  redirect("/admin/blog");
}

export async function AddCommentAction(prevState: unknown, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const submission = parseWithZod(formData, {
    schema: commentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.comment.create({
    data: {
      content: submission.value.content,
      postId: submission.value.postId,
      userId: session.user.id,
    },
  });

  const postId = formData.get("postId") as string;

  revalidatePath(`/blog/${postId}`);
  redirect(`/blog/${postId}`);
}

export async function DeleteCommentAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const commentName = formData.get("commentName") as string;

  const comment = await prisma.comment.findUnique({
    where: { id: commentName },
    include: { post: true },
  });

  if (!comment) {
    return { success: false, message: "Comment not found" };
  }

  const isAdmin = session.user.role === "ADMIN";
  const isAuthor = session.user.id === comment.userId;

  if (!isAdmin && !isAuthor) {
    return { success: false, message: "Not authorized to delete this comment" };
  }

  const postId = comment.postId;

  await prisma.comment.delete({
    where: {
      id: commentName,
    },
  });

  revalidatePath(`/blog/${postId}`);
}

export async function ToggleLikeAction(postId: string, commentId: string) {
  console.log("Stage 1");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return {
      success: false,
      message: "You must be logged in to like posts",
    };
  }

  const userId = session.user.id;

  console.log("Stage 2");

  try {
    console.log("Exsiting Like 1");
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId_commentId: {
          userId,
          postId: postId,
          commentId: commentId || "",
        },
      },
    });

    console.log("Exsiting Like 2");

    if (existingLike) {
      console.log("Delete Like 1");
      await prisma.like.delete({
        where: {
          userId_postId_commentId: {
            userId,
            postId: postId,
            commentId: commentId || "",
          },
        },
      });
      console.log("Delete Like 2");

      return { success: true, liked: false };
    } else {
      console.log("Create Like 3");
      await prisma.like.create({
        data: {
          userId,
          postId: postId ?? null,
          commentId: commentId ?? null,
        },
      });

      console.log("Create Like 4");

      return { success: true, liked: true };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Server error while toggling like",
    };
  }
}

export async function ToggleDisLikeAction(postId: string, commentId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return {
      success: false,
      message: "You must be logged in to like posts",
    };
  }

  const userId = session.user.id;

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId_commentId: {
          userId,
          postId: postId ?? null,
          commentId: commentId ?? null,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId_commentId: {
            userId,
            postId: postId ?? null,
            commentId: commentId ?? null,
          },
        },
      });

      return { success: true, liked: false };
    } else {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });

      return { success: true, liked: true };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Server error while toggling like",
    };
  }
}
