import React from "react";
import DealTermElement from "./DealTermElement";
import DealTermBtn from "./DealTermBtn";
import { RaiseFundingButton } from "@/components/RaiseFundingButton";


const DealTerm = ({ recentFunding, dayLeft, totalInvestor }: { recentFunding: RaiseFunding, dayLeft: number, totalInvestor: number }) => {
  return (
    <div className="sticky top-36 bg-[#f8f8f8] md:m-5 md:rounded-xl shadow-lg p-6">
      <div className="mb-5">
        <h2 className="text-black text-4xl font-bold text-center">Deal Terms</h2>
      </div>
      <div className="space-y-4">
        <DealTermElement data={dayLeft} label="Days Left" type="deadline" />
        <DealTermElement data={totalInvestor} label="Investors" />
        <DealTermElement data={`${recentFunding.minInvest.toLocaleString()} $`} label="Minimum Investment" />
        <DealTermElement data={`${recentFunding.maxInvest.toLocaleString()} $`} label="Maximum Investment" />
        <DealTermElement data={`${recentFunding.fundingTarget.toLocaleString()} $`} label="Funding Target" />
        <DealTermElement data={`${recentFunding.priceShare.toLocaleString()} $`} label="Price per Share" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <DealTermBtn
          text="Question"
          textColor="text-[#423F3F]"
          hoverTextColor="hover:text-black"
          bgColor="bg-[#CFCBBA]"
          hoverBgColor="hover:bg-[#AEAA9C]"
          borderColor="border-transparent"
          hoverBorderColor="border-transparent"
        />
        <DealTermBtn
          text="Invest"
          textColor="text-[#423F3F]"
          hoverTextColor="hover:text-navbarTitle"
          bgColor="bg-[#AFAB9A]"
          hoverBgColor="hover:bg-black"
          borderColor="border-transparent"
          hoverBorderColor="border-transparent"
        />
        <DealTermBtn
          text="Edit Details"
          textColor="text-[#423F3F]"
          hoverTextColor="hover:text-white"
          bgColor="bg-[#AFAB9A]"
          hoverBgColor="hover:bg-[#807D71]"
          borderColor="border-transparent"
          hoverBorderColor="border-transparent"
        />
        <RaiseFundingButton />
      </div>
    </div>
  );
};

export default DealTerm;