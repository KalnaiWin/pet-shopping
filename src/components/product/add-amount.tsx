"use client";
import { useState } from "react";
import QuantityButton from "./quantity-button";
import AddToCartButton from "./submit-cart";

export default function ProductActions({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <div className="my-10 flex items-center gap-5">
        <p>Amount</p>
        <QuantityButton quantity={quantity} setQuantity={setQuantity} />
      </div>

      <div className="flex gap-5">
        <div className="w-1/3">
          <AddToCartButton productId={productId} quantity={quantity} />
        </div>
      </div>
    </div>
  );
}
