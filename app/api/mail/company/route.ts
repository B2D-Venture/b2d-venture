// import { render } from "@react-email/render";
// import YelpRecentLoginEmail from "@/emails";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// // id: serial("id").primaryKey().notNull(),
// //   logo: varchar("logo").notNull(),
// //   banner: varchar("banner").notNull(),
// //   name: varchar("name").notNull(),
// //   abbr: varchar("abbr", { length: 10 }).notNull(),
// //   description: text("description").notNull(),
// //   pitch: text("pitch").notNull(),

// export async function POST(request: Request) {
//   const { 
//     email,
//     logo, 
//     banner,
//     name,
//     abbr,
//     description,
//     pitch,
// } = await request.json();

//   try {
//     const { error } = await resend.emails.send({
//       from: "Acme <noreply@resend.dev>",
//       to: [email],
//       subject: "Thank you",
//       html: await render(YelpRecentLoginEmail({ 
//         name,
//         // loginDate: new Date(),
//         // loginDevice: "iPhone",
//         // loginLocation: "San Francisco",
//         // loginIp: "",
//         logo,
//         banner,
//         abbr,
//         description,
//         pitch

//       })),
//     });

//     if (error) {
//       return new Response(JSON.stringify({ error }), { status: 500 });
//     }

//     return new Response(JSON.stringify({ message: "Email sent successfully" }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.log("error", error);
//     return new Response(JSON.stringify({ error: "Failed to send email" }), {
//       status: 500,
//     });
//   }
// }
