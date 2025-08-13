"use client";

import { Role } from "@/generated/prisma";
import { admin } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserRoleSelectionProps {
  userId: string;
  role: string;
  userDate: Date;
  adminDate: Date;
  self: string;
}

export default function UserRoleSelection({
  userId,
  role,
  userDate,
  adminDate,
  self,
}: UserRoleSelectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = evt.target.value as Role;
    const changeRole = await admin.hasPermission({
      permission: {
        user: ["set-role"],
      },
    });
    if (!changeRole.data?.success) {
      return toast.error("Forbidden");
    }
    await admin.setRole({
      userId,
      role: newRole,
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Changed role successfully");
          router.refresh();
        },
      },
    });
  }

  return (
    <select
      onChange={handleChange}
      value={role}
      disabled={
        userDate.getTime() > adminDate.getTime() || isLoading || userId === self
      }
      className="text-md font-semibold disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option className="text-blue-500" value="ADMIN">
        ADMIN
      </option>
      <option className="text-green-500" value="USER">
        USER
      </option>
    </select>
  );
}
