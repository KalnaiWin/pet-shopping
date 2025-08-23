import FilterForm from "@/components/_components/filter-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end">
        <Button className="flex items-center gap-x-2" asChild>
          <Link href={"/admin/product/create"}>
            <PlusCircleIcon />
            <span>Add Post</span>
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Manage all posts</CardTitle>
            <CardDescription></CardDescription>
          </div>
          <div>
            <FilterForm nameId="postId" title="Post" initialValue=" " ></FilterForm>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
