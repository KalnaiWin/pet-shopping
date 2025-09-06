"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? (
        <Button disabled className={cn(className)}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </Button>
      ) : (
        <Button type="submit" className={`${cn(className)} cursor-pointer`}>
          {text}
        </Button>
      )}
    </div>
  );
}
