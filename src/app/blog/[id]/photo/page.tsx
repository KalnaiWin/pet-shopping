import { prisma } from "@/lib/prisma";
import React from "react";
import PhotoSection from "@/components/blog/photo-section";
import InfoSection from "@/components/blog/info-section";
import { PostWithInformation } from "@/lib/types/define";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;

  const allImages: PostWithInformation | null = await prisma.post.findUnique({
    where: { id },
    select: {
      images: true,
      user: true,
      title: true,
      content: true,
      status: true,
      topic: true,
      comments: {
        include: {
          user: true,
        },
      },
      reactions: {
        include: {
          user: true,
        },
      },
      createdAt: true,
    },
  });

  if (!allImages) {
    return <div>Post not found</div>;
  }

  return (
    <div className="w-full flex md:flex-row flex-col relative">
      <div className="md:w-2/3 flex flex-col">
        <PhotoSection allImages={allImages.images ?? []} postId={id} />
      </div>
      <div className="md:w-1/3">
        <InfoSection postId={id} PostsInfo={allImages} />
      </div>
    </div>
  );
}
