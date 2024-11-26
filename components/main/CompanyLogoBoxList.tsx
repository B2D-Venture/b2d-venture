"use client";

import React, { useEffect, useState } from "react";
import CompanyLogoBox from "@/components/company/CompanyLogoBox";
import { getAllCompanies } from "@/lib/db/company";
import { Company } from "@/types/company";
import CompanyLogoBoxLoading from "@/components/loading/main/CompanyLogoBoxLoading";

const CompanyLogoBoxList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getAllCompanies("", 12, "companyId", "desc");
        const companies = companiesData.map((item) => ({
          id: item.company.id as number,
          abbr: item.company.abbr as string,
          name: item.company.name as string,
          logo: item.company.logo as string,
          banner: item.company.banner as string,
          description: item.company.description as string,
          pitch: item.company.pitch as string,
          registrationNumber: item.company.registrationNumber as string,
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
    return <CompanyLogoBoxLoading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="company-logo-boxlist">
      {companies.map((company) => (
        <CompanyLogoBox
          key={company.id}
          companyId={company.id ?? 0}
          logoUrl={company.logo}
          companyAbbr={company.abbr}
          companyName={company.name}
        />
      ))}
    </div>
  );
};

export default CompanyLogoBoxList;
