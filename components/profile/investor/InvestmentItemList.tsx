import React from "react";
import InvestmentItem from "@/components/profile/investor/InvestmentItem";
import { Company } from "@/types/company";


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
}

interface InvestmentItemListProps {
  investments: InvestmentItem[];
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
      {Array.from({ length: 1 }, () => investments)
        .flat()
        .map((item) => (
          <InvestmentItem
            key={item.id}
            company={item.company}
            request={item.request}
            status={item.status}
          />
        ))}
    </div>
  );
};

export default InvestmentItemList;
