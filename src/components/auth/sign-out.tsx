"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignOutButton() {

    const router = useRouter();

    async function handleClick() {
        await signOut({
            fetchOptions: {
                onError: (ctx) => {toast.error(ctx.error.message);},
                onSuccess: () => {
                    router.push("/auth/login");
                }
            }
        })
    }

  return (
    <Button onClick={handleClick} size={"sm"} variant={"destructive"}>Sign Out</Button>
  )
}
