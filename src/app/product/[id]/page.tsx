import { prisma } from "@/lib/prisma";
import { Truck } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.products.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      discount: true,
      delivery: true,
    },
  });

  if (!product) {
    notFound();
  }

  const arrayImages = product.images;

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex w-full gap-5 bg-amber-50">
          <div>
            <div className="">
              <Image
                src={product.images[0]}
                alt="Product Image"
                width={900}
                height={900}
                className="object-cover"
              />
            </div>
            <div className="flex">
              {arrayImages.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt="Image Produt"
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex w-full gap-5">
              <div>
                <span className="underline text-gray-500">5.0</span> ⭐⭐⭐⭐⭐
              </div>
              <div>
                <span className="underline text-gray-500">Comments</span> 12
              </div>
              <div>
                <span className="underline text-gray-500">Sold</span> 83
              </div>
            </div>
            <div className="p-2 bg-gray-100">
              {product.price.toLocaleString()} VND
            </div>
            <div className="flex gap-5">
              <div>
                <p>Delivery</p>
                <Truck className="text-green-400 text-sm" />
              </div>
              <div className="flex gap-2">
                <div>
                  <div>{product.delivery}</div>
                  <div className="flex items-start gap-1 text-red-500">
                    <p className="text-md">Ship Fee 0</p>
                    <div className="text-sm underline">đ</div>
                  </div>
                  <p className="opacity-40 text-sm">
                    Gift Voucher 15.000 if product delivered late
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-amber-400 mt-50">frbs</div>
      </div>
    </div>
  );
}
