"use client";
import dynamic from "next/dynamic";

const AuthFormDynamic = dynamic(() => import("@/components/form/AuthForm"), {
  ssr: false,
});

const SignUp = () => (
  <AuthFormDynamic
    title="Sign Up"
    apiPath="/api/auth/signup"
    linkPath="/signin"
    linkText="Already have an account? Sign in"
  />
);

export default SignUp;
