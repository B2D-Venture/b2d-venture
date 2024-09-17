import React from "react";
import Image from "next/image";

const CompanyLogoBox = ({
  logoUrl,
  companyAbbr,
  companyName,
}: CompanyLogoBoxProps) => {
  return (
    <div className="relative flex items-center">
      <Image
        src={logoUrl}
        alt={`${companyName} logo`}
        width={57}
        height={57}
        className="rounded-lg shadow-md border-solid border-white border-2 group-hover:top-[50px] z-10 transition-all ease-in-out duration-300 max-lg:w-[50px] max-sm:w-[40px]"
      />
      <div className="ml-4 flex flex-col">
        <div className="text-white text-xl font-bold max-lg:text-lg max-sm:text-sm">
          {companyAbbr}
        </div>
        <div className="text-white text-base font-bold max-lg:text-lg max-sm:text-sm">
          {companyName}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoBox;
