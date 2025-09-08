"use client";

import { Badge } from "@/components/ui/badge";
import { TopicOption } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
        <h1 className="backdrop-blur-sm absolute md:top-15 md:left-90 top-3 left-23 rotate-4 font-bold -skew-4 text-white border text-2xl md:text-7xl p-2 [text-shadow:_-1px_-1px_3_black,_1px_-1px_3_black,_-1px_1px_3_black,_1px_1px_3_black]">
          Latest news here !!{" "}
        </h1>
      </div>
      <div className="w-full md:px-30 mt-3 px-5">
        <div className="w-full flex md:flex-row flex-col-reverse gap-3 justify-between">
          <div className="flex gap-5 relative">
            <h1 className="text-xl font-semibold underline hidden md:block">
              Topics :
            </h1>
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
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="md:w-1/3 w-full relative">
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
