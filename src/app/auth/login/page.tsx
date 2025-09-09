import ReturnButton from "@/components/_components/return-button";
import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
import React from "react";

export default async function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center md:bg-none bg-[#e5adff]">
      <div className="absolute top-0 object-cover w-full h-screen hidden md:block">
        <Image src="/images/auth.png" alt="Authentication" width={1500} height={100} className="object-cover"/>
      </div>
      <div className="absolute z-10 top-0 left-0">
        <ReturnButton href="/" label="Home" />
      </div>
      <div className="z-10">
        <LoginForm />
      </div>
    </div>
  );
}
