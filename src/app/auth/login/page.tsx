import ReturnButton from "@/components/_components/return-button";
import LoginForm from "@/components/auth/login-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {

  return (
    <div className="w-full h-screen flex justify-center items-center md:bg-none bg-[#e5adff]">
      <div className="absolute top-0 object-cover w-full h-screen hidden md:block">
        <img src="/images/auth.png" alt="Authentication" />
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
