"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetPassword } from "@/lib/auth-client";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const newPassword = formData.get("newPassword") as string;
    if (!newPassword) return toast.error("Please enter your new password.");
    const confirmPassword = formData.get("confirmPassword") as string;
    if (!confirmPassword) return toast.error("Please confirm your password.");

    if (newPassword !== confirmPassword) {
      return toast.error("Your password is not match.");
    }

    await resetPassword({
      newPassword: newPassword,
      token,
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
          toast.success("Password reset successfully.");
          router.push("/auth/login");
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Label htmlFor="newPassword">New Password</Label>
        <Input id="newPassword" name="newPassword" type="password" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" />
      </div>
      <Button type="submit" disabled={isLoading}>
        Resend Email Verification
      </Button>
    </form>
  );
}
