"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostCounts } from "@/lib/types/define";
import { TopicOption } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function BodyPage({ allPosts }: { allPosts: PostCounts[] }) {
  const router = useRouter();

  return (
    <div className="w-full md:px-30 px-5 my-5">
      <Table>
        <TableHeader>
          <TableRow className="opacity-50">
            <TableHead className="w-40 h-12">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:block">Response</TableHead>
            <TableHead className="text-end hidden md:block">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPosts.map((post) => (
            <TableRow
              key={post.id}
              onClick={() => router.push(`/blog/${post.id}`)}
              className="cursor-pointer hover:bg-[#fff8ff]"
            >
              <TableCell className="flex relative">
                <div className="relative w-[100px] h-[100px] overflow-hidden">
                  <Image
                    src={post.images[0]}
                    alt="Image Post"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                  <div className="absolute -rotate-45 md:top-2 top-3 -left-12  w-[150px] bg-amber-400 text-center shadow-md">
                    <p
                      className={`text-xs font-bold text-bold  py-1 ${TopicOption(
                        post.topic
                      )}`}
                    >
                      {post.topic}
                    </p>
                  </div>
                </div>
                {post.status === true ? (
                  <div className="absolute -top-2 md:right-8 right-2">
                    <Image
                      src={"/assets/pin.png"}
                      alt="Pin"
                      width={36}
                      height={36}
                    />
                  </div>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-5">
                  <p className="font-semibold">{post.title}</p>
                  <div className="md:hidden flex flex-col">
                    <div className="flex gap-5">
                      <div className="text-green-700">
                        {post._count.comments} comments{" "}
                      </div>{" "}
                      |
                      <div className="text-blue-700">
                        {post._count.reactions} reactions{" "}
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {new Intl.DateTimeFormat("en-US").format(post.createdAt)}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:block">
                <div className="flex gap-5">
                  <div className="text-green-700">
                    {post._count.comments} comments{" "}
                  </div>{" "}
                  |
                  <div className="text-blue-700">
                    {post._count.reactions} reactions{" "}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-end hidden md:block">
                {new Intl.DateTimeFormat("en-US").format(post.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
