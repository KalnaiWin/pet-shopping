import { Pagination } from "@/components/_components/pagination";
import BodyPage from "@/components/blog/body-page";
import HeaderBlog from "@/components/blog/header-blog";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import React from "react";

interface PageProps {
  searchParams: Promise<{ page?: string; postName: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const { page, postName } = resolvedSearchParams ?? {};
  const currentPage = parseInt(page ?? "1", 10); // parseInt(..., 10) converts that string to an integer.

  const pageSize = 15;
  const postNameFilter = postName || "";

  const whereClause: Prisma.PostWhereInput = postNameFilter
    ? {
        title: {
          contains: postNameFilter, // contains tạo tìm kiếm "chứa" (tương đương %term%)
          mode: Prisma.QueryMode.insensitive, // yêu cầu tìm không phân biệt hoa thường
        },
      }
    : {};

  const allPosts = await prisma.post.findMany({
    where: whereClause,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    include: {
      _count: {
        select: {
          comments: true,
          reactions: true,
        },
      },
    },
  });

  const totalCount = await prisma.post.count({});

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full mt-20">
      <HeaderBlog initialValue={postNameFilter} nameId="postName" />
      <BodyPage allPosts={allPosts} />
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
