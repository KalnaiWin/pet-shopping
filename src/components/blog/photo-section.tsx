"use client";

import ReturnButton from "@/components/_components/return-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function PhotoSection({
  allImages,
  postId,
}: {
  allImages: string[];
  postId: string;
}) {
  return (
    <div className="w-full bg-black relative h-screen flex justify-center items-center">
      <div className="absolute top-2 left-2">
        <button className="hover:bg-gray-500 rounded-full p-1">
          <Link href={`/blog/${postId}`}>
            <XIcon className="text-white size-8" />
          </Link>
        </button>
      </div>
      <Carousel className="relative">
        <CarouselContent>
          {allImages.map((image, idx) => (
            <CarouselItem key={idx} className="flex justify-center">
              <div>
                <Image
                  src={image}
                  alt="Image"
                  width={600}
                  height={600}
                  className="object-cover"
                />{" "}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute left-30 top-75">
          <CarouselPrevious className="size-10" />
        </div>
        <div className="absolute right-30 top-75">
          <CarouselNext className="size-10" />
        </div>
      </Carousel>
    </div>
  );
}
