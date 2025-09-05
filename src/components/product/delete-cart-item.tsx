"use client";

import { XIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function DeleteItemCart() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className="opacity-50">
          Removing...
        </button>
      ) : (
        <button className="hover:underline inline-flex opacity-50 items-center">
          <XIcon className="w-4 h-4" />
          <p>Delete</p>
        </button>
      )}
    </>
  );
}
