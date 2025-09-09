"use client";

import { useSession } from "@/lib/auth-client";
import UserMenu from "../_components/user-menu";
import ReturnButton from "../_components/return-button";
import { PostWithInformation } from "@/lib/types/define";
import Image from "next/image";
import { useState } from "react";
import ReactionBlog from "./reaction-blog";
import { MessageCircle } from "lucide-react";
import FormComment from "../admin/blog/form-comment";
import DeleteForm from "../_components/delete-alert";
import { DeleteCommentAction } from "@/actions/blog/action";
import Link from "next/link";

export default function InfoSection({
  postId,
  PostsInfo,
}: {
  postId: string;
  PostsInfo: PostWithInformation | null;
}) {
  const { data: session } = useSession();

  if (!PostsInfo) {
    return <div>No post info</div>;
  }
  const likes = PostsInfo.reactions.filter((r) => r.type === "LIKE").length;
  const dislikes = PostsInfo.reactions.filter(
    (r) => r.type === "DISLIKE"
  ).length;

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

  return (
    <div className="w-full h-screen flex flex-col p-2">
      {/* HEADER */}
      <div>
        {!session?.user ? (
          <div className="w-full flex justify-end">
            <ReturnButton href="/auth/login" label="Login" />
          </div>
        ) : (
          <div className="w-full flex justify-end">
            <UserMenu user={session?.user} />
          </div>
        )}
      </div>
      <div className="w-full bg-gray-300 h-0.5 my-2" />

      {/* MAIN SCROLL AREA */}
      <div className="flex-1 overflow-y-auto px-2">
        {/* Post info */}
        <div className="flex items-center gap-2">
          <Image
            src={PostsInfo.user.image || "/assets/default.png"}
            alt="Profile Image"
            width={40}
            height={40}
          />
          <div>
            <p className="font-bold text-md">{PostsInfo.user.name}</p>
            <p className="opacity-50 text-sm">
              {new Intl.DateTimeFormat("en-US").format(PostsInfo.createdAt)}
            </p>
          </div>
        </div>

        {/* Post content */}
        <div className="relative inline">
          <span
            className={`whitespace-pre-line ${isToggle ? "line-clamp-6" : ""}`}
            onClick={() => setIsToggle(!isToggle)}
          >
            {PostsInfo.content}
            <Link
              href={`/blog/topic/${PostsInfo.topic}`}
              className="underline text-blue-600"
            >
              #{PostsInfo.topic}
            </Link>
          </span>
          <button
            onClick={() => setIsToggle(!isToggle)}
            className="ml-1 text-blue-500 hover:underline"
          >
            {isToggle ? "Read more" : "Show less"}
          </button>
        </div>

        {/* Reaction + comments */}
        <div className="w-full bg-gray-300 h-0.5 my-2" />
        <div className="flex w-full justify-between">
          <ReactionBlog
            postId={postId}
            initialLikes={likes}
            initialDislikes={dislikes}
          />
          <div className="flex gap-2 items-center">
            <MessageCircle className="text-blue-500" size={25} />
            <p className="text-xl font-semibold">{PostsInfo.comments.length}</p>
          </div>
        </div>
        <div className="w-full bg-gray-300 h-0.5 my-2" />
        <div className="space-y-6 my-5">
          {PostsInfo.comments.map((comment) => {
            const isExpanded = expandedComments[comment.id] ?? false;
            return (
              <div key={comment.id} className="flex flex-col gap-2">
                <div className="flex w-full justify-between items-end">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={comment.user.image || "/assets/default.png"}
                      alt="Profile Image"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="italic text-md opacity-80">
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
                    {(session?.user.id === comment.user.id ||
                      session?.user.role === "ADMIN") && (
                      <DeleteForm
                        nameId={comment.id}
                        name="commentName"
                        action={async (fd) => {
                          await DeleteCommentAction(fd);
                        }}
                      />
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
                {comment.content.length > 100 && (
                  <button
                    onClick={() => toggleComment(comment.id)}
                    className="ml-1 text-blue-500 hover:underline w-fit"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t p-2 sticky bottom-0">
        <FormComment postId={postId} name="" />
      </div>
    </div>
  );
}
