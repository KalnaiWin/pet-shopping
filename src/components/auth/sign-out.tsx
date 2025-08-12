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
                    toast.success("You've logged out.");
                    router.push("/auth/login");
                }
            }
        })
    }

  return (
    <Button onClick={handleClick} size={"sm"} className="w-full cursor-pointer" variant={"destructive"}>Sign Out</Button>
  )
}
