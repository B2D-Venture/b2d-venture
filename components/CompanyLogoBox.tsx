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
        className="rounded-lg shadow-md border-solid border-white border-2 group-hover:top-[50px] z-10 transition-all ease-in-out duration-300"
      />
      <div className="ml-4 flex flex-col">
        <div className="text-white text-xl font-bold">
          {companyAbbr}
        </div>
        <div className="text-white text-base font-bold">
          {companyName}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoBox;