import FilterForm from "@/components/_components/filter-form";
import { Pagination } from "@/components/_components/pagination";
import DeleteProduct from "@/components/admin/product/delete-product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prisma } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MoreHorizontalIcon, PlusCircleIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ page?: string; productName: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");

  if (session.user.role !== "ADMIN") redirect("/");

  // Await searchParams before accessing its properties
  const resolvedSearchParams = await searchParams;
  const { page, productName } = resolvedSearchParams ?? {};
  const currentPage = parseInt(page ?? "1", 10); // parseInt(..., 10) converts that string to an integer.

  const pageSize = 10;

  const totalCount = await prisma.products.count({});

  const productNameFilter = productName || "";

  const whereClause: Prisma.ProductsWhereInput = productNameFilter
    ? {
        name: {
          contains: productNameFilter, // contains tạo tìm kiếm "chứa" (tương đương %term%)
          mode: Prisma.QueryMode.insensitive, // yêu cầu tìm không phân biệt hoa thường
        },
      }
    : {};

  const allProducts = await prisma.products.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="w-full">
      <div className="flex items-center justify-end">
        <Button className="flex items-center gap-x-2" asChild>
          <Link href={"/admin/product/create"}>
            <PlusCircleIcon />
            <span>Add Products</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardHeader className="flex w-full justify-between items-center">
          <div>
            <CardTitle>Manage Products</CardTitle>
            <CardDescription>
              Manage all products, view, create and deit any time you want.
            </CardDescription>
          </div>
          <div className="w-1/3">
            {/* <ProductNamelFilterForm initialValue={productNameFilter}/> */}
            <FilterForm initialValue={productNameFilter} nameId="productName" title="Product"/>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="opacity-50">
                <TableHead className="w-40 h-12">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.images[0]}
                      width={64}
                      height={64}
                      alt="Image Products"
                      className="rounded-md object-cover h-16 w-16"
                    />
                  </TableCell>
                  <TableCell className="font-semibold max-w-[200px] truncate">{item.name}</TableCell>
                  <TableCell>{item.maxPrice.toLocaleString()} VND</TableCell>
                  <TableCell className="font-medium">
                    {item.status === true ? (
                      <p className="text-blue-500">
                        Available ( {item.stock} ){" "}
                      </p>
                    ) : (
                      <p className="text-red-500">Out of Stock</p>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                  </TableCell>
                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/product/${item.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <DeleteProduct productId={item.id} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
