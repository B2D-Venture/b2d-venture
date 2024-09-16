import React from "react";
import Link from "next/link";

const DealTermBtn = ({
  text,
  textColor,
  hoverTextColor,
  bgColor,
  hoverBgColor,
  borderColor,
  hoverBorderColor,
}: DealTermBtnProps) => {
  return (
    <div className="my-2 flex items-center justify-center">
      <Link href="/company-profile"
        className={`w-[170px] ${textColor} ${bgColor} ${borderColor} text-center py-3 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg`}
      >
        {text}
      </Link>
    </div>
  );
};

export default DealTermBtn;
