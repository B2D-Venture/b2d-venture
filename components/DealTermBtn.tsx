import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DealTermBtnProps } from "@/types";

const DealTermBtn = ({
  text,
  textColor,
  hoverTextColor,
  bgColor,
  hoverBgColor,
  borderColor,
  hoverBorderColor,
  link,
}: DealTermBtnProps) => {
  return (
    <div className="my-2 flex items-center justify-center">
      <Button
        className={`py-2 w-[170px] ${textColor} ${bgColor} ${borderColor} text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg`}
      >
        <Link href={link}>{text}</Link>
      </Button>
    </div>
  );
};

export default DealTermBtn;
