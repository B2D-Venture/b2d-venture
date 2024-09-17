import React from "react";
import CompanyCard from "@/components/CompanyCard";
import { companyExample } from "@/constants";

const CompanyCardSlide = () => {
  return (
    <div>
      <div className="overflow-x-auto whitespace-nowrap py-4">
        <div className="inline-flex">
          {Array.from({ length: 3 }, () => companyExample)
            .flat()
            .concat(companyExample)
            .map((company) => (
              <CompanyCard
                key={company.companyName}
                logoUrl={company.logoUrl}
                backgroundUrl={company.backgroundUrl}
                companyName={company.companyName}
                shortDescription={company.shortDescription}
                investmentGoal={company.investmentGoal}
                investorCount={company.investorCount}
                minInvest={company.minInvest}
                className="w-[270px]"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyCardSlide;
