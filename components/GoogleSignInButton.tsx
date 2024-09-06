import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoPeopleCircleOutline } from "react-icons/io5";

const GoogleSignInButton = () => {
  const signInClick = () => {
    signIn("google");
  };
  return (
    <div>
      <button onClick={signInClick} className="google-button">
        <div className="google-label">
          <FcGoogle className="mr-3 text-lg" />
          Sign in with Google
        </div>
        <div className="flex justify-center text-yellow-500 text-2xl">
          <IoPeopleCircleOutline />
        </div>
      </button>
    </div>
  );
};

export default GoogleSignInButton;
