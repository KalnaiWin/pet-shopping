import ReturnButton from "@/components/_components/return-button";

export default async function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border-2 border-gray-300 p-5 rounded-sm flex flex-col justify-center items-center gap-3">
        <ReturnButton href={"/auth/login"} label="Login" />
        <h1 className="font-bold text-green-500 text-4xl">Success</h1>
        <p className="text-muted-foreground">
          Success ! You have sent reset password link to your email.
        </p>
      </div>
    </div>
  );
}
