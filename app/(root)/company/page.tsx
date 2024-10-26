"use client";

import React, { useEffect, useState } from "react";
import CompanyCard from "@/components/CompanyCard";
import SearchBar from "@/components/SearchBar";
import { getAllCompanies } from "@/lib/db/company";
import { useSearchParams } from "next/navigation";
import { CompanyWithRaiseFunding } from "@/types/company";

const CompanyList = () => {
  const [allCompanies, setAllCompanies] = useState<CompanyWithRaiseFunding[]>(
    [],
  );
  const [filteredCompanies, setFilteredCompanies] = useState<
    CompanyWithRaiseFunding[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getAllCompanies();

        const companies = companiesData.map((item) => ({
          ...item.company,
          fundingTarget: item.raiseFunding?.fundingTarget ?? null,
          minInvest: item.raiseFunding?.minInvest ?? null,
          maxInvest: item.raiseFunding?.maxInvest ?? null,
          deadline: item.raiseFunding?.deadline ?? null,
          priceShare: item.raiseFunding?.priceShare ?? null,
        }));

        setAllCompanies(companies);
        setFilteredCompanies(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";

    const searchPattern = searchQuery.toLowerCase();
    const filtered = allCompanies.filter((company) => {
      return (
        company.name.toLowerCase().includes(searchPattern) ||
        company.description.toLowerCase().includes(searchPattern)
      );
    });
    setFilteredCompanies(filtered);
  }, [searchParams, allCompanies]);

  return (
    <div>
      <SearchBar
        initialSearch={searchParams.get("search") || ""}
        classSearch="search-filter"
        showSort={true}
      />
      {loading && (
        <div className="flex justify-center items-center mt-40 text-white text-left text-3xl font-bold">
          Loading...
        </div>
      )}
      {error && <div className="flex flex-wrap m-10 text-white">{error}</div>}
      {filteredCompanies.length === 0 && !loading && (
        <div className="flex justify-center items-center mt-40 text-white text-left text-3xl font-bold">
          No companies found.
        </div>
      )}
      <div className="flex flex-wrap m-10">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="flex-1">
            <CompanyCard
              companyId={company.id}
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
