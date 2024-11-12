"use client";
import AuthForm from "@/components/form/AuthForm";

const SignUp = () => (
  <AuthForm
    title="Sign Up"
    apiPath="/api/auth/signup"
    redirectPath="/welcome"
    linkPath="/signin"
    linkText="Already have an account? Sign in"
  />
);

export default SignUp;
