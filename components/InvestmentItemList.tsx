import React from "react";
import InvestmentItem from "@/components/InvestmentItem";
import { investmentItemExample } from "@/constants";

const InvestmentItemList = () => {
  return (
    <div className="w-full">
      <div className="w-full mt-8 p-4 grid grid-cols-5 gap-5 items-center">
        <div className="col-span-2 text-[#E4A222] text-3xl font-bold">Investment</div>
        <div className="col-span-1 text-white text-3xl font-bold">Amount</div>
        <div className="col-span-1 text-white text-3xl font-bold">Status</div>
      </div>
      <div className="border-b-2 border-white mb-5" />
      {Array.from({ length: 1 }, () => investmentItemExample)
        .flat()
        .map((company) => (
          <InvestmentItem
            key={company.companyName}
            logoUrl={company.logoUrl}
            companyAbbr={company.companyAbbr}
            companyName={company.companyName}
            status={company.status}
            date={company.date}
            amount={company.amount}
          />
        ))}
    </div>
  );
};

export default InvestmentItemList;
