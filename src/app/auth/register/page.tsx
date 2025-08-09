import ReturnButton from "@/components/_components/return-button";
import RegisterForm from "@/components/auth/register-form";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="absolute top-0 object-cover w-full h-screen hidden md:block">
        <img src="/images/auth.png" alt="Authentication" />
      </div>
      <div className="absolute z-10 top-0 left-0">
        <ReturnButton href="/" label="Home" />
      </div>
      <div className="z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
