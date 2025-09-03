// src/app/chat/page.tsx
import { prisma } from "@/lib/prisma";
import { AdminAdvisers } from "@/lib/types/define";
import ChatPage from "@/components/chat/chat-page";

export default async function Page() {
  const allAdmin: AdminAdvisers[] = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return <ChatPage allAdmin={allAdmin}/>;
}
