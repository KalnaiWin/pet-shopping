import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { maskAfterAt } from "@/lib/utils";
import Image from "next/image";
import { Prisma } from "@/generated/prisma";
import EmailFilterForm from "@/components/admin/account/filter-email";
import { SortDatetime } from "@/components/admin/account/sort-datetime";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Pagination } from "@/components/_components/pagination";

interface PageProps {
  searchParams?: {
    email?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role !== "ADMIN") redirect("/");

  const emailFilter = searchParams?.email || "";

  const sortBy = searchParams?.sortBy || "createdAt";
  const sortOrder = (searchParams?.sortOrder as "asc" | "desc") || "desc";

  let orderBy: Prisma.UserOrderByWithRelationInput = { name: "asc" }; // default

  if (sortBy === "createdAt") {
    orderBy = { createdAt: sortOrder };
  } else if (sortBy === "name") {
    orderBy = { name: sortOrder };
  } else if (sortBy === "email") {
    orderBy = { email: sortOrder };
  } else if (sortBy === "role") {
    orderBy = { role: sortOrder };
  }

  const whereClause: Prisma.UserWhereInput = emailFilter
    ? {
        email: {
          contains: emailFilter, // contains tạo tìm kiếm "chứa" (tương đương %term%)
          mode: Prisma.QueryMode.insensitive, // yêu cầu tìm không phân biệt hoa thường
        },
      }
    : {};

  const currentPage = parseInt(searchParams?.page || "1", 10);
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
    take: pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl mt-4">Manage accounts' user</h1>
      <p className="opacity-50 pt-3">Filter, sort, access detail user</p>
      <div className="mt-6">
        <EmailFilterForm initialValue={emailFilter} />
        <div className="mt-5">
          <Table>
            <TableHeader>
              <TableRow className="!bg-white ">
                <TableHead>ID</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>EMAIL</TableHead>
                <SortDatetime
                  column="createdAt"
                  currentSort={sortBy}
                  currentOrder={sortOrder}
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
                  <TableCell className="flex items-center gap-2 mt-2">
                    <Image
                      src={
                        user.image?.trim() ? user.image : "/assets/default.png"
                      }
                      alt="User Logo"
                      width={30}
                      height={30}
                    />
                    <p>{user.name}</p>
                  </TableCell>
                  <TableCell>
                    {user.role !== "ADMIN"
                      ? user.email
                      : maskAfterAt(user.email)}
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
                          ? "bg-red-300 text-red-800"
                          : "bg-green-300 text-green-800"
                      } rounded-2xl w-fit p-2 font-bold`}
                    >
                      {user.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="bg-red-500 hover:bg-red-400 w-fit p-2 rounded-xl cursor-pointer">
                      <Image
                        src={"/assets/trash.png"}
                        alt="Trash"
                        width={30}
                        height={30}
                      />
                    </div>
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
