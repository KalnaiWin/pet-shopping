import AdminNavbar from "@/components/admin/_components/admin-navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  return (
    <div className="flex md:flex-row flex-col min-h-screen">
      <div className="md:p-10 p-2">
        <AdminNavbar
          adminName={session?.user.name}
          adminImage={session?.user.image}
          adminEmail={session?.user.email}
          user={session?.user}
        />
      </div>

      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
