// AddToCartButton.tsx
"use client";
import { AddItemCartAction } from "@/actions/cart/action";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddToCartButton({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await AddItemCartAction(productId, quantity);
        toast.success(`Added ${quantity} to cart!`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to add to cart");
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="p-2 px-5 text-2xl rounded-md text-white bg-[#ff5100] font-light hover:bg-[#ae3700] w-full"
    >
      {isPending ? "Adding…" : "Add to cart"}
    </button>
  );
}
