import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import {
  CircleDollarSign,
  Newspaper,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentSales } from "@/components/admin/dashboard/recent-sales";
import ChartTable from "@/components/admin/dashboard/chart-table";

async function getDataOrderChart() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const result = data.map((item) => ({
    data: new Intl.DateTimeFormat("vi-VN").format(item.createdAt),
    revenue: item.amount / 1000,
  }));
  return result;
}

export default async function page() {
  const data = await getDataOrderChart();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");

  if (session.user.role !== "ADMIN") redirect("/");

  let totalCash = 0;
  const totalCashPaid = await prisma.order.findMany({});
  totalCashPaid.map((order) => {
    totalCash += order.amount;
  });
  const totalOrder = await prisma.order.count({});
  const totalUsers = await prisma.user.count({});
  const totalProducts = await prisma.products.count({});
  const totalBlogs = await prisma.post.count({});

  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col justify-between items-center">
        <div className="flex flex-col justify-start">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back admin,{" "}
            <span className="text-blue-500">{session.user.name}</span> !
          </h1>
          <p className="opacity-50 text-sm md:text-md">
            Add, delete, edit all products and blogs. Following user's actions.
          </p>
        </div>
        <Button asChild>
          <Link href={"/admin/banner"}>Current Banner</Link>
        </Button>
      </div>

      {/*  */}
      <div className="grid md:grid-cols-5 grid-cols-2 gap-2 my-5">
        <div className="flex flex-col border items-start p-2 rounded-md shadow-md bg-white md:col-span-1 col-span-2">
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between items-center">
              <h1 className="">Total Revenue</h1>
              <CircleDollarSign className="text-green-500" />
            </div>
            <p className="font-bold text-3xl line-clamp-1">
              {totalCash.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p className="text-gray-500">Based on over 100 orders</p>
          </div>
        </div>
        <div className="flex flex-col border items-start p-2 rounded-md shadow-md bg-white">
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between items-center">
              <h1 className="">Total Users</h1>
              <Users className="text-orange-500" />
            </div>
            <p className="font-bold text-3xl line-clamp-1">{totalUsers}</p>
            <p className="text-gray-500">Total user sign up</p>
          </div>
        </div>
        <div className="flex flex-col border items-start p-2 rounded-md shadow-md bg-white">
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between items-center">
              <h1 className="">Total Products</h1>
              <Package className="text-[#4f1a06]" />
            </div>
            <p className="font-bold text-3xl line-clamp-1">{totalProducts}</p>
            <p className="text-gray-500">Total products added</p>
          </div>
        </div>
        <div className="flex flex-col border items-start p-2 rounded-md shadow-md bg-white">
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between items-center">
              <h1 className="">Total BLogs</h1>
              <Newspaper className="text-gray-500" />
            </div>
            <p className="font-bold text-3xl line-clamp-1">{totalBlogs}</p>
            <p className="text-gray-500">Total blogs added</p>
          </div>
        </div>
        <div className="flex flex-col border items-start p-2 rounded-md shadow-md bg-white">
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between items-center">
              <h1 className="">Total Sales</h1>
              <ShoppingBag className="text-blue-500" />
            </div>
            <p className="font-bold text-3xl line-clamp-1">{totalOrder}</p>
            <p className="text-gray-500">Total sales on Tiddy</p>
          </div>
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 flex flex-col-reverse gap-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from your store
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <ChartTable data={data} />
          </CardContent>
        </Card>

        <div className="h-full">
          <RecentSales />
        </div>
      </div>
    </div>
  );
}
