import { Pagination } from "@/components/_components/pagination";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { badges, badgesCategory, slug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function page({ searchParams }: PageProps) {
  // Await searchParams before accessing its properties
  const resolvedSearchParams = await searchParams;
  const { page } = resolvedSearchParams ?? {};
  const currentPage = parseInt(page ?? "1", 10); // parseInt(..., 10) converts that string to an integer.

  const pageSize = 12;

  const totalCount = await prisma.products.count({});

  const allProducts = await prisma.products.findMany({
    orderBy: { createdAt: "asc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full ml-8">
      <div className="grid grid-cols-4 w-full gap-2">
        {allProducts.map((product) => {
          const price =
            Number(product.price) -
            (Number(product.price) * Number(product.discount)) / 100;
          return (
            <div
              key={product.id}
              className="border-2 shadow-md w-19/20 rounded-sm h-[320px]"
            >
              <Link href={`/product/${product.id}`} className="">
                <Image
                  src={product.images[0]}
                  alt="Image Product"
                  width={500}
                  height={500}
                  className="object-cover rounded-sm"
                />
              </Link>
              <div className="p-2">
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-bold line-clamp-1">
                    {product.name}
                  </p>
                  <div className="flex gap-3 line-clamp-1">
                    <Link href={`/product/brand/${product.brand}`}>
                      <Badge className={`${badges(product.brand)}`}>
                        {product.brand}
                      </Badge>
                    </Link>
                    <Link href={`/product/category/${slug(product.category)}`}>
                      <Badge className={`${badgesCategory(product.category)}`}>
                        {product.category}
                      </Badge>
                    </Link>
                  </div>
                  <div className="font-medium text-[#ff5500] w-full flex gap-2">
                    {price.toLocaleString()} VND
                    {product.discount ? (
                      <div className="bg-[#ff5500] text-white p-1 rounded-sm text-[11px]">
                        -{product.discount}%
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
