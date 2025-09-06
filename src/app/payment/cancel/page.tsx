import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="border flex flex-col justify-center items-center p-5 text-center gap-2 w-fit">
        <div className="w-18 h-18 flex items-center justify-center rounded-full bg-red-200">
          <XIcon size={64} className="text-red-900" />
        </div>{" "}
        <h1 className="font-bold text-3xl text-center">Payment Cancelled</h1>
        <p className=" opacity-50 text-md text-center">
          Something want wrong with your payment. You havent been charged.
          Please try again
        </p>
        <Button className="bg-red-700 text-white hover:bg-red-900" asChild>
          <Link href={"/"}>Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
