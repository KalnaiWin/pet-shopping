"use client";

import SignOutButton from "@/components/auth/sign-out";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBarItems = [
  {
    icons: "/assets/home.png",
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icons: "/assets/group.png",
    label: "Accounts",
    href: "/admin/account",
  },
  {
    icons: "/assets/canned-food.png",
    label: "Products",
    href: "/admin/product",
  },
  {
    icons: "/assets/blog.png",
    label: "Blogs",
    href: "/admin/blog",
  },
  {
    icons: "/assets/booking.png",
    label: "Order",
    href: "/admin/order",
  },
];

interface adminNavbarProps {
  adminName: string | null | undefined;
  adminImage: string | null | undefined;
  adminEmail: string | null | undefined;
}

export default function AdminNavbar({
  adminName,
  adminImage,
  adminEmail,
}: adminNavbarProps) {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col items-start justify-between h-full">
      <div>
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={42} height={42}/>
          <p className="text-3xl font-bold">Tiddy Pet</p>
        </Link>
        <div className="mt-10 space-y-2 w-full">
          {NavBarItems.map((item, idx) => (
            <Link
              href={item.href}
              key={idx}
              className={`flex items-center gap-5 p-5 rounded-xl transition-all ${
                pathname === item.href
                  ? "bg-[#FF7DEC] font-bold"
                  : "bg-[#FFF5FE]"
              }`}
            >
              <Image src={item.icons} alt="icon" width={30} height={30} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-2 w-full">
          <Image
            src={!adminImage ? "/assets/default.png" : adminImage}
            alt="Admin Image"
            width={30}
            height={20}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{adminName}</p>
            <p className="text-sm opacity-50">{adminEmail}</p>
          </div>
        </div>
        <div className="w-full mt-2">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
