import FilterForm from "@/components/_components/filter-form";
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
import {
  MoreHorizontalIcon,
  NewspaperIcon,
  PictureInPicture2,
  PlusCircleIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface PageProps {
  searchParams: Promise<{ page?: string; posttName: string }>;
}

export default function page() {
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
                nameId="postId"
                title="Post"
                initialValue=""
              ></FilterForm>
            </div>
            <div className="font-bold flex gap-2">
              {" "}
              <NewspaperIcon/> Total users:{" "}
              <span className="text-red-500">20</span>
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
              <TableRow>
                <TableCell>
                  <PictureInPicture2 />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>DateTime</TableCell>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
