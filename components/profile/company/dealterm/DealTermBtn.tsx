"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DealTermBtnProps } from "@/types";
import { useRouter } from "next/navigation";
import RedirectLoading from "@/components/loading/RedirectLoading";

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRedirectPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(link);
  };

  "w-[170px] md:w-[100px] lg:w-[120px] xl:w-[150px] text-[#423F3F] md:text-xs lg:text-md xl:text-lg bg-[#AFAB9A] border-transparent text-center py-2 font-semibold border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-black hover:text-navbarTitle hover:border-transparent shadow-md hover:shadow-lg";
  return (
    <div className="my-2 flex items-center justify-center" onClick={handleRedirectPage}>
      {isLoading && <RedirectLoading />}
      <Button
        className={`py-2 w-[170px] md:w-[100px] lg:w-[140px] xl:w-[180px] ${textColor} ${bgColor} ${borderColor} text-center md:text-[8px] lg:text-xs xl:text-lg py-2 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg`}
      >
        <Link href={link} className="">{text}</Link>
      </Button>
    </div>
  );
};

export default DealTermBtn;
