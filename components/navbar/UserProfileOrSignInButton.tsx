"use client";

import { useSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoPeopleCircleOutline } from "react-icons/io5";
import AvatarDropdown from "../navbar/avatar/AvatarDropdown";
import { Skeleton } from "@/components/ui/skeleton"
import { getUser } from "@/lib/db";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-14 w-14 rounded-full" />;
  }

  return (
    <div className="profile">
      <div className="profile-info flex items-center">
        {session && <AvatarDropdown session={session} />}
      </div>
    </div>
  );
};

export default UserProfile;
