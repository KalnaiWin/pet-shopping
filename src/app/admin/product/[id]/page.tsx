import EditFormProduct from "@/components/product/edit-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

interface EditFormProps {
  params: Promise<{ id: string }>;
}

async function getData(productId: string) {
  const data = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return {
    ...data,
    price: Number(data.price), // bigint → number
    maxPrice: Number(data.maxPrice), // bigint → number
    discount: Number(data.discount), // bigint → number
    // delivery: data.delivery ,
    stock: Number(data.stock),
  };
}

export default async function EditPage({ params }: EditFormProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams ?? {};
  const data = await getData(id);
  return <EditFormProduct data={data} />;
}
