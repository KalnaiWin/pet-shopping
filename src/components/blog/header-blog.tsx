"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TopicOption } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { relative } from "path";
import React from "react";
import FilterForm from "../_components/filter-form";

const BlogTopic = [
  {
    label: "All topic",
    href: "/blog",
  },
  {
    label: "New",
    href: "/blog/topic/New",
  },
  {
    label: "Issue",
    href: "/blog/topic/Issue",
  },
  {
    label: "Discuss",
    href: "/blog/topic/Discuss",
  },
  {
    label: "Guide",
    href: "/blog/topic/Guide",
  },
];

interface HeaderBlogProps {
  initialValue: string;
  nameId: string;
}

export default function HeaderBlog({ initialValue, nameId }: HeaderBlogProps) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="relative">
        <Image src={"/images/blog.png"} alt="Blog" width={1360} height={50} />
        <h1 className="backdrop-blur-sm absolute top-15 left-90 rotate-4 font-bold -skew-4 text-white border text-7xl p-2 [text-shadow:_-1px_-1px_3_black,_1px_-1px_3_black,_-1px_1px_3_black,_1px_1px_3_black]">
          Latest news here !!{" "}
        </h1>
      </div>
      <div className="w-full px-30 mt-3">
        <div className="w-full flex justify-between">
          <div className="flex gap-5 relative">
            <h1 className="text-xl font-semibold underline">Topics :</h1>
            <div className="flex gap-5">
              {BlogTopic.map((blog, idx) => {
                return (
                  <Badge
                    key={idx}
                    className={`text-black bg-white shadow-md hover:-translate-y-0.5 transition-all  ${
                      pathname === blog.href ||
                      (blog.href !== "/blog" && pathname.startsWith(blog.href))
                        ? `${TopicOption(blog.label)}`
                        : ""
                    }`}
                  >
                    <Link href={blog.href}>{blog.label}</Link>
                    <div></div>
                  </Badge>
                );
              })}
            </div>
            {/* <Button className="flex items-center gap-1 bg-white shadow-md hover:bg-[#f2f8ff] absolute -right-5"></Button> */}
            <Select>
              <SelectTrigger className="w-[100px]">
                <div className="flex gap-2 opacity-50 items-center">
                  <p className="font-medium text-black ">Sort</p>
                  <div>
                    <Image
                      src={"/assets/sort.png"}
                      alt="Sort"
                      width={20}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="old">Old</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/3 relative">
            <FilterForm
              initialValue={initialValue}
              nameId={nameId}
              title="Post"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
