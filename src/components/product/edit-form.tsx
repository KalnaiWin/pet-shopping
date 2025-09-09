"use client";

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
import SubmitButton from "@/components/_components/submit-button";
import { EditProductAction } from "@/actions/product/action";

type Category =
  | "ProductsForCat"
  | "Insects"
  | "Mushroom"
  | "VitaminNutrition"
  | "Toys"
  | "Milk"
  | "HygieneBeauty"
  | "Other"
  | "Discount";

type Brand =
  | "Moochie"
  | "Vemedim"
  | "AllCare"
  | "Meowcat"
  | "Orgo"
  | "CATCHY"
  | "BioPharmachemie"
  | "Ecopets"
  | "Ganador"
  | "DrKyan"
  | "Minino"
  | "Wanpy"
  | "Hanvet"
  | "MODERNPETGEL"
  | "oliveessence"
  | "Empty";

interface iAppProps {
  data: {
    id: string;
    name: string;
    description: string;
    price?: number | null;
    maxPrice: number;
    discount: number;
    status: boolean;
    images: string[];
    delivery: string;
    stock: number;
    category: Category;
    brand: Brand;
    origin: string;
    expired: string;
  };
}

export default function EditFormProduct({ data }: iAppProps) {
  const [images, setImages] = useState<string[]>(data.images);

  const [lastResult, action] = useActionState(EditProductAction, undefined);
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
    <form
      className="mt-5"
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
    >
      <Input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center justify-between">
        <ReturnButton href={"/admin/product"} label="Edit Products" />
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
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                defaultValue={data.name}
                name="name"
                className="w-full"
                placeholder="Product Name"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                defaultValue={data.description}
                name="description"
                className="w-full"
                placeholder="Product Description . . ."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col gap-3 w-3/5">
                <Label>Price</Label>
                <Input
                  key={fields.price.key}
                  defaultValue={data.price ? String(data.price) : ""}
                  name="price"
                  type="number"
                  placeholder="1,000 VND (leave empty if not applicable)"
                />
                <p className="text-red-500">{fields.price.errors}</p>
              </div>
              <div className="flex flex-col gap-3 w-3/5">
                <Label>Max Price</Label>
                <Input
                  key={fields.maxPrice.key}
                  defaultValue={data.maxPrice}
                  name="maxPrice"
                  type="number"
                  placeholder="1,000 VND"
                />
                <p className="text-red-500">{fields.maxPrice.errors}</p>
              </div>
              <div className="flex flex-col gap-3 w-2/5">
                <Label>Discount</Label>
                <Input
                  key={fields.discount.key}
                  defaultValue={data.discount}
                  name="discount"
                  type="number"
                  placeholder="10 % "
                />
                <p className="text-red-500">{fields.discount.errors}</p>
              </div>
            </div>
            {/* ADD STOCK FIELD - This was missing! */}
            <div className="flex flex-col gap-3">
              <Label>Stock Quantity</Label>
              <Input
                key={fields.stock?.key}
                defaultValue={data.stock}
                name="stock"
                type="number"
                placeholder="Enter stock quantity"
                required
              />
              <p className="text-red-500">{fields.stock?.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Available</Label>
              <Switch
                key={fields.status.key}
                name="status"
                defaultChecked={data.status}
              />
              <p className="text-red-500">{fields.status.errors}</p>
            </div>
            <div className="flex md:gap-20 gap-2">
              <div className="flex flex-col gap-3">
                <Label>Delivery Time</Label>
                <Input
                  key={fields.delivery.key}
                  defaultValue={data.delivery}
                  name="delivery"
                  placeholder="From ... To ..."
                />
                <p className="text-red-500">{fields.delivery.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Origin</Label>
                <Input
                  key={fields.origin.key}
                  defaultValue={data.origin}
                  name="origin"
                  placeholder="Where . . ."
                />
                <p className="text-red-500">{fields.origin.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Expire</Label>
                <Input
                  key={fields.expired.key}
                  defaultValue={data.expired}
                  name="expired"
                  placeholder="Time expired"
                />
                <p className="text-red-500">{fields.expired.errors}</p>
              </div>
            </div>

            <div className="flex md:gap-20 gap-3">
              <div className="flex flex-col gap-3">
                <Label>Brand</Label>
                <Select
                  key={fields.brand.key}
                  name="brand"
                  defaultValue={data.brand}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Moochie">Moochie</SelectItem>
                    <SelectItem value="Vemedim">Vemedim</SelectItem>
                    <SelectItem value="AllCare">AllCare</SelectItem>
                    <SelectItem value="Meowcat">Meowcat</SelectItem>
                    <SelectItem value="Orgo">Orgo</SelectItem>
                    <SelectItem value="CATCHY">CATCHY</SelectItem>
                    <SelectItem value="BioPharmachemie">
                      Bio Pharmachemie
                    </SelectItem>
                    <SelectItem value="Ecopets">Ecopets</SelectItem>
                    <SelectItem value="Ganador">Ganador</SelectItem>
                    <SelectItem value="DrKyan">Dr.Kyan</SelectItem>
                    <SelectItem value="Minino">Minino</SelectItem>
                    <SelectItem value="Wanpy">Wanpy</SelectItem>
                    <SelectItem value="Hanvet">Hanvet</SelectItem>
                    <SelectItem value="MODERNPETGEL">MORDEN PET GEL</SelectItem>
                    <SelectItem value="oliveessence">olive essence</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.brand.errors}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Category</Label>
                <Select
                  key={fields.category.key}
                  name="category"
                  defaultValue={data.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PATE">PATE</SelectItem>
                    <SelectItem value="Seed">Seed</SelectItem>
                    <SelectItem value="ToiletSand">Toilet Sand</SelectItem>
                    <SelectItem value="VitaminNutrition">
                      Vitamin Nutrition
                    </SelectItem>
                    <SelectItem value="Toys">Toys</SelectItem>
                    <SelectItem value="Milk">Milk</SelectItem>
                    <SelectItem value="HygieneBeauty">
                      Hygiene & Beauty
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Discount">Discount</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.category.errors}</p>
              </div>
            </div>
            {/* npm install uploadthing @uploadthing/react */}
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
