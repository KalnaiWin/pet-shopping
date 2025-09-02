import Image from "next/image";
import React from "react";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="relative rounded-full">
        <div className="absolute bg-[#c800ff] size-100 rounded-full center-absolute gif-border z-10"/>
        <Image
          src={"/images/logo.png"}
          alt="Logo"
          width={300}
          height={300}
          className="gif-circle z-20 relative"
        />
      </div>
    </div>
  );
}
