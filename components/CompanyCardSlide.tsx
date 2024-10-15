"use client";

import React, { useEffect, useState } from "react";
import CompanyCard from "@/components/CompanyCard";
import { getAllCompanies } from "@/lib/db/company";
import { Company } from "@/types";

const CompanyCardSlide = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getAllCompanies("", 10);
        setCompanies(companies);
      } catch (err) {
        console.error("Error fetching companies:", err);
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
      <div className="overflow-x-auto whitespace-nowrap py-4">
        <div className="inline-flex">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              logoUrl={company.logo}
              backgroundUrl={company.banner}
              companyName={company.name}
              shortDescription={company.description}
              investmentGoal={company.fundingTarget}
              investorCount={0}
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
