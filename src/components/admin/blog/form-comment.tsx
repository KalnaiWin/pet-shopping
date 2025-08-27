"use client";

import { AddCommentAction } from "@/actions/blog/action";
import SubmitButton from "@/components/_components/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";
import { commentSchema } from "@/lib/zodSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Image from "next/image";
import { useActionState } from "react";

export default function FormComment({ postId }: { postId: string }) {
  const { data: session } = useSession();

  const [lastResult, action] = useActionState(AddCommentAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: commentSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="w-full"
    >
      <div className="w-full mb-3">
        <div className="flex gap-2 mb-3">
          <Image
            src={
              session?.user.image ? session.user.image : "/assets/default.png"
            }
            alt=""
            width={30}
            height={30}
          />
          <p
            className={`${
              session?.user.role === "ADMIN"
                ? "text-blue-800"
                : "text-green-800"
            } font-semibold italic text-xl`}
          >
            {session?.user.name}
          </p>
        </div>
        <Input type="hidden" name="postId" value={postId} />
        <Textarea
          key={fields.content.key}
          name={fields.content.name}
          defaultValue={fields.content.initialValue}
          placeholder="Leave your comment here"
        />
      </div>
      <SubmitButton text="Add comment" />
    </form>
  );
}
