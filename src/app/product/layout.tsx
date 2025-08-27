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
      <div className="w-full flex flex-col items-center justify-center mb-10 relative">
        <Image
          src={"/images/product.png"}
          alt="ProductImage"
          width={0}
          height={0}
          sizes="100vw"
          className="object-cover w-full h-auto"
        />
        <div className="backdrop-blur-sm absolute top-15 left-110 rotate-4 font-bold -skew-4 text-white border p-2 [text-shadow:_-1px_-1px_3_black,_1px_-1px_3_black,_-1px_1px_3_black,_1px_1px_3_black] flex flex-col items-center">
          <h1 className="font-bold text-7xl">All Product</h1>
          <Link href={"/"} className="underline">
            Back to home Page
          </Link>
        </div>
      </div>

      <div className="flex gap-10">
        <div>
          <NavBarProduct />
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
}
