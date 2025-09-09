"use client";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface ReactionBlogProps {
  postId: string;
  initialLikes: number;
  initialDislikes: number;
  initialUserReaction?: "LIKE" | "DISLIKE" | null;
}

export default function ReactionBlog({
  postId,
  initialLikes,
  initialDislikes,
  initialUserReaction = null,
}: ReactionBlogProps) {
  const [data, setData] = useState({
    likes: initialLikes,
    dislikes: initialDislikes,
    userReaction: initialUserReaction,
  });

  async function react(type: "LIKE" | "DISLIKE") {
    const res = await fetch(`/api/blog/${postId}/reaction`, {
      method: "POST",
      body: JSON.stringify({ postId, type }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const updated = await res.json();
      setData(updated);
    }
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={() => react("LIKE")}
        className={`flex items-center gap-1 ${
          data.userReaction === "LIKE" ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <ThumbsUp />
        {data.likes}
      </button>

      <button
        onClick={() => react("DISLIKE")}
        className={`flex items-center gap-1 ${
          data.userReaction === "DISLIKE" ? "text-red-600" : "text-gray-500"
        }`}
      >
        <ThumbsDown />
        {data.dislikes}
      </button>
    </div>
  );
}
