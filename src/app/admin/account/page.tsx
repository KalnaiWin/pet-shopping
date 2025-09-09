import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";
import { SortDatetime } from "@/components/admin/account/sort-datetime";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Pagination } from "@/components/_components/pagination";
import DeleteAccountButton, {
  AdminAccount,
} from "@/components/admin/account/delete-account-button";
import UserRoleSelection from "@/components/_components/user-role-selection";
import { Users2 } from "lucide-react";
import FilterForm from "@/components/_components/filter-form";
import Image from "next/image";

interface PageProps {
  searchParams?: Promise<{
    email?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");

  if (session?.user.role !== "ADMIN") redirect("/");

  // Await searchParams once and use the resolved values everywhere
  const resolvedSearchParams = await searchParams;
  const { page, email, sortBy, sortOrder } = resolvedSearchParams ?? {};

  const emailFilter = email || "";
  const sortByField = sortBy || "createdAt";
  const sortOrderField = (sortOrder as "asc" | "desc") || "desc";

  let orderBy: Prisma.UserOrderByWithRelationInput = { name: "asc" }; // default

  if (sortByField === "createdAt") {
    orderBy = { createdAt: sortOrderField };
  } else if (sortByField === "name") {
    orderBy = { name: sortOrderField };
  } else if (sortByField === "email") {
    orderBy = { email: sortOrderField };
  } else if (sortByField === "role") {
    orderBy = { role: sortOrderField };
  }

  const whereClause: Prisma.UserWhereInput = emailFilter
    ? {
        email: {
          contains: emailFilter, // contains tạo tìm kiếm "chứa" (tương đương %term%)
          mode: Prisma.QueryMode.insensitive, // yêu cầu tìm không phân biệt hoa thường
        },
      }
    : {};

  const currentPage = parseInt(page ?? "1", 10); // parseInt(..., 10) converts that string to an integer.

  const pageSize = 10;

  const totalCount = await prisma.user.count({
    where: {
      email: { contains: emailFilter, mode: "insensitive" },
    },
  });

  const users = await prisma.user.findMany({
    where: whereClause,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize, // it will take the 10 user of a page
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl mt-4">Manage accounts' user</h1>
      <p className="opacity-50 pt-3">Filter, sort, access detail user</p>
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="w-1/3">
            <FilterForm
              nameId="email"
              initialValue={emailFilter}
              title="Email"
            />
          </div>
          <div className="font-bold flex gap-2">
            <Users2 /> Total users:
            <span className="text-red-500">{totalCount}</span>
          </div>
        </div>
        <div className="mt-5">
          <Table>
            <TableHeader>
              <TableRow className="!bg-white ">
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>EMAIL</TableHead>
                <SortDatetime
                  column="createdAt"
                  currentSort={sortByField}
                  currentOrder={sortOrderField}
                >
                  JOINED
                </SortDatetime>
                <TableHead>ROLE</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, idx) => (
                <TableRow
                  key={user.id || idx}
                  className={` ${
                    idx % 2 === 0 ? "!bg-[#F7F7F7]" : "!bg-white"
                  }`}
                >
                  <TableCell>
                    <p>{user.id.slice(0, 8)}</p>
                  </TableCell>
                  <TableCell className="flex items-center gap-2 mt-2 line-clamp-1">
                    <Image
                      src={user.image ? user.image : "/assets/default.png"}
                      alt="User Logo"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <p>{user.name}</p>
                  </TableCell>
                  <TableCell>
                    {user.role !== "ADMIN" ? (
                      user.email
                    ) : (
                      <p className="text-bold opacity-40 text-red-600 cursor-not-allowed">
                        HIDDEN
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`${
                        user.role === "ADMIN"
                          ? "bg-blue-300 text-blue-800"
                          : "bg-green-300 text-green-800"
                      } rounded-md w-fit p-1 font-bold`}
                    >
                      <UserRoleSelection
                        userId={user.id}
                        role={user.role}
                        userDate={user.createdAt}
                        adminDate={session.user.createdAt}
                        self={session.user.id}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="pl-6">
                    {user.role !== "USER" ? (
                      <AdminAccount />
                    ) : (
                      <DeleteAccountButton userId={user.id} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {users.length === 0 && emailFilter && (
            <div className="text-center py-4 text-gray-500">
              No users found matching "{emailFilter}"
            </div>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
