import ToggleButton from "@/components/_components/toogle-show-button";
import CommentProduct from "@/components/product/comment-product";
import ProductImagesSelector from "@/components/product/product-images.selector";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { ProductsCommentInfo } from "@/lib/types/define";
import { badges, badgesCategory, slug } from "@/lib/utils";
import { Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ProductActions from "@/components/product/add-amount";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: { page?: string };
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const { id } = await params;
  const { page } = resolvedSearchParams ?? {};
  const currentPage = parseInt(page ?? "1", 10);

  const pageSize = 5;

  const product: ProductsCommentInfo | null = await prisma.products.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      brand: true,
      price: true,
      maxPrice: true,
      images: true,
      expired: true,
      discount: true,
      delivery: true,
      stock: true,
      origin: true,
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const productCategory = product?.category;

  const RecommendProduct = await prisma.products.findMany({
    where: {
      category: productCategory,
    },
    take: 5,
  });

  if (!product || !product.id) {
    notFound();
  }

  const totalCount = product._count.comments ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const arrayImages = product.images;

  const discountPrice =
    Number(product.price) -
    Math.ceil((Number(product.price) * Number(product.discount)) / 100);
  const discountMaxPrice =
    Number(product.maxPrice) -
    Math.ceil((Number(product.maxPrice) * Number(product.discount)) / 100);

  // const addProductCart = AddItemCartAction.bind(null, product.id);

  return (
    <div className="w-full md:pr-10">
      <div className="w-full">
        {/* PRODUCT INFO */}
        <div className="flex md:flex-row flex-col w-full gap-10 bg-white p-2 shadow-md my-10">
          <div>
            <ProductImagesSelector
              product={product}
              arrayImages={arrayImages}
            />
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-bold my-4">{product.name}</h1>
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
            <div className="py-5 px-8 bg-[#f8f8f8] my-4 flex gap-5 items-end">
              <div className="text-3xl font-bold flex gap-3">
                {product.price && (
                  <div className="flex gap-3">
                    <div className="relative">
                      <span className="absolute top-0 -left-3 underline text-[20px]">
                        đ
                      </span>{" "}
                      {discountPrice.toLocaleString()}
                    </div>
                    <div>-</div>
                  </div>
                )}

                <div className="relative ml-3">
                  <span className="absolute top-0 -left-3 underline text-[20px]">
                    đ
                  </span>{" "}
                  {discountMaxPrice.toLocaleString()}
                </div>
              </div>
              <div className="font-semibold py-1 px-2 rounded-sm opacity-50 relative">
                <div className="absolute w-full bg-gray-900 h-0.5 top-4 left-0"></div>
                <div className="flex gap-3 items-center">
                  {product.price && (
                    <div className="relative">
                      <span className="absolute top-0.5 -left-1.5 underline text-[10px]">
                        đ
                      </span>
                      {product.price.toLocaleString()}
                    </div>
                  )}
                  <div className="relative ml-3">
                    <span className="absolute top-0.5 -left-1.5 underline text-[10px]">
                      đ
                    </span>
                    {product.maxPrice.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="bg-[#ff5100] text-white font-semibold py-1 px-2 rounded-sm">
                -{product.discount}%
              </div>
            </div>
            <div className="flex gap-5">
              <div>
                <p>Delivery</p>
                <Truck className="text-green-400 text-sm" />
              </div>
              <div className="flex gap-2">
                <div>
                  <div className="">Take from {product.delivery}</div>
                  <div className="flex items-start gap-1 text-red-500 my-3">
                    <p className="text-md">Ship Fee 0</p>
                    <div className="text-sm underline">đ</div>
                  </div>
                  <p className="opacity-40 text-sm">
                    Gift Voucher 15.000 if product delivered late
                  </p>
                </div>
              </div>
            </div>
            <ProductActions productId={product.id} className="w-full" />
          </div>
        </div>
        {/* DETAIL */}
        <div className="md:mx-20 px-5">
          <div className="flex flex-col my-10">
            <p className="md:text-3xl text-2xl font-bold py-5 px-4 bg-[#f8f8f8]">
              Detail Product
            </p>
            <Table className="border-separate mt-5">
              <TableBody>
                <TableRow>
                  <TableCell className="border border-r-0 border-b-0 p-5">
                    Category
                  </TableCell>
                  <TableCell className="border border-l-0 border-b-0 p-5">
                    <Link
                      href={`/product/category/${slug(product.category)}`}
                      className="text-blue-500"
                    >
                      {product.category}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell className="border border-r-0 border-b-0 p-5">
                    Total in Warehouse
                  </TableCell>
                  <TableCell className="border border-l-0 border-b-0 p-5">
                    {product.stock}
                  </TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell className="border border-r-0 border-b-0 p-5">
                    Brand
                  </TableCell>
                  <TableCell className="border border-l-0 border-b-0 p-5">
                    <Link
                      href={`/product/brand/${product.brand}`}
                      className="text-blue-500"
                    >
                      {product.brand}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell className="border border-r-0 border-b-0 p-5">
                    Origin
                  </TableCell>
                  <TableCell className="border border-l-0 border-b-0 p-5">
                    {product.origin}
                  </TableCell>
                </TableRow>
                <TableRow className="">
                  {product.expired !== "null" && (
                    <>
                      <TableCell className="border border-r-0 border-b-0 p-5">
                        Expired
                      </TableCell>
                      <TableCell className="border border-l-0 border-b-0 p-5">
                        {product.expired}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/* DESCRIPTION */}
          <div className="my-10">
            <ToggleButton
              text={product.description}
              title="Description Product"
            />
          </div>
          <CommentProduct
            currentPage={currentPage}
            totalPages={totalPages}
            allProducts={product}
          />
          <div className=" w-full my-10">
            <div className="my-5 flex w-full justify-between">
              <h1 className="text-2xl font-bold">Recommend for you</h1>
              <Link
                href={`/product/category/${slug(product.category)}`}
                className="underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-5 w-full">
              {RecommendProduct.map((product) => {
                const price =
                  Number(product.maxPrice) -
                  (Number(product.maxPrice) * Number(product.discount)) / 100;
                return (
                  <div
                    key={product.id}
                    className="border-2 shadow-md md:w-18/19 w-fit rounded-sm md:h-[340px] h-fit overscroll-auto"
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
                        <div className="font-medium text-[#ff5500] w-full flex md:flex-row flex-col gap-2">
                          <div>{price.toLocaleString()} VND</div>
                          {product.discount ? (
                            <div className="bg-[#ff5500] text-center text-white p-1 rounded-sm text-[11px]">
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
        </div>
      </div>
    </div>
  );
}
