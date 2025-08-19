"use client";

import { CATEGORIES } from "@/lib/types/define";
import { slug } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navBarItems = [{ value: "all", label: "All Products" }, ...CATEGORIES];

export default function NavBarProduct() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-3 mt-5">
        <Menu />
        <p>Category</p>
      </div>
      <div className="w-full bg-[#646565] h-0.5 mt-5"></div>
      <div className="flex flex-col gap-10 my-5">
        {navBarItems.map((item) => {
          const href =
            item.value === "all" ? "/product" : `/product/${slug(item.value)}`;
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
                  ? "text-pink-500 font-semibold"
                  : "text-gray-700 hover:text-pink-800 hover:font-bold"
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
