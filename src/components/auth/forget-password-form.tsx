"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forgetPassword } from "@/lib/auth-client";

export default function ForgetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const email = formData.get("email") as string;
    if (!email) return toast.error("Please enter your email.");

    await forgetPassword({
      email,
      redirectTo: "/auth/reset-password",
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
          toast.success("Reset link sent to your email.");
          router.push("/auth/forget-password/success");
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <Button type="submit" disabled={isLoading}>
        Send Reset Link
      </Button>
    </form>
  );
}
