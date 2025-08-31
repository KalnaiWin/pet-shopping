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
    <div className="w-full px-25 py-10 my-5">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex w-full justify-between">
          <p className="opacity-40 text-md mb-10">
            "Not the best but the most amazing". Choose products suited for your
            pets.
          </p>
          <Link href={"/product"} className="underline hover:font-bold transition-all">
            View all
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 w-full">
        {allProducts.map((product) => {
          const price =
            Number(product.maxPrice) -
            (Number(product.maxPrice) * Number(product.discount)) / 100;
          return (
            <div
              key={product.id}
              className="border-2 shadow-md rounded-sm bg-[#f8f8f8] h-[340px]"
            >
              <Link href={`/product/${product.id}`} className="">
                <Image
                  src={product.images[0]}
                  alt="Image Product"
                  width={500}
                  height={500}
                  className="object-cover rounded-t-sm"
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
    </div>
  );
}
