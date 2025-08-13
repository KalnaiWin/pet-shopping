"use server";

import transporter from "@/lib/nodemailder";

const styles = {
  container:
    "max-width:500px;margin:20px;padding:20px;border:1px solid #DDD;border-radius:6px;",
  header: "font-size:20px;color:#333;",
  paragraph: "font-size:16px;",
  link: "margin-top:15px;padding:10px;display:inline-block;",
};

export async function SendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `Tiddy Pet Shop - ${subject}`,
    html: `
            <div style="${styles.container}>
                <h1 style="${styles.header}">${subject}</h1>
                <p style="${styles.paragraph}">${meta.description}</p>
                <a href="${meta.link}" style="${styles.link}">Click Here</a>
            </div>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: null };
  } catch (error) {
    console.error("Error Email: ", error);
    return { success: false };
  }
}
