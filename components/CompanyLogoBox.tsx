import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CompanyLogoBoxProps } from "@/types";

const CompanyLogoBox = ({
  companyId,
  logoUrl,
  companyAbbr,
  companyName,
}: CompanyLogoBoxProps) => {
  return (
    <Link href={`/company/${companyId}`}>
      <div className="relative flex items-center p-4 bg-gradient-to-r from-[#292929] to-[#181a20] rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="relative w-[70px] h-[70px] max-lg:w-[50px] max-sm:w-[40px]">
          <Image
            src={logoUrl}
            alt={`${companyName} logo`}
            layout="fill"
            className="rounded-lg shadow-md border-solid border-white border-2 hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="ml-6 flex flex-col">
          <div className="text-white text-2xl font-extrabold tracking-wide max-lg:text-lg max-sm:text-base">
            {companyAbbr}
          </div>
          <div className="text-gray-200 text-base font-semibold max-lg:text-sm max-sm:text-xs">
            {companyName}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyLogoBox;
