"use client";

import { DeleteAccountAction } from "@/actions/account/delete-account.action";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteAccountButtonProps {
  userId: string;
}

export default function DeleteAccountButton({
  userId,
}: DeleteAccountButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setIsLoading(true);

    const { error } = await DeleteAccountAction({ userId });
    if (error) {
      toast.error(error);
    } else {
      toast.success("Delete successfully.");
    }

    router.refresh();

    setIsLoading(false);
  }

  return (
    <Button
      size={"icon"}
      variant={"destructive"}
      disabled={isLoading}
      className="size-7 rounded-sm cursor-pointer hover:bg-red-400"
      onClick={handleClick}
    >
      <Trash2 />
    </Button>
  );
}

export const AdminAccount = () => {
  return (
    <Button 
      size={"icon"}
      variant={"destructive"}
      disabled
      className="size-7 rounded-sm"
    >
      <Trash2 />
    </Button>
  );
};
