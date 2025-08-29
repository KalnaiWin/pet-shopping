import AdminNavbar from "@/components/admin/_components/admin-navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex min-h-screen">
      <main className="">{children}</main>
    </div>
  );
}
