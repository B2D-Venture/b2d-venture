import { render } from "@react-email/render";
import YelpRecentLoginEmail from "@/emails"; // Adjust the path as needed
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, userFirstname } = await request.json();

  try {
    const { error } = await resend.emails.send({
      from: "Acme <noreply@resend.dev>",
      to: [email],
      subject: "Thank you",
      html: await render(YelpRecentLoginEmail({ userFirstName: userFirstname })),
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
