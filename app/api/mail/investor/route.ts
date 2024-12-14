import { render } from "@react-email/render";
import EmailInvestorStatusProps from "@/emails/investor";
import { sendEmail } from "@/src/utils/mail.utils";
import logger from "@/lib/logger";

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
    const htmlContent = await render(
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
    );

    await sendEmail({
      sender: "B2D-Venture <noreply@b2d-venture.com>",
      receiver: email,
      subject: "Investor Register Creation",
      html: htmlContent,
    });
    logger.info(`Server sent Investor Register Creation to ${email} successfully`, {
      email,
      service: 'server-service',
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
