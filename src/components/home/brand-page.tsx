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
    <div className="w-full px-25 py-10 my-5 overflow-hidden">
        <h1 className="w-full text-center text-3xl font-bold mb-5">Great brands supported our shop</h1>
      <div className="animate-marque flex whitespace-nowrap">
        {allImageFirst.map((logo, index) => (
          <Image
            key={index}
            src={logo.src}
            alt="company logo"
            width={400}
            height={400}
            className="mx-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all "
          />
        ))}
        {allImageFirst.map((logo, index) => (
          <Image
            key={`duplicate-${index}`}
            src={logo.src}
            alt="company logo"
            width={400}
            height={400}
            className="mx-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all "
          />
        ))}
      </div>
      <div className="animate-marque flex whitespace-nowrap">
        {allImageSecond.map((logo, index) => (
          <Image
            key={index}
            src={logo.src}
            alt="company logo"
            width={400}
            height={400}
            className="mx-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all "
          />
        ))}
        {allImageSecond.map((logo, index) => (
          <Image
            key={`duplicate-${index}`}
            src={logo.src}
            alt="company logo"
            width={400}
            height={400}
            className="mx-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all "
          />
        ))}
      </div>
    </div>
  );
}
