import EditFormBlog from "@/components/admin/blog/edit-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

interface EditFormProps {
  params: Promise<{ id: string }>;
}

async function getData(productId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return {
    ...data,
  };
}

export default async function EditPage({ params }: EditFormProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams ?? {};
  const data = await getData(id);
  return <EditFormBlog data={data} />;
}
