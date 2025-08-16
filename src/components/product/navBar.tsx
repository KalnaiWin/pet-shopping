"use client";

import { slug } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navBarItems = [
  {
    label: "All Products",
  },
  {
    label: "Products for cat",
  },
  {
    label: "Insects",
  },
  {
    label: "Mushroom",
  },
  {
    label: "Vitamin & Nutrition",
  },
  {
    label: "Toys",
  },
  {
    label: "Pet Milk",
  },
  {
    label: "Hygiene & Beauty",
  },
  {
    label: "Others",
  },
  {
    label: "Discount",
  },
];

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
        {navBarItems.map((item, idx) => {
          const href =
            item.label === "All Products"
              ? "/product"
              : `/product/${slug(item.label)}`;
          const isActive =
            item.label === "All Products"
              ? pathname === "/product"
              : pathname.startsWith(href);
          return (
            <Link
              key={idx}
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
