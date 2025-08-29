import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import PhotoSection from "@/components/admin/blog/photo-section";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const allImages = await prisma.post.findUnique({
    where: { id },
    select: {
      images: true,
    },
  });

  if (!allImages) {
    return <div>Post not found</div>;
  }

  return (
    <div className="w-full flex">
      <div className="w-2/3 flex flex-col">
        <PhotoSection allImages={allImages.images ?? []} postId={id} />
      </div>
    </div>
  );
}
