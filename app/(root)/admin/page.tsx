"use client";
import React, { useState, useEffect } from "react";
import { CompanyProfileCard } from "@/components/admin/CompanyProfile/CompanyProfileCard";
import { InvestorProfileCard } from "@/components/admin/InvestorProfile/InvestorProfileCard";
import { Dealcard } from "@/components/admin/Deal/DealCard";
import {
  getInvestmentRequest,
  getCompanyRequest,
  getInvestorRequest,
  approveCompanyRequest,
  approveInvestorRequest,
  approveInvestmentRequest,
  rejectCompanyRequest,
  rejectInvestorRequest,
  rejectInvestmentRequest,
} from "@/lib/db/admin";
import { Company } from "@/types/company";
import { InvestorProps } from "@/types/investor";
import { getCompanyById } from "@/lib/db/company";
import { getInvestorById } from "@/lib/db/investor";
import { getRaiseFundingByCompanyId } from "@/lib/db/raise";

interface CompanyRequest {
  id: number;
  companyId: number;
  requestDate: Date;
  approval: boolean | null;
  company: Company;
}

interface InvestorRequest {
  id: number;
  investorId: number;
  requestDate: Date;
  approval: boolean | null;
  investor: InvestorProps;
}

interface InvestmentRequest {
  id: number;
  investorId: number;
  companyId: number;
  amount: number;
  getStock: number;
  requestDate: Date;
  approval: boolean | null;
}

const AdminPage = () => {
  const [companyData, setCompanyData] = useState<CompanyRequest[]>([]);
  const [investorData, setInvestorData] = useState<InvestorRequest[]>([]);
  const [dealData, setDealData] = useState<InvestmentRequest[]>([]);

  const fetchData = async () => {
    try {
      const companyRequests = await getCompanyRequest();
      const investorRequests = await getInvestorRequest();
      const investmentRequests = await getInvestmentRequest();

      const companyDetails = await Promise.all(
        companyRequests.map(async (request) => {
          const company = await getCompanyById(request.companyId);
          const raiseFunding = await getRaiseFundingByCompanyId(request.companyId); // Assuming this function exists
          console.log(raiseFunding);
      
          return {
            ...request,
            company: {
              ...company,
              raise_funding: raiseFunding || null,
            },
          };
        })
      );

      const investorDetails = await Promise.all(
        investorRequests.map(async (request) => {
          const investors = await getInvestorById(request.investorId);
          return {
            ...request,
            investor: investors || null,
          };
        })
      );

      setCompanyData(companyDetails);
      setInvestorData(investorDetails);
      setDealData(investmentRequests);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="text-white flex flex-col items-center mt-10 space-y-4">
      {/* Render Company Cards */}
      {companyData.length > 0 &&
        companyData.map((companyRequest, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <script>
              console.log(companyRequest.company?.raise_funding);
            </script>
            <CompanyProfileCard
              logo={companyRequest.company?.logo || "default_logo_url.png"} // Default logo if none exists
              companyName={
                companyRequest.company?.name ||
                `Company ${companyRequest.companyId}`
              }
              description={
                companyRequest.company?.description ||
                `Description for Company ${companyRequest.companyId}`
              }
              abbreviation={companyRequest.company?.abbr || "AMD"}
              valuation={companyRequest.company?.raise_funding?.fundingTarget || 9999}
              minimumInvestment={companyRequest.company?.raise_funding?.minInvest || 9999}
              maximumInvestment={companyRequest.company?.raise_funding?.maxInvest || 9999}
              securityType={companyRequest.company?.raise_funding?.deadline || "Stock"}
              target={companyRequest.company?.raise_funding?.fundingTarget || 9999}              
              handleApprove={async () => {
                try {
                  await approveCompanyRequest(companyRequest.id);
                  await delay(100); // Small delay to ensure smooth UI update
                  fetchData(); // Re-fetch data after approval
                  console.log("Approved Company Request");
                } catch (error) {
                  console.error("Error approving company request:", error);
                }
              }}
              handleReject={async () => {
                try {
                  await rejectCompanyRequest(companyRequest.id);
                  await delay(100); // Small delay to ensure smooth UI update
                  fetchData(); // Re-fetch data after rejection
                  console.log("Rejected Company Request");
                } catch (error) {
                  console.error("Error rejecting company request:", error);
                }
              }}
            />
          </div>
        ))}

      {/* Render Investor Cards */}
      {investorData.length > 0 &&
        investorData.map((investorRequest, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <InvestorProfileCard
              logo={
                investorRequest.investor?.profileImage ||
                "https://utfs.io/f/EDwc07VFqTZJz8b9sjIOrtwiWIsCUTmuHpyAX4vVgBK5kdxn"
              } // Default logo if none exists
              investorName={
                investorRequest.investor?.firstName +
                  " " +
                  investorRequest.investor?.lastName ||
                `Investor ${investorRequest.investorId}`
              }
              Nationality={investorRequest.investor?.nationality || "Unknown"}
              email={investorRequest.investor?.email || "email@domain.com"}
              age={investorRequest.investor?.age || 30} // Default age if not available
              netWorth={investorRequest.investor?.netWorth || 0} // Default net worth if not available
              moneyReadyForInvestment={
                investorRequest.investor?.invesinvestable_amount || 0
              }
              handleApprove={async () => {
                await approveInvestorRequest(investorRequest.id);
                await delay(100);
                fetchData(); // Refresh data after approval
                console.log("Approve Investor Request");
              }}
              handleReject={async () => {
                await rejectInvestorRequest(investorRequest.id);
                await delay(100);
                fetchData(); // Refresh data after rejection
                console.log("Reject Investor Request");
              }}
            />
          </div>
        ))}

      {/* Render Deal Cards */}
      {dealData.length > 0 &&
        dealData.map((deal, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <Dealcard
              investorName={`Investor ${deal.investorId}`}
              moneyReadyForInvestment={deal.amount}
              investAmount={deal.amount}
              stockPercentage={deal.getStock}
              companyName={`Company ${deal.companyId}`}
              raiseTarget={10000000}
              raisePercentage={10}
              valuation={10000000}
              handleApprove={async () => {
                await approveInvestmentRequest(deal.id);
                await delay(100);
                console.log("Approve Investment Request");
                fetchData();
              }}
              handleReject={async () => {
                await rejectInvestmentRequest(deal.id);
                await delay(100);
                console.log("Reject Investment Request");
                fetchData();
              }}
            />
          </div>
        ))}

      {/* Refresh Data Button */}
      <button
        onClick={fetchData}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh Data
      </button>

      <button
        onClick={() => {
          // console.log(companyData);
        }}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Log Data to Console
      </button>
    </div>
  );
};

export default AdminPage;
