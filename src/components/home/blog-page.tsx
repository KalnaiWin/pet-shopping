import { prisma } from "@/lib/prisma";
import { DescriptionBlog, TopicOption } from "@/lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export async function BlogPage() {
  const allBlogs = await prisma.post.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="w-full py-10 my-5 md:px-30 px-5">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        <p className="opacity-40 text-md mb-10">
          A lot of blogs for you to have the best information to choose your
          products suited for your pets.
        </p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 w-full">
        {allBlogs.map((post) => (
          <div className="bg-white shadow-xl rounded-md" key={post.id}>
            <div className="w-full md:h-52 h-30 overflow-hidden relative">
              <Image
                src={post.images[0]}
                alt="Image Blog"
                fill
                className="object-cover object-center rounded-t-md"
              />
              <div className="absolute top-1 left-1">
                <div
                  className={`p-6 rounded-full md:size-16 size-10 flex justify-center items-center ${TopicOption(
                    post.topic
                  )}`}
                >
                  <p className="text-sm md:font-extrabold">{post.topic}</p>
                </div>
              </div>
            </div>
            <div className="p-3 flex flex-col gap-1">
              <Link
                href={`/blog/${post.id}`}
                className="flex items-center gap-2 hover:underline"
              >
                <h1 className="font-semibold">{post.title}</h1>
                <ExternalLinkIcon className="size-5" />
              </Link>
              <p className="text-sm opacity-50">
                {DescriptionBlog(post.topic)}
              </p>
              <div className="flex gap-2 opacity-70">
                <p>{new Intl.DateTimeFormat("en-US").format(post.createdAt)}</p>
                <p>{" - "}</p>
                <p>By {post.user.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
