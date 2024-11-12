import { render } from "@react-email/render";
import PlaidVerifyIdentityEmailProps from "@/emails/otp";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request: Request) {
  const { 
    validationCode,
} = await request.json();

  try {
    const { error } = await resend.emails.send({
      from: "Acme <noreply@resend.dev>",
      to: ["bosskingblack10@gmail.com"],
      subject: "Verify Your Identity",
      html: await render(PlaidVerifyIdentityEmailProps({ 
        validationCode,
      })),
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
