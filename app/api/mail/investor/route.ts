import { render } from "@react-email/render";
import EmailInvestorStatusProps from "@/emails/investor";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const {
    message,
    email,
    status,
    profileImage,
    firstName,
    lastName,
    nationalId,
    birthDate,
    nationality,
    networth,
  } = await request.json();

  try {
    const { error } = await resend.emails.send({
      from: "Acme <noreply@resend.dev>",
      to: ["bosskingblack10@gmail.com"],
      subject: "Company Creation",
      html: await render(
        EmailInvestorStatusProps({
          message,
          status,
          loginDate: new Date(),
          profileImage,
          firstName,
          lastName,
          nationalId,
          birthDate,
          email,
          nationality,
          networth,
        })
      ),
    });

    if (error) {
      console.log("error", error);
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
