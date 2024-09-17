import React from "react";
import Image from "next/image";
import { Session } from "next-auth";

const Avatar = ({
  session,
  width,
  height,
}: {
  session: Session;
  width: number;
  height: number;
}) => {
  return (
    <div>
      <Image
        src={session.user?.image || "/default-avatar.png"}
        alt="User Avatar"
        width={width}
        height={height}
        className="avatar"
      />
    </div>
  );
};

export default Avatar;
