"use client";
import { useState } from "react";
import QuantityButton from "./quantity-button";
import AddToCartButton from "./submit-cart";
import { cn } from "@/lib/utils";

interface ProductActionProps {
  productId: string;
  className?: string;
}

export default function ProductActions({
  productId,
  className,
}: ProductActionProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={`${cn(className)}`}>
      <div className="my-10 flex justify-around md:justify-start items-center gap-5">
        <p>Amount</p>
        <QuantityButton quantity={quantity} setQuantity={setQuantity} />
      </div>

      <div className="flex gap-5">
        <div className="md:w-1/3 w-full">
          <AddToCartButton productId={productId} quantity={quantity} />
        </div>
      </div>
    </div>
  );
}
