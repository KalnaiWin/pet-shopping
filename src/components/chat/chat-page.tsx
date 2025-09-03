// src/app/chat/page-client.tsx
"use client";

import React, { useState } from "react";
import Chat from "@/components/chat/ChatBox/chat";
import ChatLists from "@/components/chat/ChatList/chat-list";
import { AdminAdvisers } from "@/lib/types/define";
import EmptyPage from "./empty";

export default function ChatPage({ allAdmin }: { allAdmin: AdminAdvisers[] }) {
  const [selectedAdmin, setSelectedAdmin] = useState<AdminAdvisers | null>(
    null
  );

  return (
    <div className="flex h-screen w-screen max-h-screen max-w-full overflow-hidden bg-[#091a23]">
      <div className="w-2/5 border-r-[0.5px] border-gray-400">
        <ChatLists allAdmin={allAdmin} onSelectAdmin={setSelectedAdmin} />
      </div>
      <div className="w-full">
        {selectedAdmin ? <Chat admin={selectedAdmin} /> : <EmptyPage />}
      </div>
    </div>
  );
}
