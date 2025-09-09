import NavBarProduct from "@/components/product/navBar";
import Image from "next/image";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-20 w-full">
      <div className="w-full flex flex-col items-center justify-center md:mb-10 relative">
        <Image
          src={"/images/product.png"}
          alt="ProductImage"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full h-auto"
        />
        <div className="backdrop-blur-sm absolute md:top-15 top-1 md:left-110  rotate-4 font-bold -skew-4 text-white border p-2 [text-shadow:_-1px_-1px_3_black,_1px_-1px_3_black,_-1px_1px_3_black,_1px_1px_3_black] flex flex-col items-center">
          <h1 className="font-bold md:text-7xl text-xl">All Product</h1>
          <Link href={"/"} className="underline text-sm">
            Back to home Page
          </Link>
        </div>
      </div>

      <div className="flex md:gap-10 md:flex-row flex-col">
        <div>
          <NavBarProduct />
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
}
