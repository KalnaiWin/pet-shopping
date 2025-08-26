"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Post } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { TopicOption } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface BodyPageProps {
  allPosts: Promise<Post[]>;
}

export default function BodyPage({ allPosts }: { allPosts: Post[] }) {
  const router = useRouter();

  return (
    <div className="w-full px-30 my-5">
      <Table>
        <TableHeader>
          <TableRow className="opacity-50">
            <TableHead className="w-40 h-12">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Response</TableHead>
            <TableHead className="text-end">Date</TableHead>
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
                  <div className="absolute -rotate-45 top-2 -left-12 w-[150px] bg-amber-400 text-center shadow-md">
                    <p className={`text-xs font-bold text-bold  py-1 ${TopicOption(post.topic)}`}>
                      {post.topic}
                    </p>
                  </div>
                </div>
                {
                    post.status === true ? <div className="absolute -top-2 right-8"><Image src={"/assets/pin.png"} alt="Pin" width={36} height={36}/></div> : ""
                }
              </TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>20 comments / 18 likes</TableCell>
              <TableCell className="text-end">
                {new Intl.DateTimeFormat("en-US").format(post.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
