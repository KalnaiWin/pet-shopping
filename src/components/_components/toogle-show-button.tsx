"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ToggleButton({ text, title }: { text: string, title: string }) {
  const [isToggle, setIsToggle] = useState(true);

  return (
    <div className="">
      <div className="flex justify-between w-full items-center p-5 bg-[#f8f8f8]">
        <div className="">
          <p className="md:text-3xl text-2xl font-bold">{title}</p>
        </div>
        <button
          onClick={() => setIsToggle(!isToggle)}
          className="md:px-4 md:py-2 bg-[#2f2f2f] text-white rounded transition-all p-2"
        >
          {isToggle ? (
            <span className="flex gap-2">
              <Eye />
              Hide
            </span>
          ) : (
            <span className="flex gap-2">
              <EyeOff />
              Show
            </span>
          )}
        </button>
      </div>

      {isToggle && (
        <div className="border p-2 mt-5">
          <span className="mt-4 p-4 rounded whitespace-pre-line">{text}</span>
        </div>
      )}
    </div>
  );
}
