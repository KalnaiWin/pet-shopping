"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { ToggleLikeAction } from "@/actions/blog/action";
import { Button } from "@/components/ui/button";

export default function CountLike({
  postId,
  commentId,
  FirstLike,
  AlreadyLike,
}: {
  postId: string;
  commentId: string;
  FirstLike?: boolean;
  AlreadyLike: number;
}) {
  const [like, setLike] = useState(FirstLike);
  const [count, setCount] = useState(AlreadyLike);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    if (isPending) return;
    setIsPending(true);

    const res = await ToggleLikeAction(postId, commentId);
    setIsPending(false);

    if (!res.success) {
      toast.error(res.message || "Something went wrong");
      return;
    }

    setLike(res.liked);
    setCount((prev) => (res.liked ? prev + 1 : prev - 1));
  };

  return (
    <div className="flex items-center space-x-1">
      <Button onClick={handleClick} disabled={isPending} variant="ghost">
        <Heart
          className={`size-5 ${like ? "fill-red-500 text-red-500" : ""}`}
        />
      </Button>
      <span>{count}</span>
    </div>
  );
}
