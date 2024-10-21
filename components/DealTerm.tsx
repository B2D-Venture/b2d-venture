import React from "react";
import DealTermElement from "./DealTermElement";
import DealTermBtn from "./DealTermBtn";
import { RaiseFundingButton } from "@/components/RaiseFundingButton";

const canRaiseFunding = (dayLeft: number, current: number, target: number) => {
  if (dayLeft <= 0 || current >= target) {
    return true;
  }
  return false;
}

// const isOwnCompany = async (urlId: number, user: User) => {
//   if (user.roleIdNumber == urlId) {
//     return true;
//   }
//   return false;
// }

const DealTerm = async ({ recentFunding, dayLeft, totalInvestor, currentInvestment, roleId, isOwnCompany, urlId }: DealTermProps) => {
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

      {(roleId !== 3) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <DealTermBtn
            text="Invest Now"
            textColor="text-white"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#FF8A00]"
            hoverBgColor="hover:bg-[#FF8A00]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
            link="/company"
          />
          <DealTermBtn
            text="Request Data Room"
            textColor="text-[#423F3F]"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#AFAB9A]"
            hoverBgColor="hover:bg-[#807D71]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
            link="/company"
          />
        </div>
      )}
      {(roleId === 3 && isOwnCompany) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <DealTermBtn
            text="Edit Details"
            textColor="text-[#423F3F]"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#AFAB9A]"
            hoverBgColor="hover:bg-[#807D71]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
            link={`/company/${urlId}/edit`}
          />
          <RaiseFundingButton canRaiseFunding={canRaiseFunding(dayLeft, currentInvestment, recentFunding.fundingTarget)} />
        </div>
      )}
    </div>
  );
};

export default DealTerm;