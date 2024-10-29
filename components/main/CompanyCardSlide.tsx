"use client";

import React, { useEffect, useState } from "react";
import CompanyCard from "@/components/company/card/CompanyCard";
import { getAllCompanies, getInvesmentByFundingId } from "@/lib/db/index";
import { CompanyWithRaiseFunding } from "@/types/company";
import CompanyCardSlideLoading from "@/components/loading/main/CompanyCardSlideLoading";

const CompanyCardSlide = () => {
  const [companies, setCompanies] = useState<CompanyWithRaiseFunding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getAllCompanies("", 10);

        const companies = await Promise.all(
          companiesData.map(async (item) => ({
            ...item.company,
            fundingTarget: item.raiseFunding?.fundingTarget ?? null,
            minInvest: item.raiseFunding?.minInvest ?? null,
            maxInvest: item.raiseFunding?.maxInvest ?? null,
            deadline: item.raiseFunding?.deadline ?? null,
            priceShare: item.raiseFunding?.priceShare ?? null,
            investorCount: (await getInvesmentByFundingId(item.raiseFunding?.id ?? 0)).length,
          }))
        );

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
    return <CompanyCardSlideLoading />;
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
              company={company}
              className="w-[270px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyCardSlide;
