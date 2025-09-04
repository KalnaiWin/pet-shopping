"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2, ShoppingBag } from "lucide-react";

export default function SubmitCart() {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? (
        <Button
          disabled
          className="p-7 text-2xl bg-[#ff5100] font-light hover:bg-[#ae3700]"
        >
          <Loader2 className="mr-4 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button
          className="p-7 text-2xl bg-[#ff5100] font-light hover:bg-[#ae3700]"
          type="submit"
        >
          <ShoppingBag /> Add to Cart
        </Button>
      )}
    </div>
  );
}
