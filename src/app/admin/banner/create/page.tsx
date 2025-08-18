import ReturnButton from "@/components/_components/return-button";
import SubmitButton from "@/components/_components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <form>
      <div className="flex items-center justify-between">
        <ReturnButton href={"/admin/banner"} label="Manage Banners" />
        <h1 className="text-2xl font-bold">Add a new banner</h1>
      </div>
      <Card className="mt-5 rounded-sm">
        <CardHeader>
          <CardTitle>Banners Title</CardTitle>
          <CardDescription>
            Add a new banner that you want to the home page.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <SubmitButton text="Add banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
