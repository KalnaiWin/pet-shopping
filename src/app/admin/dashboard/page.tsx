import ReturnButton from "@/components/_components/return-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");

  if (session.user.role !== "ADMIN") redirect("/");

  return <div>YOU ARE AN ADMIN</div>;
}
