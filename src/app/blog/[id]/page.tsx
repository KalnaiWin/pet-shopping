import { PostCotent } from "@/components/blog/post-cotent";
import { prisma } from "@/lib/prisma";
import { PostWithRelations } from "@/lib/types/define";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: { page?: string };
}

export default async function page({ params, searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const { page } = resolvedSearchParams ?? {};
  const { id } = await params;
  const currentPage = parseInt(page ?? "1", 10);

  const pageSize = 5;

  const allPosts = await prisma.post.findUnique({
    where: { id },
    include: {
      user: true,
      comments: {
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        include: { user: true },
      },
      reactions: { include: { user: true } },
      _count: {
        select: {
          comments: true,
          reactions: true,
        },
      },
    },
  });

  const totalCount = allPosts?._count.comments ?? 0;

  const totalPages = Math.ceil(totalCount / pageSize);

  if (!allPosts) {
    notFound();
  }

  const post = allPosts as PostWithRelations;

  return (
    <div className="w-full md:mt-30 mt-20 md:px-30 px-5">
      <PostCotent
        post={post}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
