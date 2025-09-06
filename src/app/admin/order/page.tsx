import { Pagination } from "@/components/_components/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");

  if (session.user.role !== "ADMIN") redirect("/");

  // Await searchParams before accessing its properties
  const resolvedSearchParams = await searchParams;
  const { page } = resolvedSearchParams ?? {};
  const currentPage = parseInt(page ?? "1", 10); // parseInt(..., 10) converts that string to an integer.

  const pageSize = 10;

  const totalCount = await prisma.order.count({});

  const allOrders = await prisma.order.findMany({
    select: {
      createdAt: true,
      status: true,
      id: true,
      amount: true,
      User: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full">
      <Card className="mt-5">
        <CardHeader className="flex w-full justify-between items-center">
          <div>
            <CardTitle>Current Orders</CardTitle>
            <CardDescription>Recent orders form your store</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="opacity-50">
                <TableHead className="w-40 h-12">Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="w-[250px] truncate">
                    <div className="flex flex-col">
                      <p className="font-semibold">{order.User?.name}</p>
                      <p className="opacity-50">{order.User?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-[150px]">Order</TableCell>
                  <TableCell className="font-medium w-[150px] text-green-500">
                    {order.status}
                  </TableCell>
                  <TableCell className="w-[150px]">
                    {new Intl.DateTimeFormat("en-US").format(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-end">
                    {order.amount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
