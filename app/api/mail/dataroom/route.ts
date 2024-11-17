import { render } from "@react-email/render";
import EmailDataroomStatusProps from "@/emails/dataroom";
import { sendEmail } from "@/src/utils/mail.utils";

export async function POST(request: Request) {
  const { 
    message,
    email,
    status,
    company,
    investorProfile,
  } = await request.json();

  try {
    const htmlContent = await render(
      EmailDataroomStatusProps({
        message,
        status,
        loginDate: new Date(),
        company,
        investorProfile,
      })
    );

    await sendEmail({
      sender: "B2D-Venture <noreply@b2d-venture.com>",
      receiver: email,
      subject: "Dataroom Request Status",
      html: htmlContent,
    });
      
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
