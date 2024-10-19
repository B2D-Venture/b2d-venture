"use client";

import React, { useEffect, useState } from "react";
import CompanyCard from "@/components/CompanyCard";
import { getAllCompanies } from "@/lib/db/company";
import { CompanyWithRaiseFunding } from "@/types/company";

const CompanyCardSlide = () => {
  const [companies, setCompanies] = useState<CompanyWithRaiseFunding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getAllCompanies("", 10);

        const companies = companiesData.map((item) => ({
          ...item.company,
          fundingTarget: item.raiseFunding?.fundingTarget ?? null,
          minInvest: item.raiseFunding?.minInvest ?? null,
          maxInvest: item.raiseFunding?.maxInvest ?? null,
          deadline: item.raiseFunding?.deadline ?? null,
          priceShare: item.raiseFunding?.priceShare ?? null,
        }));

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
