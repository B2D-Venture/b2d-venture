import React from "react";
import DealTermElement from "./DealTermElement";
import DealTermBtn from "./DealTermBtn";
import { RaiseFunding } from "./RaiseFunding";

const DealTerm = () => {
  return (
    <div className="bg-[#d9d9d9] md:m-5 md:rounded-xl">
      <div className="mt-5 rounded-[15px]" />
      <div className="mx-4">
        <span className="text-black text-4xl font-bold ml-4">Deal Terms</span>
        <DealTermElement data="10" label="Days Left to investment" />
        <DealTermElement data="1,000 $" label="Minimum Investment" />
        <DealTermElement data="2,000 $" label="Maximum Investment" />
        <DealTermElement data="100,000 $" label="Funding Goal" />
        <DealTermElement data="10.23 $" label="Price per Security" />
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
