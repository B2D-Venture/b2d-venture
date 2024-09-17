import React from "react";
import { CompanyProfileCard } from "@/components/admin/CompanyProfile/CompanyProfileCard";
import { InvestorProfileCard } from "@/components/admin/InvestorProfile/InvestorProfileCard";
import { Dealcard } from "@/components/admin/Deal/DealCard";

const AdminPage = () => {
  return (
    <div className="text-white flex flex-col items-center mt-10 space-y-4">
      <div className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]">
        <CompanyProfileCard
          logo="https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png"
          companyName="Amazon"
          description="Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally."
          abbreviation="AMZN"
          valuation={10000000}
          minimumInvestment={100000}
          maximumInvestment={1000000}
          securityType="Stock"
          target={10000000}
        />
      </div>
      <div className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]">
        <InvestorProfileCard
          logo="data:image/png;base64,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"
          investorName="Bossy kupaikon"
          Nationality="Thailand"
          email="bossy@gmail.com"
          age={50}
          netWorth={50000000}
          moneyReadyForInvestment={10000000}
        />
      </div>
      <div className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]">
        <Dealcard
          investorName="Bossy kupaikon"
          moneyReadyForInvestment={10000000}
          investAmount={10000000}
          stockPercentage={10}
          companyName="Amazon"
          raiseTarget={10000000}
          raisePercentage={10}
          valuaiton={10000000}
        />
      </div>
    </div>
  );
};

export default AdminPage;
