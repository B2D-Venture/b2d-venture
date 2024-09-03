import React from "react";
import CompanyLogoBox from "@/components/CompanyLogoBox";
import { companyExample } from "@/constants";

const CompanyLogoBoxList = () => {
  return (
    <div className="w-[1367px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10">
      {Array.from({ length: 4 }, () => companyExample)
        .flat()
        .map((company) => (
          <CompanyLogoBox
            key={company.companyName}
            logoUrl={company.logoUrl}
            companyAbbr={company.companyAbbr}
            companyName={company.companyName}
          />
        ))}
    </div>
  );
};

export default CompanyLogoBoxList;
