"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export async function signUpAction(formData: FormData) {
  const name = String(formData.get("name"));
  if (!name) return { error: "Your name is empty !" };
  const email = String(formData.get("email"));
  if (!email) return { error: "Your email is empty !" };
  const password = String(formData.get("password"));
  if (!password) return { error: "Your password is empty !" };

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: "Have something went wrong while registering !" };
    } else {
      return { error: "Internal Server Error" };
    }
  }
}
