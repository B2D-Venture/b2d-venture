"use client";
import dynamic from "next/dynamic";

const AuthFormDynamic = dynamic(() => import("@/components/form/AuthForm"), {
  ssr: false,
});

const SignIn = () => (
  <AuthFormDynamic
    title="Sign In"
    apiPath="/api/auth/signin"
    redirectPath="/dashboard"
    linkPath="/signup"
    linkText="Don't have an account yet? Sign up"
  />
);

export default SignIn;

