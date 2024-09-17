"use client";

import React from "react";
import CompanyLogoBox from "@/components/CompanyLogoBox";
import { Button } from "@/components/ui/button";

const InvestmentItem = (company: InvestmentItemProps) => {
  const statusColor =
    company.status === "Finalized" ? "text-[#8AE2A3]" : "text-[#E4DEA8]";

  const formattedAmount = new Intl.NumberFormat().format(company.amount);

  return (
    <div className="w-full p-4 mb-4 grid grid-cols-5 gap-5 justify-center items-center">
      <div className="col-span-2 text-white text-xl">
        <CompanyLogoBox
          key={company.companyName}
          logoUrl={company.logoUrl}
          companyAbbr={company.companyAbbr}
          companyName={company.companyName}
        />
      </div>
      <div className="col-span-1 text-white text-3xl font-bold">
        $ {formattedAmount}
      </div>
      <div className={`col-span-1 ${statusColor} text-3xl font-bold`}>
        {company.status} <br />
        <span className="text-gray-400 text-sm">{company.date}</span>
      </div>
      <Button className="w-full bg-[#D9D9D9] text-black">
        View my Investment
      </Button>
    </div>
  );
};

export default InvestmentItem;
