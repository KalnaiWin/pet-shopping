import ReturnButton from "@/components/_components/return-button";
import ForgetPasswordForm from "@/components/auth/forget-password-form";

export default async function page() {
  return (
    <div className="absolute top-5 left-5">
      <div className="p-5 rounded-sm flex flex-col justify-start items-center gap-3">
        <div className="w-full">
          <ReturnButton href={"/auth/login"} label="Login" />
        </div>
        <h1 className="font-bold text-green-500 text-4xl w-full">Success</h1>
        <p className="text-muted-foreground">
          Please enter your email address to receive reset password link.
        </p>
        <div className="w-full">
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
}
