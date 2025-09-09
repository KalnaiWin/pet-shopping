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
import { CreateProductAction } from "@/actions/product/action";

{
  /* npm install uploadthing @uploadthing/react */
}

{
  /* if got error here check the next.config.ts and npm install effect@3.16.8 */
}

export default function page() {
  const [images, setImages] = useState<string[]>([]);

  const [lastResult, action] = useActionState(CreateProductAction, undefined);
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
      <div className="flex items-center justify-between">
        <ReturnButton href={"/admin/product"} label="Manage Products"/>
        <h1 className="md:text-2xl text-md font-bold">Create a new product</h1>
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
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
                name="description"
                className="w-full"
                placeholder="Product Description . . ."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col gap-3 w-3/5">
                <Label>Price from</Label>
                <Input
                  key={fields.price.key}
                  defaultValue={fields.price.initialValue}
                  name="price"
                  type="number"
                  placeholder="1,000 VND"
                />
                <p className="text-red-500">{fields.price.errors}</p>
              </div>
              <div className="flex flex-col gap-3 w-3/5">
                <Label>to Price</Label>
                <Input
                  key={fields.maxPrice.key}
                  defaultValue={fields.maxPrice.initialValue}
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
                  defaultValue={fields.discount.initialValue}
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
                defaultValue={fields.stock?.initialValue}
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
                defaultChecked={fields.status.initialValue === "true"}
              />
              <p className="text-red-500">{fields.status.errors}</p>
            </div>
            <div className="flex gap-2 md:gap-20">
              <div className="flex flex-col gap-3">
                <Label>Delivery Time</Label>
                <Input
                  key={fields.delivery.key}
                  defaultValue={fields.delivery.defaultValue ?? ""}
                  name="delivery"
                  placeholder="From ... To ..."
                />
                <p className="text-red-500">{fields.delivery.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Origin</Label>
                <Input
                  key={fields.origin.key}
                  defaultValue={fields.origin.initialValue}
                  name="origin"
                  placeholder="Where . . ."
                />
                <p className="text-red-500">{fields.origin.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Expire</Label>
                <Input
                  key={fields.expired.key}
                  defaultValue={fields.expired.initialValue}
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
                  defaultValue={fields.brand.initialValue}
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
                    <SelectItem value="Empty">Empty</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.brand.errors}</p>
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
                    <SelectItem value="ProductsForCat">
                      Products For Cat
                    </SelectItem>
                    <SelectItem value="Insects">Insects</SelectItem>
                    <SelectItem value="Mushroom">Mushroom</SelectItem>
                    <SelectItem value="VitaminNutrition">
                      VitaminNutrition
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
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
