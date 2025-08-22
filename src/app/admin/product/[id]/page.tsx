import EditForm from "@/components/product/edit-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

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
    price: Number(data.price),       // bigint → number
    discount: Number(data.discount), // bigint → number
    // delivery: data.delivery ,
    stock: Number(data.stock), 
  };
}

export default async function EditPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return <EditForm data={data} />;
}
