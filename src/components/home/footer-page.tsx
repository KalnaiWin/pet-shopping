import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FooterPage() {
  return (
    <div className="w-full flex p-5 mt-20 justify-between items-center">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image src={"/images/logo.png"} alt="Logo" width={50} height={50} />
        <h1 className="font-bold text-3xl">Tiddy Pet Shop</h1>
      </Link>
      <div className="flex gap-5">
        <Link href={"/"} className="hover:underline font-semibold">
          Term & Policy
        </Link>
        <Link href={"/"} className="hover:underline font-semibold">
          Conditions
        </Link>
      </div>
    </div>
  );
}
