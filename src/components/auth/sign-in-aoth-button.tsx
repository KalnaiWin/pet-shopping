"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignInOathButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
}

export default function SignInOathButton({
  provider,
  signUp,
}: SignInOathButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    await signIn.social({
        provider,
        callbackURL: "/profile",
        errorCallbackURL: "/auth/login/error",
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
                toast.success("")
            }
        }
    })

    setIsLoading(false);
  }

  const action = signUp ? "Up" : "In";
  const providerName = provider === "google" ? "Google" : "Github";

  return (
    <Button onClick={handleClick} disabled={isLoading} className="">
      Sign {action} with {providerName}
    </Button>
  );
}
