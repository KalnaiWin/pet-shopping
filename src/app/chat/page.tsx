// src/app/chat/page.tsx
import { prisma } from "@/lib/prisma";
import { AdminAdvisers } from "@/lib/types/define";
import ChatPage from "@/components/chat/chat-page";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const CurrRole = session?.user.role === "ADMIN" ? "USER" : "ADMIN";

  const allAdmin: AdminAdvisers[] = await prisma.user.findMany({
    where: { role: CurrRole },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return <ChatPage allAdmin={allAdmin} />;
}
