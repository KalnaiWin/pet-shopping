import { Input } from "@/components/ui/input";
import { Mic, Paperclip, SendIcon, Smile } from "lucide-react";
import React from "react";

export default function ChatMessage() {
  return (
    <div className="h-20 px-4 flex items-center gap-6 relative bg-[#182a34] text-white/80">
      <div className="flex gap-6">
        <Smile className="cursor-pointer" />
        <Paperclip className="cursor-pointer" />
      </div>
      <div className="w-full rounded-lg h-10 flex items-center">
        <Input type="text" placeholder="Type a message" className="bg-[#182a34] focus:outline-none" />
      </div>
      <div className="flex items-center justify-center">
        <button>
          <SendIcon className="text-white"/>
          {/* <Mic className="text-white"/> */}
        </button>
      </div>
    </div>
  );
}
