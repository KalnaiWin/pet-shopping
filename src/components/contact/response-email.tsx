"use client";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mailFormSchema } from "@/lib/zodSchema";
import { FormDataProps } from "@/lib/types/define";
import { sendEmail } from "@/actions/auth/email-response";

export default function ResponseEmail() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProps>({
    resolver: zodResolver(mailFormSchema),
  });

  const onSubmit = async (data: FormDataProps) => {
    const result = await sendEmail(data);
    if (result.success) {
      toast.success("Email sent successfully!");
      reset();
    } else {
      toast.error("Failed to send email: " + result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          type="text"
          {...register("name")}
          placeholder="Enter your name..."
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          {...register("email")}
          placeholder="Enter your email..."
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Phone</Label>
        <PhoneInput
          country="vn"
          inputStyle={{ width: "100%", borderRadius: "8px" }}
          onChange={(phone) => setValue("phone", phone)}
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Message</Label>
        <Textarea
          {...register("message")}
          placeholder="Enter your message..."
        />
        {errors.message && (
          <span className="text-red-500">{errors.message.message}</span>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Send Message"}
      </Button>
    </form>
  );
}
