import ReturnButton from "@/components/_components/return-button";
import React from "react";

export default function page() {
  return (
    <form>
      <div className="flex items-center justify-between">
        <ReturnButton href={"/admin/blog"} label="Manage Blogs" />
        <h1 className="text-2xl font-bold">Create a new post</h1>
      </div>
      
    </form>
  );
}
