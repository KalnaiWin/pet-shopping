import ReturnButton from "@/components/_components/return-button";
import ForgetPasswordForm from "@/components/auth/forget-password-form";
import ResetPasswordForm from "@/components/auth/reset-password";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const token = (await searchParams).token;

  if (!token) redirect("/auth/login");

  return (
    <div className="absolute top-5 left-5">
      <div className="p-5 rounded-sm flex flex-col justify-start items-center gap-3">
        <div className="w-full">
          <ReturnButton href={"/auth/login"} label="Login" />
        </div>
        <h1 className="font-bold text-green-500 text-4xl w-full">
          Reset Password
        </h1>
        <p className="text-muted-foreground">
          Please enter your new password. Make sure it should be at least 6
          chracters.
        </p>
        <div className="w-full">
            <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
