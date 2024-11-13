import React from "react";
import Image from "next/image";

const Avatar = ({
  imageUrl,
  width,
  height,
}: {
  imageUrl: string;
  width: number;
  height: number;
}) => {
  return (
    <div>
      <Image
        src={imageUrl || "/navbar/default-profile.jpg"}
        alt="User Avatar"
        width={width}
        height={height}
        className="avatar"
      />
    </div>
  );
};

export default Avatar;
