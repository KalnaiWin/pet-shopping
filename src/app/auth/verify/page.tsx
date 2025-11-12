import ReturnButton from "@/components/_components/return-button";
import SendVerifyEmailForm from "@/components/auth/send-verify-email-form";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function page({ searchParams }: PageProps) {
  
    const error = (await searchParams).error;

    if(!error) redirect("/");

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border-2 border-gray-300 p-5 rounded-sm flex flex-col justify-center items-center gap-5">
        <ReturnButton href={"/auth/login"} label="Login" />
        <h1 className="font-bold text-red-500 text-4xl">Verify Email</h1>
        <p className="text-destructive">
          {error === "token_expired" || error === "invalid_token"
            ? "Your email verify is expired please request a new one."
            : "Have something went wrong."}
        </p>
        <SendVerifyEmailForm/>
      </div>
    </div>
  );
}
