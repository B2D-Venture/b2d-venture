import SMTPTransport from "nodemailer/lib/smtp-transport";

const nodemailer = require("nodemailer");

type sendEmailProps = {
  sender: string;
  receiver: string;
  subject: string;
  html: string;
};

export async function sendEmail({
  sender,
  receiver,
  subject,
  html,
}: sendEmailProps) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  } as SMTPTransport.Options);

  try {
    transporter.sendMail({
      from: sender,
      to: receiver,
      subject,
      html,
    });

    return { message: "Email sent successfully" };
  } catch (error) {
    return { error: "Failed to send email" };
  }
}
