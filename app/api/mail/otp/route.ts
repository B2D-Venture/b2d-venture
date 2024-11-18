// import { render } from "@react-email/render";
// import PlaidVerifyIdentityEmailProps from "@/emails/otp";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);


// export async function POST(request: Request) {
//   const { 
//     validationCode,
// } = await request.json();

//   try {
//     const { error } = await resend.emails.send({
//       from: "Acme <noreply@resend.dev>",
//       to: ["bosskingblack10@gmail.com"],
//       subject: "Verify Your Identity",
//       html: await render(PlaidVerifyIdentityEmailProps({ 
//         validationCode,
//       })),
//     });

//     if (error) {
//       return new Response(JSON.stringify({ error }), { status: 500 });
//     }

//     return new Response(JSON.stringify({ message: "Email sent successfully" }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to send email" }), {
//       status: 500,
//     });
//   }
// }

import { render } from "@react-email/render";
import PlaidVerifyIdentityEmailProps from "@/emails/otp";
import { sendEmail } from "@/src/utils/mail.utils";

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
