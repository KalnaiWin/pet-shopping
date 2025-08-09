"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signInAction } from "@/actions/auth/sign-in.action";

export default function LoginForm() {

  const router = useRouter();

  const [valueEmail, setValueEmail] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);

  const [valuePassword, setValuePassword] = useState("");
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    
        setIsLoading(true);
    
        const formData = new FormData(evt.target as HTMLFormElement);
    
        const { error } = await signInAction(formData);
    
        if (error) {
          toast.error(error);
          setIsLoading(false);
        } else {
          toast.success("Login successfully.");
          router.push("/profile");
        }
  }

  return (
    <form
      className="w-[400px] h-[550px] bg-white flex flex-col items-center gap-2 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.8)] p-5"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-3">
        <img src="/images/logo.png" alt="" />
        <p className="text-3xl font-bold">Tiddy Pet</p>
      </div>
      <h1 className="text-xl font-semibold">Start Your Shopping Journey</h1>
      <p className="text-sm text-[#7F7E83] text-center">
        Create your account to explore many products for your pets, including
        food, hygiene, medicine and much more .
      </p>
      <div className="w-full relative mt-10">
        <Input
          id="email"
          name="email"
          type="email"
          value={valueEmail}
          onChange={(e) => setValueEmail(e.target.value)}
          className="peer rounded-md w-full px-3 py-2.5 transition-all duration-200 outline-none"
          style={{
            border: "2px solid black",
            backgroundColor: "#F2F0F0",
            outline: "none",
            boxShadow: "none",
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.borderColor = "#FF00F2";
            setIsFocusedEmail(true);
          }}
          onBlur={(e) => {
            if (!valueEmail) {
              e.target.style.backgroundColor = "#F2F0F0";
              e.target.style.borderColor = "black";
            } else {
              e.target.style.backgroundColor = "white";
              e.target.style.borderColor = "#FF00F2";
            }
            setIsFocusedEmail(false);
          }}
          placeholder=" "
        />
        <Label
          htmlFor="email"
          className={`absolute left-3 bg-[#F2F0F0] px-1 transition-all duration-200 pointer-events-none ${
            isFocusedEmail || valueEmail
              ? "top-[-10px] text-[#FF00F2] bg-white text-sm"
              : "top-2.5 text-gray-600"
          }`}
        >
          Email
        </Label>
      </div>
      <div className="w-full relative mt-10">
        <div className="flex items-center gap-2 absolute right-0 -top-6">
          <p className="font-light italic text-sm">Forget your password ?</p>
          <Link
            href={"/auth/forget-password"}
            className="text-sm hover:underline text-[#FF00F2]"
          >
            Click here
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={valuePassword}
          onChange={(e) => setValuePassword(e.target.value)}
          className="peer rounded-md w-full px-3 py-2.5 transition-all duration-200 outline-none"
          style={{
            border: "2px solid black",
            backgroundColor: "#F2F0F0",
            outline: "none",
            boxShadow: "none",
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.borderColor = "#FF00F2";
            setIsFocusedPassword(true);
          }}
          onBlur={(e) => {
            if (!valuePassword) {
              e.target.style.backgroundColor = "#F2F0F0";
              e.target.style.borderColor = "black";
            } else {
              e.target.style.backgroundColor = "white";
              e.target.style.borderColor = "#FF00F2";
            }
            setIsFocusedPassword(false);
          }}
          placeholder=" "
        />
        <Label
          htmlFor="password"
          className={`absolute left-3 bg-[#F2F0F0] px-1 transition-all duration-200 pointer-events-none ${
            isFocusedPassword || valuePassword
              ? "top-[-10px] text-[#FF00F2] bg-white text-sm"
              : "top-2.5 text-gray-600"
          }`}
        >
          Password
        </Label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      <div className="flex items-center gap-2 -ml-30 mt-3">
        <p className="font-light italic text-sm">Don't have an account?</p>
        <Link
          href={"/auth/register"}
          className="text-sm text-[#FF00F2] hover:underline"
        >
          Create account
        </Link>
      </div>
      <Button className="w-full cursor-pointer" type="submit" disabled={isLoading}>
        Login In
      </Button>
      <div className="relative w-full h-0.5 bg-black opacity-20 mt-5">
        <p className="absolute -top-3 left-40 bg-white px-2">Or</p>
      </div>
      <div></div>
    </form>
  );
}
