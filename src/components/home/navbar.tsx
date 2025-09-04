"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "../_components/user-menu";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const isBlogPhotoPage = /^\/blog\/[^\/]+\/photo$/.test(pathname);

  const allowed =
    pathname === "/" ||
    (pathname.startsWith("/blog") && !isBlogPhotoPage) ||
    pathname.startsWith("/product") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/contact");

  if (!allowed) return null;

  const isAdmin = session?.user.role === "ADMIN";

  const navBarItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/product", label: "Product" },
    { href: "/chat", label: "Chat" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full px-30 py-5">
      <div className="flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" width={30} height={30} />
          <p className="text-xl font-bold">Tiddy Pet</p>
        </Link>
        <div className="flex gap-5 ">
          {navBarItems.map((item, idx) => (
            <Link
              href={item.href}
              key={idx}
              className={`text-sm font-medium transition-colors hover:text-blue-300 ${
                item.href === pathname ? "text-blue-500 font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {isAdmin && (
            <Link
              href={"/admin/dashboard"}
              className="p-2 bg-black text-white rounded-sm font-semibold text-sm"
            >
              Admin Dashboard
            </Link>
          )}
          <div>
            {isPending ? null : session?.user ? (
              <UserMenu user={session.user}/>
            ) : (
              <Button
                className="cursor-pointer bg-amber-900"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
