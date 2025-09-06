import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="w-full h-screen flex justify-center items-center p-2">
      <div className="flex flex-col gap-2 justify-center items-center border w-fit p-5">
        <div className="w-18 h-18 flex items-center justify-center rounded-full bg-green-200">
          <Check size={64} className="text-green-900" />
        </div>{" "}
        <h1 className="font-bold text-3xl text-center">Payment Successfully</h1>
        <p className=" opacity-50 text-md text-center">
          Congrats to yuor purchase. Your payment was successfully. We hope you
          enjoy your product.
        </p>
        <Button className="bg-green-700 text-white hover:bg-green-900" asChild>
          <Link href={"/"}>Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
