"use client";
import dynamic from "next/dynamic";

const AuthFormDynamic = dynamic(() => import("@/components/form/AuthForm"), {
  ssr: false,
});

const ResetPasswordPage = () => (
  <AuthFormDynamic
    title="Reset Password"
    apiPath="/api/auth/reset-password"
    redirectPath="/dashboard"
    linkPath="/signup"
    linkText="Don't have an account yet? Sign up"
  />
);

export default ResetPasswordPage;

