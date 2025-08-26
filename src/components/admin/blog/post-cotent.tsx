"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/generated/prisma";
import { extractNumber, textAfterNumber } from "@/lib/utils";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PostContentProps {
  post: {
    id: string;
    title: string;
    content: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    status: Boolean;
    topic: string;
    user: {
      id: string;
      name: string;
      image: string | null; // avatar
    };
    comments: {
      id: string;
      content: string;
      createdAt: Date;
      user: {
        id: string;
        name: string;
        image: string | null;
      };
    }[];
    likes: {
      id: string;
      user: {
        id: string;
        name: string;
        image: string | null;
      };
    }[];
  };
  isAuthor: boolean;
}

export function PostCotent({ post }: PostContentProps) {
  const [isToggle, setIsToggle] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2">
            <p className="text-red-500 font-bold text-4xl underline">
              #{extractNumber(post.title)}
            </p>
            <p className="text-4xl font-bold">{textAfterNumber(post.title)}</p>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex gap-2">
            <p>By {post.user.name} - </p>
            <p>{new Intl.DateTimeFormat("en-US").format(post.createdAt)}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="relative inline">
            <span
              className={`whitespace-pre-line ${
                isToggle ? "line-clamp-6" : ""
              } `}
              onClick={() => setIsToggle(!isToggle)}
            >
              {post.content}
            </span>
            {!isToggle ? (
              <button
                onClick={() => setIsToggle(true)}
                className="ml-1 text-blue-500 hover:underline"
              >
                Show less
              </button>
            ) : (
              <button
                onClick={() => setIsToggle(false)}
                className="ml-1 text-blue-500 hover:underline"
              >
                Read more
              </button>
            )}
          </div>
          <div className="mt-10 w-full">
            <div className="relative">
              {post.images.length <= 3 ? (
                <div className="flex gap-5 justify-center">
                  {post.images.map((image, idx) => (
                    <Image
                      src={image}
                      key={idx}
                      alt="Image"
                      width={320}
                      height={320}
                    />
                  ))}
                </div>
              ) : (
                <div className="relative">
                  <div className="flex gap-5 justify-between">
                    <Image
                      src={post.images[0]}
                      alt="Image"
                      width={320}
                      height={320}
                    />
                    <Image
                      src={post.images[1]}
                      alt="Image"
                      width={320}
                      height={320}
                    />
                    <Link className="relative" href={`/blog/${post.id}/photo`}>
                      <Image
                        src={post.images[2]}
                        alt="Image"
                        width={320}
                        height={320}
                        className="rounded-lg"
                      />
                      <p className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-7xl font-bold rounded-lg">
                        +{post.images.length - 3}
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex w-full justify-between">
            <div className="flex items-center gap-10">
              <span className="flex gap-2 items-center">
                <ThumbsUp className="text-blue-500" size={30} />
                <p className="text-xl font-semibold">{post.comments.length}</p>
              </span>
              <span className="flex gap-2 items-center">
                <ThumbsDown className="text-red-500" size={30} />
                <p className="text-xl font-semibold">{post.likes.length}</p>
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <MessageCircle className="text-blue-500" size={30} />
              <p className="text-xl font-semibold">{post.comments.length}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
