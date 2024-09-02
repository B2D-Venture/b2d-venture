import React from "react";
import CompanyCard from "@/components/CompanyCard";
import { companyExample } from "@/constants";

const Home = () => {
  return (
    <div>
      HOME
      {companyExample.map((company) => (
        <CompanyCard
          key={company.companyName}
          logoUrl={company.logoUrl}
          backgroundUrl={company.backgroundUrl}
          companyName={company.companyName}
          shortDescription={company.shortDescription}
          investmentGoal={company.investmentGoal}
          investorCount={company.investorCount}
        />
      ))}
    </div>
  );
};

export default Home;
