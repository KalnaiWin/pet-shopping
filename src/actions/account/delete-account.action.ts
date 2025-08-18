"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function DeleteAccountAction({ userId }: { userId: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unathorized");

  if (session.user.role !== "ADMIN" || session.user.id === userId)
    throw new Error("FORBIDDEN DELETE ADMIN OR YOURSELF");

  try {
    await prisma.user.delete({
      where: {
        id: userId,
        role: "USER",
      },
    });

    if (session.user.id === userId) {
      await auth.api.signOut({
        headers: await headers(),
      });
      redirect("/auth/register");
    }
    revalidatePath("/admin/dashboard");
    return { error: null };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Internal Server Error" };
    }
  }
}
