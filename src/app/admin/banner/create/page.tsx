"use client";

import { CreateBannerAction } from "@/actions/product/action";
import ReturnButton from "@/components/_components/return-button";
import SubmitButton from "@/components/_components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/types/define";
import { bannerSchema } from "@/lib/zodSchema";
import { UploadDropzone } from "@/utils/uploadthing";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Image from "next/image";
import React, { useActionState, useState } from "react";

export default function page() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useActionState(CreateBannerAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center justify-between">
        <ReturnButton href={"/admin/banner"} label="Manage Banners" />
        <h1 className="text-2xl font-bold">Add a new banner</h1>
      </div>
      <Card className="mt-5 rounded-sm">
        <CardHeader>
          <CardTitle>Banners Title</CardTitle>
          <CardDescription>
            Add a new banner that you want to see at the home page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Title</Label>
              <Select
                key={fields.title.key}
                name="title"
                defaultValue={fields.title.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select title category banner" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.title.errors}</p>
            </div>
            {/* images sction */}
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={image ?? fields.imageString.initialValue ?? ""}
              />
              {image !== undefined ? (
                <Image
                  src={image}
                  width={200}
                  height={200}
                  className="w-[100px] h-[100px] object-cover rounded-lg border"
                  alt="Image"
                />
              ) : (
                <UploadDropzone
                  endpoint="bannerUploader"
                  className="h-[200px] w-full border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500"
                  appearance={{
                    label: "text-lg font-semibold text-gray-600",
                    button:
                      "bg-blue-500 text-white px-4 py-6 rounded hover:bg-blue-600 mb-4",
                    container: "flex flex-col items-center justify-center",
                  }}
                  onClientUploadComplete={(res) => setImage(res[0].url)}
                  onUploadError={(err) => console.error(err)}
                />
              )}
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Add banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
