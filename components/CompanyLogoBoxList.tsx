import React from "react";
import CompanyLogoBox from "@/components/CompanyLogoBox";
import { companyExample } from "@/constants";

const CompanyLogoBoxList = () => {
  return (
    <div className="company-logo-boxlist">
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
