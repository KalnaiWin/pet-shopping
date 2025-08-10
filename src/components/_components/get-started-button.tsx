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

  const href = session ? "/profile" : "/auth/login";

  return (
    <div className="flex flex-col justify-center items-center">
      <Button size={"lg"} asChild>
        <Link href={href}>Get Started</Link>
      </Button>
      {session && <p>It's nice to see you back, {session.user.name}! 👋</p>}
    </div>
  );
};
