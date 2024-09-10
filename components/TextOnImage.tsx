import React from "react";
import Image from "next/image";

const TextOnImage = () => {
  return (
    <div className="relative w-full h-auto">
      <Image
        className="w-full h-auto"
        src="/img-main/background-img-main.png"
        alt="Background"
        width={1440}
        height={630}
      />
      <div className="text-container-on-image">
        <span className="text-on-image-white">
          Invest for Future in
          <br></br>
          Stable Platform and
        </span>
        <br></br>
        <span className="text-on-image-orange">Make Fast Money</span>
      </div>
    </div>
  );
};

export default TextOnImage;
