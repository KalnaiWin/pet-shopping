"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { productsSchema } from "@/lib/zodSchema";

// npm i zod
// npm install @conform-to/react @conform-to/zod zod

export async function CreateProduct(prevState: unknown, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "ADMIN") return redirect("/");

  const submission = parseWithZod(formData, {
    schema: productsSchema,
  });

  if (submission.status !== "success") return submission.reply();
}
