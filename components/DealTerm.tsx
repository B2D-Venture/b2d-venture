import React from "react";
import DealTermElement from "./DealTermElement";
import DealTermBtn from "./DealTermBtn";
import { RaiseFunding } from "./RaiseFunding";
import { CompanyData } from "@/types/company";

const calculateDaysLeft = (deadline: Date) => {
  const today: Date = new Date();
  const endDate: Date = new Date(deadline);
  
  const timeDiff = endDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 

  return daysLeft >= 0 ? daysLeft : 0;
};

const DealTerm = ({ company }: { company: CompanyData }) => {
  return (
    <div className="bg-[#d9d9d9] md:m-5 md:rounded-xl">
      <div className="mt-5 rounded-[15px]" />
      <div className="mx-4">
        <span className="text-black text-4xl font-bold ml-4">Deal Terms</span>
        <DealTermElement data={calculateDaysLeft(company.deadline)} label="Days Left" />
        <DealTermElement data={`${company.minInvest.toLocaleString()} $`} label="Minimum Investment" />
        <DealTermElement data={`${company.maxInvest.toLocaleString()} $`} label="Maximum Investment" />
        <DealTermElement data={`${company.fundingTarget.toLocaleString()} $`} label="Funding Target" />
        <DealTermElement data={`${company.priceShare.toLocaleString()} $`} label="Price per Share" />
        <div className="grid grid-cols-2 items-center">
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
          <RaiseFunding />
          <DealTermBtn
            text="Edit Details"
            textColor="text-[#423F3F]"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#AFAB9A]"
            hoverBgColor="hover:bg-[#807D71]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default DealTerm;
