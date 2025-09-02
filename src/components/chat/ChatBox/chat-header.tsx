"use client";

import { useSession } from "@/lib/auth-client";
import { EllipsisVertical, Search } from "lucide-react";
import Image from "next/image";

export default function ChatHeader() {
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-[#182a34]">
      <div className="flex items-center justify-center gap-6">
        <div>
          <Image
            src={"/assets/default.png"}
            alt="Profile Image"
            width={35}
            height={35}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-white">User</p>
          <p className="text-white/40">Online / Offline</p>
        </div>
      </div>
      <div className="flex gap-6 text-white/80">
        <Search/>
        <EllipsisVertical/>
      </div>
    </div>
  );
}
