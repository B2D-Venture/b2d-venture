"use client";
import React, { useState, useEffect } from "react";
import { CompanyProfileCard } from "@/components/admin/CompanyProfile/CompanyProfileCard";
import { InvestorProfileCard } from "@/components/admin/InvestorProfile/InvestorProfileCard";
import { Dealcard } from "@/components/admin/Deal/DealCard";
import {
  getInvestmentRequest,
  getCompanyRequest,
  getInvestorRequest,
  getCompanyById,
  getInvestorById,
  approveCompanyRequest,
  approveInvestorRequest,
  approveInvestmentRequest,
  rejectCompanyRequest,
  rejectInvestorRequest,
  rejectInvestmentRequest,
} from "@/lib/db";

// Define TypeScript interfaces for your data
interface CompanyRequest {
  id: number;
  companyId: number;
  requestDate: Date;
  approval: boolean;
}

interface InvestorRequest {
  id: number;
  investorId: number;
  requestDate: Date;
  approval: boolean;
}

interface InvestmentRequest {
  id: number;
  investorId: number;
  companyId: number;
  amount: number;
  getStock: number;
  requestDate: Date;
  approval: boolean;
}

const AdminPage = () => {
  const [companyData, setCompanyData] = useState<CompanyRequest[]>([]);
  const [investorData, setInvestorData] = useState<InvestorRequest[]>([]);
  const [dealData, setDealData] = useState<InvestmentRequest[]>([]);

  const fetchData = async () => {
    try {
      const companyRequests = await getCompanyRequest();
      console.log("Fetched Company Requests:", companyRequests);
      const investorRequests = await getInvestorRequest();
      const investmentRequests = await getInvestmentRequest();

      // Fetch company details for each request
      const companyDetails = await Promise.all(
        companyRequests.map(async (request) => {
          const companies = await getCompanyById(request.companyId);
          return {
            ...request,
            company: companies[0] || null, // Assuming the response is an array
          };
        })
      );

      // Fetch investor details for each request
      const investorDetails = await Promise.all(
        investorRequests.map(async (request) => {
          const investors = await getInvestorById(request.investorId);
          return {
            ...request,
            investor: investors[0] || null, // Assuming the response is an array
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
              abbreviation={companyRequest.company?.abbr || "CMP"}
              valuation={companyRequest.company?.fundingTarget || 10000000}
              minimumInvestment={companyRequest.company?.minInvest || 100000}
              maximumInvestment={companyRequest.company?.maxInvest || 1000000}
              securityType={companyRequest.company?.securityType || "Stock"}
              target={companyRequest.company?.fundingTarget || 10000000}
              handleApprove={async () => {
                await approveCompanyRequest(companyRequest.id);
                await delay(100);
                fetchData();
                console.log("Approve Company Request");
              }}
              handleReject={async () => {
                await rejectCompanyRequest(companyRequest.id);
                await delay(100);
                fetchData();
                console.log("Reject Company Request");
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
                investorRequest.investor?.name ||
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
              investorName={`Investor ${deal.investorId}`} // This could be fetched as well
              moneyReadyForInvestment={deal.amount}
              investAmount={deal.amount} // This could be the investment amount
              stockPercentage={deal.getStock} // This should be the stock percentage offered
              companyName={`Company ${deal.companyId}`} // This could be the company's name if fetched
              raiseTarget={10000000} // Fetch this value if applicable
              raisePercentage={10} // This might need to be calculated based on your logic
              valuation={10000000} // Fetch this if applicable
              handleApprove={async () => {
                await approveInvestmentRequest(deal.id);
                await delay(100);
                console.log("Approve Investment Request");
                fetchData(); // Refresh data after approval
              }}
              handleReject={async () => {
                await rejectInvestmentRequest(deal.id);
                await delay(100);
                console.log("Reject Investment Request");
                fetchData(); // Refresh data after rejection
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
          console.log(companyData, investorData, dealData);
        }}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Log Data to Console
      </button>
    </div>
  );
};

export default AdminPage;
