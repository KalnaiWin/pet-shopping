"use client";

import { ProductsCommentInfo } from "@/lib/types/define";
import FormComment from "../admin/blog/form-comment";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import Image from "next/image";
import DeleteForm from "../_components/delete-alert";
import { DeleteCommentAction } from "@/actions/blog/action";
import { Pagination } from "../_components/pagination";

export default function CommentProduct({
  allProducts,
  currentPage,
  totalPages,
}: {
  allProducts: ProductsCommentInfo;
  currentPage: number;
  totalPages: number;
}) {
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

  return (
    <div className="w-full">
      <div className="my-10">
        <FormComment postId={allProducts.id} name="productsId" />
      </div>
      <div className="w-full mt-10">
        {allProducts.comments.map((comment) => {
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
        <div className="w-full flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>{" "}
      </div>
    </div>
  );
}
