import React from "react";
import { GetStartedButton } from "../_components/get-started-button";

export default function HomePage() {
  return (
    <div className="w-full h-screen relative">
      <div className="w-full h-screen inset-0 -z-10">
        <div className="absolute w-full h-screen top-0 left-0 z-10">
          <div className="absolute -top-5 left-10 w-[500px] h-[600px] rounded-br-[400px] rounded-tr-[80px] blur-[150px] bg-[#FBE6FF]"></div>
          <div className="absolute top-5 left-0 w-[200px] h-[100px] rounded-br-[400px] rounded-tr-[80px] blur-[150px] bg-[#FBE6FF]"></div>
          <img
            src="/images/home.png"
            alt=""
            width={1400}
            height={900}
            className="object-cover"
          />
        </div>
        <div className="absolute top-40 left-30 z-10 flex flex-col gap-5 items-start w-2/5">
          <h1 className="text-6xl font-bold">
            Give your pets the best products
          </h1>
          <p className="">
            Variety products for your pets - make a great connection between
            pets and owners. Explore more joys at our shop.
          </p>
          <div>
            <GetStartedButton />
          </div>
        </div>
      </div>
    </div>
  );
}
