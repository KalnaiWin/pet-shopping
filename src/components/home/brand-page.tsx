import Image from "next/image";
import React from "react";

const allImageFirst = [
  {
    src: "/images/allcare.png",
  },
  {
    src: "/images/bio.png",
  },
  {
    src: "/images/catchy.png",
  },
  {
    src: "/images/drkyan.png",
  },
  {
    src: "/images/ecopets.png",
  },
  {
    src: "/images/ganador.png",
  },
  {
    src: "/images/hanvet.png",
  },
];

const allImageSecond = [
  {
    src: "/images/meowcat.png",
  },
  {
    src: "/images/minino.png",
  },
  {
    src: "/images/moochie.png",
  },
  {
    src: "/images/orgo.png",
  },
  {
    src: "/images/vemedim.png",
  },
  {
    src: "/images/wanpy.png",
  },
];

export default function BrandPage() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-25 py-6 md:py-10 my-5 overflow-hidden">
      <h1 className="w-full text-center text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 px-2">
        Great brands supported our shop
      </h1>
      
      <div className="animate-marque flex animate-scroll whitespace-nowrap mb-4 md:mb-8">
        {allImageFirst.map((logo, index) => (
          <div 
            key={index}
            className="flex-shrink-0 mx-3 sm:mx-6 md:mx-8 lg:mx-12"
          >
            <Image
              src={logo.src}
              alt="company logo"
              width={120}
              height={120}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {allImageFirst.map((logo, index) => (
          <div 
            key={`duplicate-${index}`}
            className="flex-shrink-0 mx-3 sm:mx-6 md:mx-8 lg:mx-12"
          >
            <Image
              src={logo.src}
              alt="company logo"
              width={120}
              height={120}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
       <div className="animate-marque flex animate-scroll-reverse whitespace-nowrap">
        {allImageSecond.map((logo, index) => (
          <div 
            key={index}
            className="flex-shrink-0 mx-3 sm:mx-6 md:mx-8 lg:mx-12"
          >
            <Image
              src={logo.src}
              alt="company logo"
              width={120}
              height={120}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
        {allImageSecond.map((logo, index) => (
          <div 
            key={`duplicate-${index}`}
            className="flex-shrink-0 mx-3 sm:mx-6 md:mx-8 lg:mx-12"
          >
            <Image
              src={logo.src}
              alt="company logo"
              width={120}
              height={120}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}