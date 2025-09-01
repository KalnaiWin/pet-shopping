// app/actions/sendEmail.ts
"use server";
import nodemailer from "nodemailer";
import { FormDataProps } from "@/lib/types/define";

export async function sendEmail(formData: FormDataProps) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: formData.email,
      to: process.env.NODEMAILER_USER,
      subject: `New message from ${formData.name}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Message: ${formData.message}
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
}
