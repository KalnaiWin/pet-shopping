import { DeletePostAction } from "@/actions/blog/action";
import DeleteForm from "@/components/_components/delete-alert";
import FilterForm from "@/components/_components/filter-form";
import { Pagination } from "@/components/_components/pagination";
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
import {
  MoreHorizontalIcon,
  NewspaperIcon,
  PlusCircleIcon,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  searchParams: Promise<{ page?: string; postName: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");

  if (session.user.role !== "ADMIN") redirect("/");

  const resolvedSearchParams = await searchParams;
  const { page, postName } = resolvedSearchParams ?? {};
  const currentPage = parseInt(page ?? "1", 10); // parseInt(..., 10) converts that string to an integer.

  const pageSize = 10;

  const postNameFilter = postName || "";

  const whereClause: Prisma.PostWhereInput = postNameFilter
    ? {
        title: {
          contains: postNameFilter, // contains tạo tìm kiếm "chứa" (tương đương %term%)
          mode: Prisma.QueryMode.insensitive, // yêu cầu tìm không phân biệt hoa thường
        },
      }
    : {};

  const totalCount = await prisma.post.count({ where: whereClause });

  const allPosts = await prisma.post.findMany({
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
          <Link href={"/admin/blog/create"}>
            <PlusCircleIcon />
            <span>Add Post</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <div>
            <CardTitle>Manage all posts</CardTitle>
            <CardDescription>
              You can manage all posts such as create, update or delete
            </CardDescription>
          </div>
          <div className="mt-5 flex justify-between w-full">
            <div className="w-1/3 ">
              <FilterForm
                nameId="postName"
                title="Post"
                initialValue={postNameFilter}
              ></FilterForm>
            </div>
            <div className="font-bold flex gap-2">
              {" "}
              <NewspaperIcon /> Total users:{" "}
              <span className="text-red-500">{totalCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Image
                      src={post.images[0]}
                      alt="Image Post"
                      width={64}
                      height={64}
                    />
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US").format(post.createdAt)}
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
                          <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <DeleteForm nameId={post.id} name="postName" action={DeletePostAction} />
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
