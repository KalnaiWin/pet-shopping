import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FooterPage() {
  return (
    <div className="w-full flex sm:flex-row p-4 sm:p-5 mt-12 sm:mt-20 justify-between items-center gap-4 sm:gap-0">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image
          src={"/images/logo.png"}
          alt="Logo"
          width={40}
          height={40}
          className="sm:w-[50px] sm:h-[50px]"
        />
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Tiddy Pet Shop
        </h1>
      </Link>

      <div className="flex  sm:flex-row gap-3 sm:gap-5 text-center sm:text-left">
        <Link
          href={"/"}
          className="hover:underline font-medium sm:font-semibold text-sm sm:text-base transition-all"
        >
          Terms & Policy
        </Link>
        <Link
          href={"/"}
          className="hover:underline font-medium sm:font-semibold text-sm sm:text-base transition-all"
        >
          Conditions
        </Link>
      </div>
    </div>
  );
}
