import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React from "react";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      User: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      id: true,
      amount: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}

export async function RecentSales() {
  const data = await getData();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>Recent payment from users</CardDescription>
      </CardHeader>
      <CardContent>
        {data.map((item) => {
          return (
            <div
              className="flex w-full justify-between items-center"
              key={item.id}
            >
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={item.User?.image || "/assets/default.png"}
                    alt="Image Users"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md font-semibold">{item.User?.name}</p>
                  <p className="text-sm text-gray-600">{item.User?.email}</p>
                </div>
              </div>
              <p className="font-bold">
                +
                {item.amount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
