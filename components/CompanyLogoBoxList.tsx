"use client";

import React, { useEffect, useState } from "react";
import CompanyLogoBox from "@/components/CompanyLogoBox";
import { getAllCompanies } from "@/lib/db/company";
import { Company } from "@/types";

const CompanyLogoBoxList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await getAllCompanies("", 12);
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
    <div className="company-logo-boxlist">
      {companies.map((company) => (
        <CompanyLogoBox
          key={company.id}
          logoUrl={company.logo}
          companyAbbr={company.abbr}
          companyName={company.name}
        />
      ))}
    </div>
  );
};

export default CompanyLogoBoxList;
