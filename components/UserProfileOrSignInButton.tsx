"use client";

import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoPeopleCircleOutline } from "react-icons/io5";
import AvatarDropdown from "./navbar/avatar/AvatarDropdown";
import { Skeleton } from "@/components/ui/skeleton"

const UserProfileOrSignInButton = () => {
  const { data: session, status } = useSession();
  const signInClick = () => {
    signIn("google", { callbackUrl: "/role-register" });
  };

  if (status === "loading") {
    return <Skeleton className="h-14 w-14 rounded-full" />;
  }

  if (session) {
    return (
      <div className="profile">
        <div className="profile-info flex items-center">
          <AvatarDropdown session={session} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={signInClick} className="google-button">
        <div className="google-label flex items-center">
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

export default UserProfileOrSignInButton;
