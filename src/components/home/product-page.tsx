import { prisma } from "@/lib/prisma";
import { badges, badgesCategory, slug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default async function ProductPage() {
  const allProducts = await prisma.products.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full py-6 md:py-10 my-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-30">
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>
        <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-3 sm:gap-0 mb-5 md:mb-0">
          <p className="opacity-40 text-sm sm:text-md mb-6 sm:mb-10 leading-relaxed">
            Not the best but the most suitable option. Choose products suited for
            your pets.
          </p>
          <Link
            href={"/product"}
            className="underline hover:font-bold transition-all text-sm sm:text-base self-start sm:self-auto flex-shrink-0"
          >
            View all
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 w-full">
        {allProducts.map((product) => {
          const price =
            Number(product.maxPrice) -
            (Number(product.maxPrice) * Number(product.discount)) / 100;
          return (
            <div
              key={product.id}
              className="border-2 shadow-md rounded-sm bg-[#f8f8f8] flex flex-col"
            >
              <Link href={`/product/${product.id}`} className="flex-shrink-0">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt="Image Product"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    className="object-cover rounded-t-sm hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 flex-grow">
                <p className="text-xs sm:text-sm md:text-base font-medium sm:font-bold line-clamp-2">
                  {product.name}
                </p>

                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <Link
                    href={`/product/brand/${product.brand}`}
                    className="w-fit"
                  >
                    <Badge
                      className={`${badges(
                        product.brand
                      )} text-xs px-1.5 py-0.5`}
                    >
                      {product.brand}
                    </Badge>
                  </Link>
                  <Link
                    href={`/product/category/${slug(product.category)}`}
                    className="w-fit"
                  >
                    <Badge
                      className={`${badgesCategory(
                        product.category
                      )} text-xs px-1.5 py-0.5`}
                    >
                      {product.category}
                    </Badge>
                  </Link>
                </div>

                <div className="font-medium text-[#ff5500] w-full flex flex-col sm:flex-row gap-1 sm:gap-2 items-start sm:items-center mt-auto">
                  <span className="text-sm sm:text-base">
                    {price.toLocaleString()} VND
                  </span>
                  {product.discount ? (
                    <div className="bg-[#ff5500] text-white px-1.5 py-0.5 rounded-sm text-xs font-semibold">
                      -{product.discount}%
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
