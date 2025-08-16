"use client";

import { CreateProduct } from "@/actions/product/action";
import ReturnButton from "@/components/_components/return-button";
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
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import React, { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productsSchema } from "@/lib/zodSchema";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { XIcon } from "lucide-react";

export default function page() {
  const [images, setImages] = useState<string[]>([]);

  const [lastResult, action] = useActionState(CreateProduct, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productsSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center justify-between">
        <ReturnButton href={"/admin/product"} label="Manage Products" />
        <h1 className="text-2xl font-bold">Create a new product</h1>
      </div>
      <Card className="mt-5 rounded-sm">
        <CardHeader>
          <CardTitle>Products Title</CardTitle>
          <CardDescription>
            Add a new product that you want to the market.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                defaultValue={fields.name.initialValue}
                name="name"
                className="w-full"
                placeholder="Product Name"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Detail</Label>
              <Textarea
                key={fields.detail.key}
                defaultValue={fields.detail.initialValue}
                name="detail"
                className="w-full"
                placeholder="Product Detail . . ."
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                defaultValue={fields.detail.initialValue}
                name="description"
                className="w-full"
                placeholder="Product Description . . ."
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                key={fields.price.key}
                defaultValue={fields.price.initialValue}
                name="price"
                type="number"
                placeholder="1,000 VND"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Available</Label>
              <Switch
                key={fields.status.key}
                name="status"
                defaultValue={fields.status.initialValue}
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex gap-20">
              <div className="flex flex-col gap-3">
                <Label>Brand</Label>
                <Select
                  key={fields.brand.key}
                  name="brand"
                  defaultValue={fields.brand.initialValue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moochie">Moochie</SelectItem>
                    <SelectItem value="vemedim">Vemedim</SelectItem>
                    <SelectItem value="allcare">AllCare</SelectItem>
                    <SelectItem value="meowcat">Meowcat</SelectItem>
                    <SelectItem value="orgo">Orgo</SelectItem>
                    <SelectItem value="catchy">CATCHY</SelectItem>
                    <SelectItem value="biopharmachemie">
                      Bio Pharmachemie
                    </SelectItem>
                    <SelectItem value="ecopets">Ecopets</SelectItem>
                    <SelectItem value="ganador">Ganador</SelectItem>
                    <SelectItem value="drkyan">Dr.Kyan</SelectItem>
                    <SelectItem value="minino">Minino</SelectItem>
                    <SelectItem value="wanpy">Wanpy</SelectItem>
                    <SelectItem value="hanvet">Hanvet</SelectItem>
                    <SelectItem value="mordenpetgel">MORDEN PET GEL</SelectItem>
                    <SelectItem value="oliveessence">olive essence</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.name.errors}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Category</Label>
                <Select
                  key={fields.category.key}
                  name="category"
                  defaultValue={fields.category.initialValue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pate">PATE</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="toiletsand">Toilet Sand</SelectItem>
                    <SelectItem value="vitamin">Vitamin</SelectItem>
                    <SelectItem value="toys">Toys</SelectItem>
                    <SelectItem value="milk">Milk</SelectItem>
                    <SelectItem value="hygienebeauty">
                      Hygiene & Beauty
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="discount">Discount</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.name.errors}</p>
              </div>
            </div>
            {/* npm install uploadthing @uploadthing/react */}
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name="images"
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {/* if got error here check the next.config.ts */}
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
          <Button>Create Product</Button>
        </CardFooter>
      </Card>
    </form>
  );

  // api/uploadthing
}
