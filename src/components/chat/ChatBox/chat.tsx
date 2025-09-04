import React from "react";
import Image from "next/image";
import {
  EllipsisVertical,
  Paperclip,
  Search,
  SendIcon,
  Smile,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdminAdvisers } from "@/lib/types/define";

export default function Chat({ admin }: { admin: AdminAdvisers }) {
  return (
    <div>
      <div className="h-16 px-4 py-3 flex justify-between items-center bg-[#182a34]">
        <div className="flex items-center justify-center gap-6">
          <div className="rounded-full ">
            <Image
              src={admin.image || "/assets/default.png"}
              alt="Profile Image"
              width={35}
              height={35}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-white">{admin.name}</p>
            <p className="text-white/40">Online / Offline</p>
          </div>
        </div>
        <div className="flex gap-6 text-white/80">
          <Search />
          <EllipsisVertical />
        </div>
      </div>

      <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar"></div>

      <div className="h-20 px-4 flex items-center gap-6 relative bg-[#182a34] text-white/80">
        <div className="flex gap-6">
          <Smile className="cursor-pointer" />
          <Paperclip className="cursor-pointer" />
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <Input
            type="text"
            placeholder="Type a message"
            className="bg-[#182a34] focus:outline-none"
          />
        </div>
        <button>
          <SendIcon className="text-white" />
        </button>
      </div>
    </div>
  );
}
