import React from "react";
import CompanyCard from "@/components/CompanyCard";
import { companyExample } from "@/constants";

const CompanyList = () => {
  const repeatedCompanies = [].concat(companyExample, companyExample, companyExample);

  return (
    <div>
      CompanyList
      <div className="flex flex-wrap m-10">
        {repeatedCompanies.map((company, index) => (
          <div key={`${company.companyName}-${index}`} className="flex-1">
            <CompanyCard
              logoUrl={company.logoUrl}
              backgroundUrl={company.backgroundUrl}
              companyName={company.companyName}
              shortDescription={company.shortDescription}
              investmentGoal={company.investmentGoal}
              investorCount={company.investorCount}
              minInvest={company.minInvest}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
