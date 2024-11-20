"use client";
import React, { useState, useEffect } from "react";
import {
  getCompanyRequest,
  getInvestorRequest,
  getRaiseFundingRequests,
  approveCompanyRequest,
  approveInvestorRequest,
  approveRaiseFundingRequest,
  rejectCompanyRequest,
  rejectInvestorRequest,
  rejectRaiseFundingRequest,
  getUserByCompanyId,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CompanyTabContent } from "@/components/admin/tab-content/CompanyTabContent";
import { InvestorTabContent } from "@/components/admin/tab-content/InvestorTabContent";
import { FundingTabContent } from "@/components/admin/tab-content/FundingTabContent";
import { NoRequestCard } from "@/components/admin/NoRequestCard";
import SortRequestButton from "@/components/admin/SortRequestButton";

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
  const [raiseFundingData, setRaiseFundingData] = useState<RaiseFundingRequestData[]>([]);
  const [data, setData] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState<boolean>(true);

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
      setRaiseFundingData(raiseFundingDetails);
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const sortRequests = (data: any[], order: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.requestDate).getTime();
      const dateB = new Date(b.requestDate).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedCompanyData = sortRequests(companyData, sortOrder);
  const sortedInvestorData = sortRequests(investorData, sortOrder);
  const sortedRaiseFundingData = sortRequests(raiseFundingData, sortOrder);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="flex flex-col items-center mt-10 space-y-4 mb-10">
      <Tabs defaultValue="all" className="w-full p-10">
        <div className="flex w-full justify-center items-center mb-4 space-x-2">
          <TabsList className="flex w-[40%]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="company">Company Request</TabsTrigger>
            <TabsTrigger value="investor">Investor Request</TabsTrigger>
            <TabsTrigger value="funding">Raise Funding Request</TabsTrigger>
          </TabsList>
          <SortRequestButton sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>
        <TabsContent value="all">
          {(companyData.length > 0 || investorData.length > 0 || raiseFundingData.length > 0) ? (
            <>
              <CompanyTabContent companyData={sortedCompanyData} fetchData={fetchData}
                handleApprove={
                  async (companyRequest: CompanyRequestData) => {
                    try {
                      await approveCompanyRequest(companyRequest.id);
                      await delay(100);
                      fetchData();
                      const user = await getUserByCompanyId(companyRequest.company?.id!);
                      sendEmailCompanyStatus(companyRequest.company!, user.email, "approved");
                    } catch (error) {
                      console.error("Error approving company request:", error);
                    }
                  }}
                handleReject={
                  async (id: number) => {
                    try {
                      await rejectCompanyRequest(id);
                      await delay(100);
                      fetchData();
                    } catch (error) {
                      console.error("Error rejecting company request:", error);
                    }
                  }} />
              <InvestorTabContent
                investorData={sortedInvestorData}
                handleApprove={async (investorRequest: InvestorRequest) => {
                  await approveInvestorRequest(investorRequest.id);
                  await delay(100);
                  fetchData();
                  sendEmailInvestorStatus(investorRequest.investor, "approved");
                }}
                handleReject={async (id: number) => {
                  await rejectInvestorRequest(id);
                  await delay(100);
                  fetchData();
                }} />
              <FundingTabContent
                raiseFundingData={sortedRaiseFundingData}
                handleApprove={async (raiseFundingRequest: RaiseFundingRequestList) => {
                  await approveRaiseFundingRequest(raiseFundingRequest.id);
                  await delay(100);
                  fetchData();
                }}
                handleReject={async (id: number) => {
                  await rejectRaiseFundingRequest(id);
                  await delay(100);
                  fetchData();
                }} />
            </>
          ) : (
            <div className="flex flex-col items-center mt-10 space-y-4 mb-10">
              <NoRequestCard
                title="No more requests available"
                description="There are no more requests available to review. Please check back later."
              />
            </div>
          )}

        </TabsContent>
        <TabsContent value="company">
          {companyData.length > 0 ? (<CompanyTabContent companyData={sortedCompanyData} fetchData={fetchData}
            handleApprove={
              async (companyRequest: CompanyRequestData) => {
                try {
                  await approveCompanyRequest(companyRequest.id);
                  await delay(100);
                  fetchData();
                  const user = await getUserByCompanyId(companyRequest.company?.id!);
                  sendEmailCompanyStatus(companyRequest.company!, user.email, "approved");
                } catch (error) {
                  console.error("Error approving company request:", error);
                }
              }
            }
            handleReject={
              async (id: number) => {
                try {
                  await rejectCompanyRequest(id);
                  await delay(100);
                  fetchData();
                } catch (error) {
                  console.error("Error rejecting company request:", error);
                }
              }
            }
          />) : (
            <div className="flex flex-col items-center mt-10 space-y-4 mb-10">
              <NoRequestCard
                title="No Company Requests Available"
                description="There are currently no pending company requests. Please check back later."
              />
            </div>
          )}

        </TabsContent>
        <TabsContent value="investor">
          {investorData.length > 0 ? (<InvestorTabContent
            investorData={sortedInvestorData}
            handleApprove={async (investorRequest: InvestorRequest) => {
              await approveInvestorRequest(investorRequest.id);
              await delay(100);
              fetchData();
              sendEmailInvestorStatus(investorRequest.investor, "approved");
            }}
            handleReject={async (id: number) => {
              await rejectInvestorRequest(id);
              await delay(100);
              fetchData();
            }}
          />) : (
            <div className="flex flex-col items-center mt-10 space-y-4 mb-10">
              <NoRequestCard
                title="No Investor Requests Available"
                description="There are currently no pending investor requests. Please check back later."
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="funding">
          {raiseFundingData.length > 0 ? (
            <FundingTabContent
              raiseFundingData={sortedRaiseFundingData}
              handleApprove={async (raiseFundingRequest: RaiseFundingRequestList) => {
                await approveRaiseFundingRequest(raiseFundingRequest.id);
                await delay(100);
                fetchData();
              }}
              handleReject={async (id: number) => {
                await rejectRaiseFundingRequest(id);
                await delay(100);
                fetchData();
              }}
            />
          ) : (
            <div className="flex flex-col items-center mt-10 space-y-4 mb-10">
              <NoRequestCard
                title="No Raise Funding Requests Available"
                description="There are currently no pending raise funding requests. Please check back later."
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
