import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { prisma } from "@/lib/prisma";
import { slug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export async function HeroPage() {
  const allProductsBanner = await prisma.banner.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="w-full py-10 my-5 md:px-30 px-5">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Category Products</h1>
        <p className="opacity-40 text-md mb-10">
          A lot of products for you to choose that can make your pets healthier,
          cleaner and GET FAT.
        </p>
      </div>
      <div className="w-full h-screen hidden md:block">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          {/* Left column */}
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={40} className="mb-2 shadow-md">
                {allProductsBanner[0] ? (
                  <Link
                    href={`/product/category/${slug(
                      allProductsBanner[0].title
                    )}`}
                    className="flex h-full items-center justify-center rounded-sm relative"
                  >
                    <Image
                      src={allProductsBanner[0].imageString}
                      alt={allProductsBanner[0].title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full rounded-sm"
                    />
                    <div className="absolute left-4 top-2">
                      <p className="text-2xl font-bold text-white ">
                        {allProductsBanner[0].title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/assets/box.png"}
                          alt="Box"
                          width={20}
                          height={20}
                        />
                        <p className="text-black font-semibold">208 Sold</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div>Empty</div>
                )}
              </ResizablePanel>
              <ResizablePanel defaultSize={60} className="mt-2 shadow-md">
                {allProductsBanner[1] ? (
                  <Link
                    href={`/product/category/${slug(
                      allProductsBanner[1].title
                    )}`}
                    className="flex h-full items-center justify-center rounded-sm relative"
                  >
                    <Image
                      src={allProductsBanner[1].imageString}
                      alt={allProductsBanner[1].title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full rounded-sm"
                    />
                    <div className="absolute left-4 top-2">
                      <p className="text-2xl font-bold text-white ">
                        {allProductsBanner[1].title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/assets/box.png"}
                          alt="Box"
                          width={20}
                          height={20}
                        />
                        <p className="text-black font-semibold">208 Sold</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div>Empty</div>
                )}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          {/* Center column */}
          <ResizablePanel defaultSize={60} className="shadow-md mx-5">
            {allProductsBanner[2] ? (
              <Link
                href={`/product/category/${slug(allProductsBanner[2].title)}`}
                className="flex h-full items-center justify-center rounded-sm relative"
              >
                <Image
                  src={allProductsBanner[2].imageString}
                  alt={allProductsBanner[2].title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full rounded-sm"
                />
                <div className="absolute left-4 top-2">
                  <p className="text-2xl font-bold text-white ">
                    {allProductsBanner[2].title}
                  </p>
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/assets/box.png"}
                      alt="Box"
                      width={20}
                      height={20}
                    />
                    <p className="text-black font-semibold">208 Sold</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div>Empty</div>
            )}
          </ResizablePanel>

          {/* Right column */}
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} className="mb-2 shadow-md">
                {allProductsBanner[3] ? (
                  <Link
                    href={`/product/category/${slug(
                      allProductsBanner[3].title
                    )}`}
                    className="flex h-full items-center justify-center rounded-sm relative"
                  >
                    <Image
                      src={allProductsBanner[3].imageString}
                      alt={allProductsBanner[3].title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full rounded-sm"
                    />
                    <div className="absolute left-4 top-2">
                      <p className="text-2xl font-bold text-white ">
                        {allProductsBanner[3].title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/assets/box.png"}
                          alt="Box"
                          width={20}
                          height={20}
                        />
                        <p className="text-black font-semibold">208 Sold</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div>Empty</div>
                )}
              </ResizablePanel>
              <ResizablePanel defaultSize={40} className="mt-2 shadow-md">
                {allProductsBanner[4] ? (
                  <Link
                    href={`/product/category/${slug(
                      allProductsBanner[4].title
                    )}`}
                    className="flex h-full items-center justify-center rounded-sm relative"
                  >
                    <Image
                      src={allProductsBanner[4].imageString}
                      alt={allProductsBanner[4].title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full rounded-sm"
                    />
                    <div className="absolute left-4 top-2">
                      <p className="text-2xl font-bold text-white ">
                        {allProductsBanner[4].title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/assets/box.png"}
                          alt="Box"
                          width={20}
                          height={20}
                        />
                        <p className="text-black font-semibold">208 Sold</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div>Empty</div>
                )}
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="w-full grid grid-cols-1 gap-2 md:hidden ">
        {allProductsBanner.map((product) => {
          return (
            <Link
              href={`/product/category/${slug(product.title)}`}
              className="flex h-32 items-center justify-center rounded-sm relative"
              key={product.id}
            >
              <Image
                src={product.imageString}
                alt={product.title}
                width={400}
                height={200}
                className="object-cover w-full h-full rounded-sm"
              />
              <div className="absolute left-2 sm:left-4 top-1 sm:top-2">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                  {product.title}
                </p>
                <div className="flex items-center gap-1 sm:gap-2 mt-1">
                  <Image
                    src={"/assets/box.png"}
                    alt="Box"
                    width={16}
                    height={16}
                    className="sm:w-5 sm:h-5"
                  />
                  <p className="text-xs sm:text-sm text-white font-semibold drop-shadow-md">
                    208 Sold
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
