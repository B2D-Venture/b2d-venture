[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c0949a3f06ec4ba2b82b76f425a776e4)](https://app.codacy.com/gh/B2D-Venture/b2d-venture/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
# B2D Venture

## Overview
B2D Venture aims to create a robust online platform designed to connect investors with companies seeking funding. The platform will facilitate seamless transactions, offer detailed company profiles, and provide administrative oversight. The project is expected to last approximately four months, with a budget of 1 million baht.

## Documentation
Project wiki documents [Click Here](https://github.com/B2D-Venture/b2d-venture/wiki).

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Environment Variable Setup

### NextAuth Configuration
| Variable                               | Description                |
|:---------------------------------------|----------------------------|
| `NEXTAUTH_SECRET`                     | A secret key used to sign JWT tokens for authentication sessions.  |
| `NEXTAUTH_URL`                  | The base URL of your Next.js application, typically http://localhost:3000 for development.  |


### Google OAuth Configuration
To get google oauth client id and secret key follow these steps.
1. Go to [Google Cloud Platform](https://console.cloud.google.com/)
2. Create a new project
3. Go to Credentials (On the left side bar under APIs & Services)
4. Create Credentials
5. Select OAuth Client ID
6. Select Web Application
7. Put your credentials in .env file in the root directory of the project
8. Go to OAuth consent screen
9. Add your domain to Authorized domains
10. Add your email to Test users

| Variable                               |Description                                                                        |
|:---------------------------------------|------------------------------------------------------------------------------------|
| `GOOGLE_OAUTH_CLIENT_ID`         | The client ID for your Google OAuth application.   |
| `GOOGLE_OAUTH_SECRET`              | The client secret for your Google OAuth application. |


### Neon Configuration

To get neon database url follow these steps.
1. Go to [NEON](https://neon.tech/) (Read [Documentation](https://neon.tech/docs/introduction))
2. Create a new project
3. Create a Database
4. Go to Dashboard and copy psql url and put it in .env file in the root directory of the project

| Variable                               | Description                |
|:---------------------------------------|----------------------------|
| `DATABASE_URL`                         | Postgres Database NEON url |

### Uploadthing Token
Follow the official [Uploadthing Documentation](https://docs.uploadthing.com/) for setup instructions.
| Variable                               | Description                |
|:---------------------------------------|----------------------------|
| `UPLOADTHING_TOKEN`           | Authentication token for integration with the UploadThing service.|


### Google reCaptcha
Follow the official [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/intro) for setup instructions.
| Variable                               | Description                |
|:---------------------------------------|----------------------------|
| `RECAPTCHA_PUBLIC_KEY`                         | The public site key for Google reCAPTCHA, used in the HTML served to users. |
| `RECAPTCHA_SECRET_KEY`                         | The secret key for verifying reCAPTCHA responses between your site and Google. |

### Nodemailer
| Variable                               | Description                |
|:---------------------------------------|----------------------------|
| `EMAIL_USER`                         | The email address used to send emails via Nodemailer. |
| `EMAIL_PASSWORD`                         | App-specific password for the email account used in Nodemailer authentication (use app-specific security). |
