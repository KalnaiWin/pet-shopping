import ReturnButton from "@/components/_components/return-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BannerPage from "../banner/page";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");

  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold">Welcome back admin, admin's name</h1>
          <p className="opacity-50">
            Add, delete, edit all products and blogs. Following user's actions.
          </p>
        </div>
        <Button asChild>
          <Link href={"/admin/banner"}>Current Banner</Link>
        </Button>
      </div>
    </div>
  );
}
