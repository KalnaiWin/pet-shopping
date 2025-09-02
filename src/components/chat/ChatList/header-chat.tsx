"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import ReturnButton from "../../_components/return-button";

export default function HeaderChat() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center h-16 px-4 py-4 bg-[#182a34]">
      <div>
        <ReturnButton
          href="/"
          label="Home"
          className={"bg-white text-black hover:bg-white/70 transition-all"}
        />
      </div>
      <div className="cursor-pointer">
        {session?.user ? (
          <div className="flex items-center gap-2">
            <Image
              src={
                session?.user.image ? session.user.image : "/assets/default.png"
              }
              alt="UserImage"
              width={30}
              height={30}
            />
            <div className="text-white font-bold text-2xl">
              {session.user.name}
            </div>
          </div>
        ) : (
          <ReturnButton href="/auth/login" label="Login" />
        )}
      </div>
    </div>
  );
}
