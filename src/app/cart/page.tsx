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
import { auth } from "@/lib/auth";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/types/define";
import { MoreHorizontalIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const cart: Cart | null = await redis.get(`cart-${session.user.id}`);

  return (
    <div className="w-full px-25 mt-25">
      {cart?.items.length === 0 ? (
        <div>
          <h1>Nothing in shopping bag</h1>
        </div>
      ) : (
        <Card className="mt-5">
          <CardHeader className="flex w-full justify-between items-center">
            <div>
              <CardTitle>Products Added</CardTitle>
              <CardDescription>
                Manage all products, view, create and deit any time you want.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="opacity-50">
                  <TableHead className="w-40 h-12">Image</TableHead>
                  <TableHead className="w-150">Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead className="text-end">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart?.items.map((item) => {
                  const price =
                    Number(item.maxPrice) -
                    (Number(item.maxPrice) * Number(item.discount)) / 100;

                    const totalPrice = Number(item.quantity) * Number(price);

                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.images}
                          width={64}
                          height={64}
                          alt="Image Products"
                          className="rounded-md object-cover h-16 w-16"
                        />
                      </TableCell>
                      <TableCell className="font-semibold max-w-[200px] truncate">
                        {item.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-xl">{totalPrice.toLocaleString()} VND</span>
                          <span className="opacity-50">
                            {item.quantity} x {price.toLocaleString()} VND
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="bg-[#ff5500] text-white p-1 rounded-sm text-[11px] w-fit">
                          -{item.discount}%
                        </p>
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
                              <Link href={`/`}>
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
