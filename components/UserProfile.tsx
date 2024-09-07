"use client";  // Ensure this is a client-side component

import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoPeopleCircleOutline } from "react-icons/io5";
import Image from "next/image";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="profile">
        <div className="profile-info flex items-center">
          <Image
            src={session.user?.image || "/default-avatar.png"}
            alt="User Avatar"
            width={50}
            height={50}
            className="avatar"
          />
          <span className="ml-2">Welcome, {session.user?.name}</span>
          <button onClick={() => signOut()} className="ml-4 sign-out-button">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn("google")} className="google-button">
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

export default UserProfile;
