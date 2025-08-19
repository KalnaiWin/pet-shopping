import BannerForm from "@/components/product/banner-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
//  npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers for Drag or Move

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: { order: "asc" }, 
  });
  return data;
}

const countBanner = await prisma.banner.count();

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/auth/login");

  if (session.user.role !== "ADMIN") redirect("/");

  const data = await getData();

  return (
    <>
      <div className="flex items-center justify-end">
        {countBanner < 5 ? (
          <Button className="flex items-center gap-x-2" asChild>
            <Link href={"/admin/banner/create"}>
              <PlusCircleIcon />
              <span>Add Banner</span>
            </Link>
          </Button>
        ) : (
          <Button className="flex items-center gap-x-2" disabled asChild>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="">
                  <MinusCircleIcon />
                  <span>You have reach the limit is 5</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-500">
                    You have reach the limit is 5
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    You have to delete at least one to add a new one banner.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Got it</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Button>
        )}
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Manage Banners</CardTitle>
          <CardDescription>
            Manage all awsome banners related to category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BannerForm data={data} />
        </CardContent>
      </Card>
    </>
  );
}
