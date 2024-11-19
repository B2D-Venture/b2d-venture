"use client";
import React, { useState, useEffect } from "react";
import { CompanyProfileCard } from "@/components/admin/CompanyProfile/CompanyProfileCard";
import { InvestorProfileCard } from "@/components/admin/InvestorProfile/InvestorProfileCard";
import { RaiseFundingCard } from "@/components/admin/Raisefunding/RaisefundingCard";
import { Dealcard } from "@/components/admin/Deal/DealCard";
import {
  getInvestmentRequest,
  getCompanyRequest,
  getInvestorRequest,
  getRaiseFundingRequests,
  approveCompanyRequest,
  approveInvestorRequest,
  approveInvestmentRequest,
  approveRaiseFundingRequest,
  rejectCompanyRequest,
  rejectInvestorRequest,
  rejectInvestmentRequest,
  rejectRaiseFundingRequest,
  getUserByCompanyId,
  UpdateInvestorAmount,
  getUser,
} from "@/lib/db/index";
import { Company, CompanyRequestData } from "@/types/company";
import { InvestorProps, InvestorRequest } from "@/types/investor";
import { getCompanyById } from "@/lib/db/company";
import { getInvestorById } from "@/lib/db/investor";
import {
  getRaiseFundingByCompanyId,
  getRaiseFundingById,
} from "@/lib/db/raise";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";

const sendEmailCompanyStatus = async (
  company: Company,
  email: string,
  status: "approved" | "rejected"
) => {
  const messages = {
    approved: "Your company profile has been successfully created.",
    rejected: "Thank you for your request",
  };

  try {
    const response = await fetch("/api/mail/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages[status],
        status,
        email,
        name: company.name,
        abbr: company.abbr,
        description: company.description,
        pitch: company.pitch,
        logo: company.logo,
        banner: company.banner,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error: ${errorData.message || "Failed to send email"}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const sendEmailInvestorStatus = async (
  investor: InvestorProps,
  status: "approved" | "rejected"
) => {
  const messages = {
    approved: "Your investor profile has been successfully created.",
    rejected: "Thank you for your request",
  };

  try {
    const response = await fetch("/api/mail/investor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages[status],
        status,
        email: investor.email,
        profileImage: investor.profileImage,
        firstName: investor.firstName,
        lastName: investor.lastName,
        nationalId: investor.nationalId,
        birthDate: investor.birthDate,
        nationality: investor.nationality,
        networth: investor.networth,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error: ${errorData.message || "Failed to send email"}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const AdminPage = () => {
  const { data: session, status } = useSession();
  const [notfound, setNotfound] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<CompanyRequestData[]>([]);
  const [investorData, setInvestorData] = useState<InvestorRequest[]>([]);
  // const [dealData, setDealData] = useState<InvestmentDetail[]>([]);
  const [raiseFundingData, setRaiseFundingData] = useState<RaiseFundingRequestData[]>([]);
  const [data, setData] = useState<boolean>(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "authenticated" && session?.user?.email) {
      const fetchUser = async () => {
        if (session.user) {
          const user = await getUser(String(session.user.email));
          if (user.roleId !== 4) {
            setNotfound(true);
          } else {
            setData(true);
          }
        }
      };
      fetchUser();
    } else {
      // Not signed in
      setNotfound(true);
    }
  }, [session, status]);

  const fetchData = async () => {
    try {
      const companyRequests = await getCompanyRequest();
      const investorRequests = await getInvestorRequest();
      // const investmentRequests = await getInvestmentRequest();
      const raiseFundingRequests = await getRaiseFundingRequests();

      const companyDetails = await Promise.all(
        companyRequests.map(async (request) => {
          const company = await getCompanyById(request.companyId);

          if (company) {
            company.logo = company.logo || "default_logo_url.png";
          }

          const raiseFunding = await getRaiseFundingByCompanyId(request.companyId);

          return {
            ...request,
            company: {
              ...(company as Company),
              raiseFunding: raiseFunding[0] || null,
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

      // const investmentDetails = await Promise.all(
      //   investmentRequests.map(async (request) => {
      //     const investor = await getInvestorById(request.investorId);
      //     const raiseFunding = await getRaiseFundingById(request.raiseFundingId);
      //     const company = await getCompanyById(raiseFunding.companyId);
      //     return {
      //       ...(request as unknown as InvestmentRequest),
      //       investor: investor || null,
      //       raiseFunding: raiseFunding || null,
      //       company: company || null,
      //     };
      //   })
      // );

      const raiseFundingDetails = await Promise.all(
        raiseFundingRequests.map(async (request) => {
          const raiseFunding = await getRaiseFundingById(request.raiseFundingId);
          const company = await getCompanyById(raiseFunding.companyId);
          return {
            ...(request as RaiseFundingRequestList),
            raiseFunding: raiseFunding || null,
            company: company || null,
          };
        })
      );

      setCompanyData(companyDetails);
      setInvestorData(investorDetails);
      // setDealData(investmentDetails);
      setRaiseFundingData(raiseFundingDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data only when the condition is met
  useEffect(() => {
    if (data) {
      fetchData();
    }
  }, [data]);

  if (notfound) {
    return notFound();
  }

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="text-white flex flex-col items-center mt-10 space-y-4 mb-10">
      {companyData.length > 0 &&
        companyData.map((companyRequest, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <CompanyProfileCard
              companyRequest={companyRequest}
              email=""
              handleApprove={async () => {
                try {
                  await approveCompanyRequest(companyRequest.id);
                  await delay(100);
                  fetchData();
                  const user = await getUserByCompanyId(
                    companyRequest.company?.id!
                  );
                  sendEmailCompanyStatus(
                    companyRequest.company!,
                    user.email,
                    "approved"
                  );
                } catch (error) {
                  console.error("Error approving company request:", error);
                }
              }}
              handleReject={async () => {
                try {
                  await rejectCompanyRequest(companyRequest.id);
                  await delay(100);
                  fetchData();
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
              investorRequest={investorRequest}
              handleApprove={async () => {
                await approveInvestorRequest(investorRequest.id);
                await delay(100);
                fetchData(); // Refresh data after approval
                sendEmailInvestorStatus(investorRequest.investor, "approved");
              }}
              handleReject={async () => {
                await rejectInvestorRequest(investorRequest.id);
                await delay(100);
                fetchData(); // Refresh data after rejection
              }}
            />
          </div>
        ))}

      {/* Render Deal Cards */}
      {/* {dealData.length > 0 &&
        dealData.map((deal, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <Dealcard
              investorName={
                deal.investor
                  ? deal.investor.firstName + " " + deal.investor.lastName
                  : "Investor"
              }
              moneyReadyForInvestment={deal.investor?.investableAmount || 0}
              investAmount={deal.amount || 0}
              stockPercentage={deal.getStock || 0}
              companyName={deal.company?.name || "Company"}
              raiseTarget={deal.raiseFunding?.fundingTarget || 0}
              raisePercentage={
                (deal.amount / (deal.raiseFunding?.fundingTarget ?? 1)) * 100 || 0
              }
              valuation={(100 / deal.getStock) * deal.amount || 0}
              handleApprove={async () => {
                await approveInvestmentRequest(deal.id);
                await delay(100);
                fetchData();
              }}
              handleReject={async () => {
                await rejectInvestmentRequest(deal.id);
                await UpdateInvestorAmount({
                  investorId: deal.investorId,
                  amount: (deal.investor?.investableAmount || 0) + deal.amount,
                });
                await delay(100);
                fetchData();
              }}
            />
          </div>
        ))} */}
      {/* Render Raise Funding Cards */}
      {raiseFundingData.length > 0 &&
        raiseFundingData.map((raiseFunding, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <RaiseFundingCard
              logo={raiseFunding.company?.logo || "default_logo_url.png"}
              companyName={raiseFunding.company?.name || "Company Name"}
              description={
                raiseFunding.company?.description || "Company Description"
              }
              PricePerShare={raiseFunding.raiseFunding?.priceShare || 100}
              valuation={raiseFunding.raiseFunding?.valuation || 10000000}
              minimumInvestment={raiseFunding.raiseFunding?.minInvest || 1000}
              maximumInvestment={raiseFunding.raiseFunding?.maxInvest || 10000}
              deadline={raiseFunding.raiseFunding?.deadline || "Stock"}
              target={raiseFunding.raiseFunding?.fundingTarget || 10000000}
              handleApprove={async () => {
                await approveRaiseFundingRequest(raiseFunding.id);
                await delay(100);
                fetchData();
              }}
              handleReject={async () => {
                await rejectRaiseFundingRequest(raiseFunding.id);
                await delay(100);
                fetchData();
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default AdminPage;
