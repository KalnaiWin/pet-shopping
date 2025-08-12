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
  })

  return (
    <div className="flex min-h-screen">
      <div className="p-10">
        <AdminNavbar adminName={session?.user.name} adminImage={session?.user.image} adminEmail={session?.user.email} />
      </div>

      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
