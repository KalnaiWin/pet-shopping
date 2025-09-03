import React from "react";
import HeaderChat from "./header-chat";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AdminAdvisers } from "@/lib/types/define";
import Image from "next/image";

export default function ChatLists({ allAdmin }: { allAdmin: AdminAdvisers[] }) {
  return (
    <div className="max-h-screen flex flex-col ">
      <HeaderChat />
      <div>
        <div className="bg-[#071d29] flex py-3 pr-5 w-full items-center gap-5">
          <div className="flex  items-center gap-5 relative w-full ">
            <div>
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-white/40 cursor-pointer" />
            </div>
            <Input
              type="search"
              placeholder="Search ... "
              className="text-sm focus:outline-none text-white w-full indent-6 bg-[#182a34]"
            />
          </div>
          <div>
            <Filter className="text-white/70" />
          </div>
        </div>
        <div className="custom-scrollbar overflow-auto flex-auto h-screen bg-[#071d29] text-white/70">
          <div className="flex flex-col px-5 mt-4">
            {allAdmin.map((admin) => {
              return (
                <div key={admin.id} className="flex w-full items-center">
                  <div className="flex w-full items-center gap-2">
                    <div>
                      <Image
                        src={admin.image ? admin.image : "/assets/default.png"}
                        alt="Admin Image"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-md text-white">{admin.name}</p>
                        <p className="text-sm">Online</p>
                      </div>
                      {/* Chat section */}
                      <p className="text-sm">Hi there ...</p>
                    </div>
                  </div>
                  <span>
                    12.07PM
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
