import ChatLists from "@/components/chat/ChatList/chat-list";
import React from "react";
import EmptyPage from "@/components/chat/empty";
import Chat from "./ChatBox/chat";

export default function Main() {
  return (
    <div className="flex h-screen w-screen max-h-screen max-w-full overflow-hidden bg-[#091a23]">
      <div className="w-2/5 border-r-[0.5px] border-gray-400">
        <ChatLists />
      </div>
      <div className="w-full">
        {/* <EmptyPage /> */}
        <Chat />
      </div>
    </div>
  );
}
