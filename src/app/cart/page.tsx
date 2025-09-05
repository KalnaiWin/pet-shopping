import { DeleteCartItemAction } from "@/actions/cart/action";
import DeleteItemCart from "@/components/product/delete-cart-item";
import { Button } from "@/components/ui/button";
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
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/types/define";
import { ShoppingBag, XIcon } from "lucide-react";
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

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    const unitPrice =
      Number(item.maxPrice) -
      (Number(item.maxPrice) * Number(item.discount)) / 100;
    totalPrice += unitPrice * Number(item.quantity);
  });

  let totalProduct = 0;
  cart?.items.forEach((item) => (totalProduct += item.quantity));

  return (
    <div className="w-full px-25 mt-25">
      {cart?.items.length === 0 ? (
        <div className="absolute center-absolute flex flex-col gap-5 justify-center items-center py-10 px-5 border rounded-md">
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-green-200">
            <ShoppingBag size={64} className="text-green-900" />
          </div>{" "}
          <h1 className="font-bold text-3xl text-center">
            You haven't had anything in your cart
          </h1>
          <p className=" opacity-50 text-md text-center">
            You currently don't have anything in your shopping cart right now. Let's get some at shopping section.
          </p>
          <Button
            className="bg-green-700 text-white hover:bg-green-900"
            asChild
          >
            <Link href={"/product"}>Check it out</Link>
          </Button>
        </div>
      ) : (
        <Card className="mt-5">
          <CardHeader className="flex w-full justify-between items-center">
            <div className="flex w-full justify-between">
              <div>
                <CardTitle>
                  <div className="flex gap-2 items-center">
                    <p>Products Added</p>
                    <ShoppingBag />
                    <p className="text-red-500 underline">{totalProduct}</p>
                  </div>
                </CardTitle>
                <CardDescription>
                  Manage all products, view, create and deit any time you want.
                </CardDescription>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <p className="font-bold">Subtotal:</p>{" "}
                  <p className="text-red-500">
                    {totalPrice.toLocaleString()} VND
                  </p>
                </div>
                <Button
                  size={"lg"}
                  className="w-full bg-blue-500 hover:bg-blue-400"
                >
                  Check Out
                </Button>
              </div>
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
                          <span className="font-semibold text-xl">
                            {totalPrice.toLocaleString()} VND
                          </span>
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
                        <form action={DeleteCartItemAction}>
                          <input
                            type="hidden"
                            name="productId"
                            value={item.id}
                          />
                          <DeleteItemCart />
                        </form>
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
