import logger from "@/lib/logger";

import { render } from "@react-email/render";
import EmailCompanyStatusProps from "@/emails/company";
import { sendEmail } from "@/src/utils/mail.utils";

export async function POST(request: Request) {
  const {
    message,
    email,
    logo,
    banner,
    name,
    abbr,
    description,
    pitch,
    status,
  } = await request.json();

  try {
    const htmlContent = await render(
      EmailCompanyStatusProps({
        message,
        logo,
        banner,
        name,
        abbr,
        description,
        pitch,
        status,
      })
    );

    await sendEmail({
      sender: "B2D-Venture <noreply@b2d-venture.com>",
      receiver: email,
      subject: "Dataroom Request Status",
      html: htmlContent,
    });
    logger.info(`Server sent Company Registration Status to ${email} successfully`, {
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
