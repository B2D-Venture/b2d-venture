import React from "react";
import InvestmentItem from "@/components/profile/investor/InvestmentItem";
import { Company } from "@/types/company";
import { RiHandCoinLine } from "react-icons/ri";
import { InvestmentRequest } from "@/types/investment";
import { getRecentRaiseFundingByCompanyId, getRaiseFundingById } from "@/lib/db";

const formatISODate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${formattedDate}, ${formattedTime}`;
};

type InvestmentItem = {
  id: number;
  company: Company;
  request: InvestmentRequest;
  status: string;
  investments: Company[];
};

interface InvestmentItemListProps {
  investments: InvestmentItem[];
}

async function getRaiseFunding(raiseFundingId: number): Promise<RaiseFunding | null> {
  const raiseFunding = await getRaiseFundingById(raiseFundingId);
  if (!raiseFunding) {
    return null;
  }
  return {
    id: raiseFunding.id,
    totalShare: raiseFunding.totalShare,
    fundingTarget: raiseFunding.fundingTarget,
    minInvest: raiseFunding.minInvest,
    maxInvest: raiseFunding.maxInvest,
    deadline: raiseFunding.deadline,
    priceShare: raiseFunding.priceShare,
    valuation: raiseFunding.valuation,
  };
}

function getLastRaiseFundingRequest(companyId: number){
  const raiseFunding = getRecentRaiseFundingByCompanyId(companyId);
  return raiseFunding;
}
  

const InvestmentItemList = ({ investments }: InvestmentItemListProps) => {
  return (
    <div className="w-full">
      <div className="w-full mt-8 p-4 grid grid-cols-5 gap-5 items-center">
        <div className="col-span-2 text-[#E4A222] text-3xl font-bold">Investment</div>
        <div className="col-span-1 text-black dark:text-white text-3xl font-bold">Amount</div>
        <div className="col-span-1 text-black dark:text-white text-3xl font-bold">Status</div>
      </div>
      <div className="border-b-2 border-black dark:border-white mb-5" />

      {investments.length === 0 ? (
        <div className="flex justify-center items-center text-center text-xl mt-8">
          <RiHandCoinLine className="mr-3 text-4xl" />
          <span>No Investments Request</span>
        </div>
      ) : (
        investments.map(async (item) => (
          <InvestmentItem
            key={item.id}
            company={item.company}
            request={item.request}
            status={item.status}
            raiseFunding={await getRaiseFunding(item.request.raiseFundingId)}
            lastraisedFunding={await getLastRaiseFundingRequest(Number(item.company.id))}
          />
        ))
      )}
    </div>
  );
};

export default InvestmentItemList;
