import LoginForm from "@/components/auth/login-form";
import React from "react";

export default function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="absolute top-0 object-cover w-full h-screen hidden md:block">
        <img src="/images/auth.png" alt="Authentication" />
      </div>
      <div className="z-10">
        <LoginForm/>
      </div>
    </div>
  );
}
