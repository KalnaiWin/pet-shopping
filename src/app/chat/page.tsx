import Chat from "@/components/chat/ChatBox/chat";
import ChatLists from "@/components/chat/ChatList/chat-list";
import { prisma } from "@/lib/prisma";
import { AdminAdvisers } from "@/lib/types/define";
import { divide } from "effect/Duration";
import React from "react";

export default async function page() {
  const allAdmin: AdminAdvisers[] | null = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!allAdmin) {
    return <div></div>;
  }

  return (
    <>
      <div className="flex h-screen w-screen max-h-screen max-w-full overflow-hidden bg-[#091a23]">
        <div className="w-2/5 border-r-[0.5px] border-gray-400">
          <ChatLists allAdmin={allAdmin} />
        </div>
        <div className="w-full">
          {/* <EmptyPage /> */}
          <Chat />
        </div>
      </div>
    </>
  );
}
