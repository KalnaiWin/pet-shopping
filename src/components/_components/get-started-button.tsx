"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import Link from "next/link";

export const GetStartedButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button size={"lg"} className="opacity-50" asChild>
        get Started
      </Button>
    );
  }

  const href = session ? "/product" : "/auth/login";

  const action = href === "/product" ? "Shopping Now" : "Get Started";

  return (
    <div className="flex flex-col items-start gap-5 w-full">
      <Button size={"lg"} className="bg-[#FF7FBF]" asChild>
        <Link href={href}>{action}</Link>
      </Button>
      {session && (
        <div className="font-semibold">
          It is nice to see you back,{" "}
          <span
            className={`${
              session.user.role === "ADMIN" ? "text-blue-500" : "text-green-500"
            }`}
          >
            {session.user.name}
          </span>{" "}
          ! 👋
        </div>
      )}
    </div>
  );
};
