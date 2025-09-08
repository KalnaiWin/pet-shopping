import React from "react";
import { GetStartedButton } from "../_components/get-started-button";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <div className="w-full min-h-screen inset-0 -z-10">
        <div className="absolute w-full h-screen top-0 left-0 z-10">
          <div className="absolute md:-top-5 top-20 left-4 md:left-10 w-[300px] md:w-[500px] h-[400px] md:h-[600px] rounded-br-[200px] md:rounded-br-[400px] rounded-tr-[60px] md:rounded-tr-[80px] blur-[100px] md:blur-[150px] bg-[#FBE6FF]"></div>
          <div className="absolute md:top-5 top-30 left-0 w-[150px] md:w-[200px] h-[80px] md:h-[100px] rounded-br-[200px] md:rounded-br-[400px] rounded-tr-[60px] md:rounded-tr-[80px] blur-[100px] md:blur-[150px] bg-[#FBE6FF]"></div>
          <img
            src="/images/home.png"
            alt="HomePage"
            width={1400}
            height={900}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-30 w-full">
            <div className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
              <div className="flex flex-col gap-4 md:gap-6 items-start">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  Give your pets the best products
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  Variety products for your pets - make a great connection
                  between pets and owners. Explore more joys at our shop.
                </p>
                <div className="mt-2 md:mt-4">
                  <GetStartedButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
