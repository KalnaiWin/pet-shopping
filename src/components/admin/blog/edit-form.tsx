"use client"

import { EditPostAction } from "@/actions/blog/action";
import { EditProductAction } from "@/actions/product/action";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postSchema } from "@/lib/zodSchema";
import { UploadDropzone } from "@/utils/uploadthing";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useActionState, useState } from "react";

interface PageProps {
  data: {
    id: string;
    title: string;
    images: string[];
    content: string;
  };
}

export default function EditFormBlog({ data }: PageProps) {
  const [images, setImages] = useState<string[]>(data.images);

  const [lastResult, action] = useActionState(EditPostAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form
      className="mt-5"
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
    >
      <Input type="hidden" name="postName" value={data.id} />
      <div className="flex items-center justify-between">
        <ReturnButton href={"/admin/blog"} label="Edit Products" />
        <h1 className="text-2xl font-bold">Edit product</h1>
      </div>
      <Card className="mt-5 rounded-sm">
        <CardHeader>
          <CardTitle>Products Title</CardTitle>
          <CardDescription>Edit products following your ideas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Title</Label>
              <Input
                type="text"
                key={fields.title.key}
                defaultValue={data.title}
                name="title"
                className="w-full"
                placeholder="Post title"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.content.key}
                defaultValue={data.content}
                name="content"
                className="w-full"
                placeholder="Post Content . . ."
              />
              <p className="text-red-500">{fields.content.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={JSON.stringify(images)}
                key={fields.images.key}
                name="images"
                // defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {/* if got error here check the next.config.ts and npm install effect@3.16.8 */}
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg"
                      >
                        <XIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  className="h-[200px] w-full border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500"
                  appearance={{
                    label: "text-lg font-semibold text-gray-600",
                    button:
                      "bg-blue-500 text-white px-4 py-6 rounded hover:bg-blue-600 mb-4",
                    container: "flex flex-col items-center justify-center",
                  }}
                  onClientUploadComplete={(res) =>
                    setImages(res.map((r) => r.url))
                  }
                  onUploadError={(err) => console.error(err)}
                />
              )}
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Update Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
