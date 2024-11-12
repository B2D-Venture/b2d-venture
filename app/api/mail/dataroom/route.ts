import { render } from "@react-email/render";
import EmailDataroomStatusProps from "@/emails/dataroom";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { 
    message,
    email,
    status,
    company,
    investorProfile,
} = await request.json();

  try {
    const { error } = await resend.emails.send({
      from: "Acme <noreply@resend.dev>",
      to: ["bosskingblack10@gmail.com"],
      subject: "Dataroom Request Status",
      html: await render(EmailDataroomStatusProps({ 
        message,
        status,
        loginDate: new Date(),
        company,
        investorProfile,
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
