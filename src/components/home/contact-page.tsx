import { ArrowLeft, ArrowRight, Mail, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const contactInfo = [
  {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-200">
        <MapPin size={24} className="text-pink-900" />
      </div>
    ),
    name: "Location",
    description: "We can response in real time",
    info: "1369/83, Le Hong Phong Street",
  },
  {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-200">
        <PhoneCall size={24} className="text-pink-900" />
      </div>
    ),
    name: "Phone",
    description: "Call us during working times",
    info: "+123 456 7890",
  },
  {
    icon: (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-200">
        <Mail size={24} className="text-pink-900" />
      </div>
    ),
    name: "Email",
    description: "Visit our location in real life",
    info: "tiddypet@gmail.com",
  },
];

export default function ContactPage() {
  return (
    <div className="w-full px-25 h-screen flex items-center gap-20">
      <div className="w-1/3 h-[80%] relative">
        <Image
          src="/images/vet.png"
          alt="vet Doctor"
          fill
          className="object-cover object-top-left shadow-xl"
        />
      </div>
      <div className="flex flex-col gap-5 w-2/3">
        <h1 className="text-4xl font-bold text-[#bd007e]">Let's we help you</h1>
        <div className="flex w-full justify-between">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="">{info.icon}</div>
              <h1 className="text-xl font-semibold">{info.name}</h1>
              <p className="text-gray-500 text-sm">{info.description}</p>
              <p className="text-pink-900 underline text-sm font-bold">
                {info.info}
              </p>
            </div>
          ))}
        </div>
        <div className="relative flex bg-[#760057] items-start justify-between gap-6 p-6 overflow-hidden rounded-md">
          <div className="absolute top-0 -right-40 w-2/3 h-full bg-[#c60091] clip-path-slant hidden md:block z-10" />
          <div className="text-white max-w-lg text-center md:text-left z-20">
            <h2 className="text-2xl font-medium mb-4">Advisers from experts</h2>
            <p className="text-blue-100 text-sm">
              We always ready to resolve all your issues
            </p>
          </div>
          <div className="z-20">
            <Link
              href={"/chat"}
              className="flex cursor-pointer bg-[#760057] text-white p-4 rounded-sm gap-2 relative items-center"
            >
              <span>Message</span>
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
        <div className="relative flex bg-[#760057] items-start justify-between gap-6 p-6 overflow-hidden rounded-md">
          <div className="absolute top-0 -right-40 w-2/3 h-full bg-[#c60091] clip-path-slant hidden md:block z-10" />

          <div className="text-white max-w-lg text-center md:text-left z-20">
            <h2 className="text-2xl font-medium mb-4">Reports</h2>
            <p className="text-blue-100 text-sm">
              If there is any problems, please contac with us
            </p>
          </div>
          <div className="z-20">
            <Link
              href={"/contact"}
              className="flex cursor-pointer bg-[#760057] text-white p-4 rounded-sm gap-2 relative items-center"
            >
              <span>Contact</span>
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
