"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImagesSelector({
  product,
  arrayImages,
}: {
  product: any;
  arrayImages: string[];
}) {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div>
      <div>
        <Image
          src={mainImage}
          alt="Product Image"
          width={900}
          height={900}
          className="object-cover rounded-lg border-2"
        />
      </div>

      <div className="flex gap-2 mt-4 w-full justify-between">
        {arrayImages.map((image, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(image)}
            className="focus:outline-none"
          >
            <Image
              src={image}
              alt={`Product thumbnail ${idx + 1}`}
              width={100}
              height={100}
              className={`object-cover rounded-sm border-2 ${
                mainImage === image
                  ? "border-blue-600"
                  : "border-transparent hover:border-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
