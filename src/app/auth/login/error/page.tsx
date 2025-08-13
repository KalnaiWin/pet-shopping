import ReturnButton from "@/components/_components/return-button";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const sp = await searchParams;

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border-2 border-gray-300 p-5 rounded-sm flex flex-col justify-center items-center gap-3">
        <ReturnButton href={"/auth/login"} label="Login" />
        <h1 className="font-bold text-red-500 text-4xl">Login Error</h1>
        <p className="text-destructive">
          {sp.error === "account_not_linked"
            ? "The account with this email was already exist."
            : "Have something went wrong."}
        </p>
      </div>
    </div>
  );
}
