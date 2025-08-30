import { Pagination } from "@/components/_components/pagination";
import BodyPage from "@/components/blog/body-page";
import HeaderBlog from "@/components/blog/header-blog";
import { Topic } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import React from "react";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ topic?: string }>;
}

function toTopic(value: string): Topic | null {
  if (Object.values(Topic).includes(value as Topic)) {
    return value as Topic;
  }
  return null;
}

export default async function page({ searchParams, params }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const { page } = resolvedSearchParams ?? {};
  const { topic } = resolvedParams;

  const currentPage = parseInt(page ?? "1", 10);
  const pageSize = 15;

  const topicEnum = toTopic(topic ?? "");
  if (!topicEnum) {
    return <div>Empty</div>;
  }

  const totalCount = await prisma.post.count({
    where: {
      topic: topicEnum,
    },
  });

  const allPosts = await prisma.post.findMany({
    where: {
      topic: topicEnum,
    },
    orderBy: { createdAt: "desc" },
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

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full mt-20">
      <HeaderBlog initialValue="" nameId="" />
      <BodyPage allPosts={allPosts} />
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
