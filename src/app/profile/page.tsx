import SignOutButton from "@/components/auth/sign-out";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

  return (
    <div className="">
      <h1 className="font-bold text-3xl">Profile</h1>

        <SignOutButton/>

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
