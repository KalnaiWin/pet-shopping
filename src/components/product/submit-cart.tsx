"use client";

import { AddItemCartAction } from "@/actions/cart/action";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await AddItemCartAction(productId);
        toast.success("Added to cart!");
      } catch (err) {
        toast.error("Failed to add to cart");
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="p-2 px-5 text-2xl rounded-md text-white bg-[#ff5100] font-light hover:bg-[#ae3700]"
    >
      {isPending ? "Adding…" : "Add to cart"}
    </button>
  );
}
