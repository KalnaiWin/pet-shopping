"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { extractNumber, textAfterNumber } from "@/lib/utils";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FormComment from "./form-comment";
import DeleteForm from "@/components/_components/delete-alert";
import { DeleteCommentAction, ToggleDisLikeAction, ToggleLikeAction } from "@/actions/blog/action";
import { useSession } from "@/lib/auth-client";
import ReactionButton from "./reaction-button";
import CountLike from "./reaction-button";

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
      image: string | null;
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
    dislikes: {
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
  const { data: session } = useSession();

  const [isToggle, setIsToggle] = useState(true);
  const [expandedComments, setExpandedComments] = useState<{
    [id: string]: boolean;
  }>({});

  const toggleComment = (id: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const alreadyLiked = session?.user
  ? post.likes.some((like) => like.user.id === session.user.id)
  : false;

const alreadyDisliked = session?.user
  ? post.dislikes.some((dislike) => dislike.user.id === session.user.id)
  : false;

  return (
    <Card className="mb-20">
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
                <CountLike
                  postId={post.id}
                  commentId={""}
                  FirstLike={alreadyLiked}
                  AlreadyLike={post.likes.length}
                />
                {/* <p className="text-xl font-semibold">{post.likes.length}</p> */}
              </span>
              <span className="flex gap-2 items-center">
                
                <p className="text-xl font-semibold">{post.dislikes.length}</p>
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <MessageCircle className="text-blue-500" size={30} />
              <p className="text-xl font-semibold">{post.comments.length}</p>
            </div>
          </div>
          <div className="my-10">
            <FormComment postId={post.id} />
          </div>
          <div className="w-full h-0.5 bg-gray-400"></div>
          <div className="w-full mt-10">
            {post.comments.map((comment) => {
              const isExpanded = expandedComments[comment.id] ?? false;
              return (
                <div key={comment.id} className="mb-10 flex flex-col gap-2">
                  <div className="flex justify-between w-full items-end">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={
                          comment.user.image
                            ? comment.user.image
                            : "/assets/default.png"
                        }
                        alt="Profile Image"
                        width={40}
                        height={40}
                      />
                      <div className="flex flex-col">
                        <p className={`italic text-md opacity-80`}>
                          {comment.user.name}
                        </p>
                        <p className="opacity-50">
                          {new Intl.DateTimeFormat("en-US").format(
                            comment.createdAt
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      {session?.user.id === comment.user.id ||
                      session?.user.role === "ADMIN" ? (
                        <DeleteForm
                          nameId={comment.id}
                          name="commentName"
                          action={DeleteCommentAction}
                        />
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`whitespace-pre-line bg-blue-200 rounded-sm p-1 font-bold ${
                      isExpanded ? "" : "line-clamp-3"
                    }`}
                  >
                    {comment.content}
                  </span>
                  <div className="flex w-full justify-between">
                    {comment.content.length > 100 && (
                      <button
                        onClick={() => toggleComment(comment.id)}
                        className="ml-1 text-blue-500 hover:underline w-fit"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
