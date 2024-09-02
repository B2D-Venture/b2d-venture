import React from "react";
import CompanyCard from "@/components/CompanyCard";
import { companyExample } from "@/constants";

const CompanyList = () => {
  return (
    <div>
      CompanyList
      <div className="flex flex-row m-10">
        {companyExample.map((company) => (
          <CompanyCard
            key={company.companyName}
            logoUrl={company.logoUrl}
            backgroundUrl={company.backgroundUrl}
            companyName={company.companyName}
            shortDescription={company.shortDescription}
            investmentGoal={company.investmentGoal}
            investorCount={company.investorCount}
            minInvest={company.minInvest}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
