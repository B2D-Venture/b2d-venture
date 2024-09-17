import React from "react";
import CompanyCard from "@/components/CompanyCard";
import { companyExample } from "@/constants";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

interface Company {
  logoUrl: string;
  backgroundUrl: string;
  companyName: string;
  shortDescription: string;
  investmentGoal: number;
  investorCount: number;
  minInvest: number;
}

const CompanyList = () => {
  const repeatedCompanies: Company[] = [].concat(
    companyExample,
    companyExample,
    companyExample
  );

  return (
    <div>
      <div className="search-filter mx-32 my-14 group focus-within:border-yellow-500 focus-within:border-4">
        <FaSearch className="mr-3" />
        <input
          type="text"
          className="flex-1 focus:outline-none focus:ring-0"
          placeholder="Search for companies"
        />
        <IoFilter className="ml-3" />
      </div>
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
              className="w-[390px] sm:w-[500px] md:w-[750px] lg:w-[350px] xl:w-[270px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
