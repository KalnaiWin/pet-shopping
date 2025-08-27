import { Pagination } from "@/components/_components/pagination";
import PixelText from "@/components/_components/pixel-text";
import PixelTransition from "@/components/animation/PixelTransition/PixelTransition";
import { Badge } from "@/components/ui/badge";
import { Brands, Category } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { badges, badgesCategory, getDataCategory, slug } from "@/lib/utils";
import { divide } from "effect/Duration";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PageProps {
  searchParams?: Promise<{ page?: string }>;
  params: Promise<{ brand: string }>;
}

function toBrands(value: string): Brands | null {
  if (Object.values(Brands).includes(value as Brands)) {
    return value as Brands;
  }
  return null;
}

export default async function Page({ searchParams, params }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;

  const { page } = resolvedSearchParams ?? {};
  const { brand } = resolvedParams;

  const currentPage = parseInt(page ?? "1", 10);
  const pageSize = 12;

  // 🟢 Convert string param into enum safely
  const brandsEnum = toBrands(brand ?? "");
  if (!brandsEnum) {
    return <div>EMpty</div>;
  }

  const totalCount = await prisma.products.count({
    where: { brand: brandsEnum },
  });

  const allProducts = await prisma.products.findMany({
    where: { brand: brandsEnum },
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="relative">
      {totalCount <= 0 ? (
        <div className="text-2xl text-blue-700 font-bold">
          THERE HAVE NOT HAD UPDATED AT THIS CATEGORY YET !!
        </div>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-4 w-full">
            {allProducts.map((product) => {
              const price =
                Number(product.price) -
                (Number(product.price) * Number(product.discount)) / 100;
              return (
                <div
                  key={product.id}
                  className="border-2 shadow-md w-19/20 rounded-sm h-[340px]"
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
                        <Link
                          href={`/product/category/${slug(product.category)}`}
                        >
                          <Badge
                            className={`${badgesCategory(product.category)}`}
                          >
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
      )}
    </div>
  );
}
