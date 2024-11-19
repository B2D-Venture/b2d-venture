"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  getInvestorById,
  getCompanyById,
  getUser,
  getCompanyRequestById,
  getInvesmentByCompanyId,
  getRaiseFundingById,
  approveInvestmentRequest,
  rejectInvestmentRequest,
  UpdateInvestorAmount,
} from "@/lib/db/index";
import { Dealcard } from "@/components/admin/Deal/DealCard";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { NoRequestCard } from "@/components/admin/NoRequestCard";
import { InvestmentDetail, InvestmentRequest } from "@/types/investment";

const isOwnCompany = (urlId: number, roleIdNumber: number) => {
  if (Number(roleIdNumber) == urlId) {
    return true;
  }
  return false;
};

async function getUserByEmail(email: string) {
  const user = await getUser(email);
  return user;
}

export default function InvestorRequestPage({
  params,
}: {
  params: { companyId: number };
}) {
  const { data: session, status } = useSession();

  const [dealData, setDealData] = useState<InvestmentDetail[]>([]);
  const [notfound, setNotfound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const investmentRequests = await getInvesmentByCompanyId(
        params.companyId
      );
      if (investmentRequests) {
        const investmentDetails = await Promise.all(
          investmentRequests.map(async (request) => {
            const investor = await getInvestorById(request.investorId);
            const raiseFunding = await getRaiseFundingById(
              request.raiseFundingId
            );
            const company = await getCompanyById(raiseFunding.companyId);
            return {
              ...(request as unknown as InvestmentRequest),
              investor: investor || null,
              raiseFunding: raiseFunding || null,
              company: company || null,
            };
          })
        );
        setDealData(investmentDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [params.companyId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const user = await getUserByEmail(session.user.email);
          const companyRequest = await getCompanyRequestById(params.companyId);

          if (
            !isOwnCompany(Number(params.companyId), Number(user.roleIdNumber))
          ) {
            setNotfound(true);
          } else if (!companyRequest || companyRequest[0]?.approval !== true) {
            setNotfound(true);
          } else {
            await fetchData();
          }
        } catch (error) {
          console.error("Error during user fetch:", error);
          setNotfound(true);
        }
      } else {
        setNotfound(true);
      }
      setLoading(false);
    };

    if (status === "authenticated") {
      fetchUser();
    } else if (status === "unauthenticated") {
      setNotfound(true);
      setLoading(false);
    }
  }, [status, session, params.companyId, fetchData]);

  if (loading) {
    return <div></div>;
  }

  if (notfound) {
    return notFound();
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="text-white flex flex-col items-center mt-10 space-y-4 mb-10">
      {dealData.length === 0 ? (
        <NoRequestCard
          title="No Investment Requests"
          description="You currently have no pending requests. Any new requests will appear here."
        />
      ) : (
        dealData.length > 0 &&
        dealData.map((deal, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <Dealcard
              investor={deal.investor}
              company={deal.company}
              raiseFunding={deal.raiseFunding}
              investAmount={deal.amount || 0}
              stockPercentage={deal.getStock || 0}
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
        ))
      )}
    </div>
  );
}
