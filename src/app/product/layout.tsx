import NavBarProduct from "@/components/product/navBar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen mt-20">
      <div className="p-10 w-full flex flex-col items-center justify-center bg-amber-500 my-5">
        <h1 className="font-bold text-4xl">All Product</h1>
        <Link href={"/"} className="underline">Back to home Page</Link>
      </div>

      <div className="flex mx-30 gap-5">
        <div>
          <NavBarProduct />
        </div>

        <main className="flex-1 p-6 rounded-sm">{children}</main>
      </div>
    </div>
  );
}
