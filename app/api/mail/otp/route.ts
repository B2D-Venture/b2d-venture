import { render } from "@react-email/render";
import PlaidVerifyIdentityEmailProps from "@/emails/otp";
import { sendEmail } from "@/src/utils/mail.utils";
import logger from "@/lib/logger";

export async function POST(request: Request) {
  const {
    validationCode,
    email,
  } = await request.json();

  try {
    const htmlContent = await render(
      PlaidVerifyIdentityEmailProps({
        validationCode,
      })
    );

    await sendEmail({
      sender: "B2D-Venture <noreply@b2d-venture.com>",
      receiver: email,
      subject: "Verify Your Identity",
      html: htmlContent,
    });

    logger.info(`Server sent Verify Your Identity to ${email} successfully`, {
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
