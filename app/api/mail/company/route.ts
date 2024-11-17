// import { render } from "@react-email/render";
// import EmailCompanyStatusProps from "@/emails/company";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   const {
//     message,
//     email,
//     logo,
//     banner,
//     name,
//     abbr,
//     description,
//     pitch,
//     status,
// } = await request.json();

//   try {
//     const { error } = await resend.emails.send({
//       from: "Acme <noreply@resend.dev>",
//       to: ["bosskingblack10@gmail.com"],
//       subject: "Company Register Creation",
//       html: await render(EmailCompanyStatusProps({
//         message,
//         status,
//         name,
//         logo,
//         banner,
//         abbr,
//         description,
//         pitch,
//         loginDate: new Date(),
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
