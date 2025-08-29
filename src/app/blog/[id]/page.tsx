import { PostCotent } from "@/components/admin/blog/post-cotent";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PostWithRelations } from "@/lib/types/define";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

const allPosts = await prisma.post.findUnique({
  where: { id },
  include: {
    user: true,
    comments: { include: { user: true } },
    reactions: { include: { user: true } },
    _count: {
      select: {
        comments: true,
        reactions: true,
      },
    },
  },
});

  if (!allPosts) {
    notFound();
  }

  const isAuthor =
    session?.user.id === allPosts.userId || session?.user.role === "ADMIN";

  const post = allPosts as PostWithRelations;

  return (
    <div className="w-full mt-30 px-30">
      <PostCotent isAuthor={isAuthor} post={post} />
    </div>
  );
}
