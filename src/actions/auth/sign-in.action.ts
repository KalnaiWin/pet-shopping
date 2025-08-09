"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };
  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password" };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });

    return { error: null };
  } catch (error) {
    console.log(error);

    if (error instanceof APIError) {
      return { error: error.message };
    }
    return { error: "Internal Server Error" };
  }
}
