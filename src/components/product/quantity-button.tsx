// QuantityButton.tsx
"use client";

export default function QuantityButton({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex w-fit gap-1">
      <button onClick={decrease} className="border w-[30px]">
        -
      </button>
      <input
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="text-center w-[100px] border"
      />
      <button onClick={increase} className="border w-[30px]">
        +
      </button>
    </div>
  );
}
