import ReturnButton from "@/components/_components/return-button";
import SignOutButton from "@/components/auth/sign-out";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="">
      <h1 className="font-bold text-3xl">Profile</h1>

      {
        session.user.role === "ADMIN" && (
          <Button size={"sm"} asChild>
            <Link href={"/admin/dashboard"}>Admin Dashboard</Link>
          </Button>
        )
      }

      <div className="flex items-center gap-5">
        <SignOutButton />
        <ReturnButton href="/" label="Home" />
      </div>

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
