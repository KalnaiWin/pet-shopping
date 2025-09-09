"use client";

import { CATEGORIES } from "@/lib/types/define";
import { slug } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navBarItems = [{ value: "all", label: "All Products" }, ...CATEGORIES];

export default function NavBarProduct() {
  const pathname = usePathname();

  const isDetailPage = /^\/product\/[^\/]+$/.test(pathname);

  if (isDetailPage) return null;

  return (
    <div className="flex flex-col w-full md:mx-30 px-5">
      <div className="items-center gap-3 mt-5">
        <Menu className="hidden md:block" />
        <p>Category</p>
      </div>
      <div className="md:w-2/3 w-full bg-[#646565] h-0.5 mt-5 hidden md:flex" />
      <div className="md:flex md:flex-col md:gap-10 my-5 grid grid-cols-4 gap-3 underline">
        {navBarItems.map((item) => {
          const href =
            item.value === "all"
              ? "/product"
              : `/product/category/${slug(item.value)}`;
          const isActive =
            item.value === "all"
              ? pathname === "/product"
              : pathname.startsWith(href);

          return (
            <Link
              key={item.value}
              href={href}
              className={`transition-all ${
                isActive
                  ? "text-pink-500 font-semibold text-[12px] md:bg-transparent rounded-sm p-1 md:block flex text-center md:text-start justify-center items-center bg-pink-200"
                  : "text-gray-700 hover:text-pink-800 hover:font-bold text-[12px] md:bg-transparent rounded-sm p-1 md:block flex text-center md:text-start justify-center items-center bg-pink-300"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
