"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import DeleteBanner from "../admin/product/delete-banner";
import { Input } from "../ui/input";
import { useState } from "react";

export default function BannerForm({ data }: { data: any[] }) {
  const [items, setItems] = useState(data);

  const handleOrderChange = (id: string, newValue: string) => {
    setItems((prev) =>
      prev.map(( item ) => ( // find id then update order
        item.id === id ? { ...item, order: Number(newValue) } : item
        )
      )
    );
  };

    /*
    Gửi POST đến API bạn viết ở trên để lưu order vào DB.
    Sau khi server nhận, component sắp xếp lại items trong state theo order tăng dần để UI hiển thị đúng.
     */
  const saveOrder = async (id: string, order: number) => {
    await fetch("/api/banner/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // sending in json format
      body: JSON.stringify({ id, order }), // Since HTTP requests can only send text, if you want to send an object, you must convert it into JSON string.
    });

    // re-sort local state
    setItems((prev) => [...prev].sort((a, b) => a.order - b.order));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="opacity-50">
          <TableHead>Index</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-end">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Input
                className="w-[60px] text-black"
                type="number"
                value={item.order}
                onChange={(e) => handleOrderChange(item.id, e.target.value)} // cập nhật state ngay (UI thấy số mới).
                onBlur={() => saveOrder(item.id, item.order)} // (khi bạn rời ô) sẽ gọi API để lưu số mới vào DB, rồi sắp xếp lại items theo order
              />
            </TableCell>
            <TableCell>
              <Image
                src={item.imageString}
                alt="Image"
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell className="text-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <DeleteBanner bannerId={item.id} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
