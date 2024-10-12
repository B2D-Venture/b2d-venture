"use client";

import React, { useEffect, useState } from "react";
import CompanyCard from "@/components/CompanyCard";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { getAllCompanies } from "@/lib/db";
import { Company } from "@/types";

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getAllCompanies();
        setCompanies(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        {companies.map((company) => (
          <div key={company.abbr} className="flex-1">
            <CompanyCard
              logoUrl={company.logo}
              backgroundUrl={company.banner}
              companyName={company.name}
              shortDescription={company.description}
              investmentGoal={company.fundingTarget}
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
