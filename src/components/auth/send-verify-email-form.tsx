"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { sendVerificationEmail } from "@/lib/auth-client"



export default function SendVerifyEmailForm() {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const email = formData.get("email") as string ;
        if(!email) return toast.error("Please enter your email.");

        await sendVerificationEmail({
            email,
            callbackURL: "/auth/verify",
            fetchOptions: {
                onRequest: () => {
                    setIsLoading(true);
                },
                onResponse: () => {
                    setIsLoading(false);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
                onSuccess: () => {
                    toast.success("Send verification successfully.");
                    router.push("/auth/verify/success");
                }
            }
        })
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email"/>
        </div>
        <Button type="submit" disabled={isLoading}>Resend Email Verification</Button>
    </form>
  )
}
