import { Filter, Search } from "lucide-react";
import React from "react";
import { Input } from "../../ui/input";

export default function SearchChat() {
  return (
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
  );
}
