import React from "react";
import DealTermElement from "./DealTermElement";
import DealTermBtn from "./DealTermBtn";
import { RaiseFundingButton } from "@/components/RaiseFundingButton";
import RequestBtn from "./company/dataroom/btn/RequestBtn";
import InvestBtn from "./company/dataroom/btn/InvestBtn";

const canRaiseFunding = (dayLeft: number, current: number, target: number) => {
  if (dayLeft <= 0 || current >= target) {
    return true;
  }
  return false;
};

const isOwnCompany = async (urlId: number, user: User) => {
  if (user.roleIdNumber == urlId) {
    return true;
  }
  return false;
};

const DealTerm = async ({
  recentFunding,
  dayLeft,
  totalInvestor,
  currentInvestment,
  roleId,
  isOwnCompany,
  urlId,
  investorId,
}: DealTermProps) => {
  return (
    <div className="sticky top-36 bg-[#e9e9e9] dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:to-[#2b2b2b] border border-gray-200 dark:border-gray-700 md:m-5 md:rounded-xl shadow-lg p-6">
      <div className="mb-5">
        <h2 className="text-black dark:text-white text-4xl font-bold text-center">
          Deal Terms
        </h2>
      </div>
      <div className="space-y-4">
        <DealTermElement data={dayLeft} label="Days Left" type="deadline" />
        <DealTermElement data={totalInvestor} label="Investors" />
        <DealTermElement
          data={`${recentFunding.minInvest.toLocaleString()} $`}
          label="Minimum Investment"
        />
        <DealTermElement
          data={`${recentFunding.maxInvest.toLocaleString()} $`}
          label="Maximum Investment"
        />
        <DealTermElement
          data={`${recentFunding.fundingTarget.toLocaleString()} $`}
          label="Funding Target"
        />
        <DealTermElement
          data={`${recentFunding.priceShare.toLocaleString()} $`}
          label="Price per Share"
        />
      </div>

      {roleId !== 3 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InvestBtn
            text="Invest Now"
            textColor="text-white"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#76ABAE] dark:bg-[#FF8A00]"
            hoverBgColor="hover:bg-[#639093] dark:hover:bg-[#FF8A00]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
            urlId={urlId}
            investorId={investorId}
          />
          <RequestBtn
            text="Request Data Room"
            textColor="text-[#423F3F]"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#AFAB9A]"
            hoverBgColor="hover:bg-[#807D71]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
            urlId={urlId}
            investorId={investorId}
          />
        </div>
      )}
      {roleId === 3 && isOwnCompany && (
        <div className="mt-6 flex justify-center items-center">
          <RaiseFundingButton
            canRaiseFunding={canRaiseFunding(
              dayLeft,
              currentInvestment,
              recentFunding.fundingTarget
            )}
          />
          <DealTermBtn
            text="Data Room Request"
            textColor="text-[#423F3F]"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#AFAB9A]"
            hoverBgColor="hover:bg-[#807D71]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
            link={`/company/${urlId}/dataroom-request`}
          />
        </div>
      )}
    </div>
  );
};

export default DealTerm;
