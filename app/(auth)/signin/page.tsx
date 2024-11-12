"use client";
import AuthForm from "@/components/form/AuthForm";

const SignIn = () => (
  <AuthForm
    title="Sign In"
    apiPath="/api/auth/signin"
    redirectPath="/dashboard"
    linkPath="/signup"
    linkText="Don't have an account yet? Sign up"
  />
);

export default SignIn;

