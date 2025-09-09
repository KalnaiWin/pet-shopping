import MapLocation from "@/components/contact/map-location";
import ResponseEmail from "@/components/contact/response-email";
import FooterPage from "@/components/home/footer-page";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import React from "react";

const contactInfo = [
  {
    icon: (
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-200">
        <MapPin size={28} className="text-pink-900" />
      </div>
    ),
    name: "Location",
    description: "We can response in real time",
    info: "1369/83, Le Hong Phong Street",
  },
  {
    icon: (
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-200">
        <PhoneCall size={28} className="text-pink-900" />
      </div>
    ),
    name: "Phone",
    description: "Call us during working times",
    info: "+123 456 7890",
  },
  {
    icon: (
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-200">
        <Mail size={28} className="text-pink-900" />
      </div>
    ),
    name: "Email",
    description: "Visit our location in real life",
    info: "tiddypet@gmail.com",
  },
];

export default function page() {
  return (
    <div className="w-full mt-25">
      <div className="w-full flex md:flex-row flex-col md:gap-25 justify-center items-center h-full my-10 md:pr-30 md:pl-5">
        <div className="flex flex-col md:w-1/2">
          <MapLocation />
        </div>
        <div className="md:w-1/2 flex flex-col">
          <h1 className="font-bold text-4xl text-pink-800">
            Lets get in touch
          </h1>
          <p className="text-gray-500 mb-8 mt-2">
            Lets we know your problems, we are here for you
          </p>
          <div>
            <ResponseEmail />
          </div>
        </div>
      </div>
      <div className="md:px-25">
        <div className="flex flex-col mt-20 text-center md:text-start">
          <h1 className="font-bold md:text-4xl text-3xl text-pink-800">
            We would love to hear from you
          </h1>
          <p className="opacity-50 mb-8 mt-2">
            Lets we know your problems, we are here for you
          </p>
          <div className="flex md:flex-row flex-col items-center w-full justify-between gap-3">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="flex flex-col md:items-start items-center"
              >
                <div className="">{info.icon}</div>
                <h1 className="text-2xl font-semibold">{info.name}</h1>
                <p className="text-gray-500">{info.description}</p>
                <p className="text-pink-900 underline font-bold">{info.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
}
