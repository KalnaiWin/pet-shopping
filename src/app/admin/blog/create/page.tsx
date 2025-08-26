"use client";

import { CreatedPostAction } from "@/actions/blog/action";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { postSchema } from "@/lib/zodSchema";
import { UploadDropzone } from "@/utils/uploadthing";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useActionState, useState } from "react";

export default function page() {
  const [images, setImages] = useState<string[]>([]);

  const [lastResult, action] = useActionState(CreatedPostAction, undefined);
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
      <div className="flex items-center justify-between mb-5">
        <ReturnButton href={"/admin/blog"} label="Manage Blogs" />
        <h1 className="text-2xl font-bold">Create a new post</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Posts Title</CardTitle>
          <CardDescription>
            Add a new post that you want to in the blog section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name="title"
                defaultValue={fields.title.initialValue}
                placeholder="Enter the title"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Content</Label>
              <Textarea
                key={fields.content.key}
                name="content"
                defaultValue={fields.content.initialValue}
                placeholder="Enter the content"
              />
              <p className="text-red-500">{fields.content.errors}</p>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col gap-3">
                <Label>Important Pin</Label>
                <Switch
                  key={fields.status.key}
                  name="status"
                  defaultChecked={fields.status.initialValue === "true"}
                />
                <p className="text-red-500">{fields.status.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Label>Topic</Label>
                  <Select
                    key={fields.topic.key}
                    name="topic"
                    defaultValue={fields.topic.initialValue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Issue">Issue</SelectItem>
                      <SelectItem value="Discuss">Discuss</SelectItem>
                      <SelectItem value="Guide">Guide</SelectItem>
                      <SelectItem value="Empty">Empty</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-red-500">{fields.topic.errors}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={JSON.stringify(images)}
                key={fields.images.key}
                name="images"
                defaultValue={fields.images.initialValue as any}
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
          <SubmitButton text="Create Post" />
        </CardFooter>
      </Card>
    </form>
  );
}
