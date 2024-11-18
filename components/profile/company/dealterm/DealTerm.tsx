"use client";

import React, { useEffect, useState } from "react";
import DealTermElement from "./DealTermElement";
import DealTermBtn from "./DealTermBtn";
import { RaiseFundingButton } from "@/components/RaiseFundingButton";
import RequestBtn from "../../../company/dataroom/btn/RequestBtn";
import InvestBtn from "../../../company/dataroom/btn/InvestBtn";
import { getLastRaiseFundingRequestByCompanyId } from "@/lib/db";
import PrivateOfferBtn from "@/components/company/dataroom/btn/privateOfferBtn";

const canRaiseFunding = async (
  dayLeft: number,
  current: number,
  target: number,
  companyId: number,
) => {
  const raiseFundingRequest =
    await getLastRaiseFundingRequestByCompanyId(companyId);

  if (!raiseFundingRequest || raiseFundingRequest.approval === null) {
    return null;
  }

  if (dayLeft <= 0 || current >= target) {
    return true;
  }

  return false;
};

const DealTerm = ({
  recentFunding,
  dayLeft,
  totalInvestor,
  currentInvestment,
  roleId,
  isOwnCompany,
  urlId,
  investorId,
  user,
}: DealTermProps) => {
  const [canRaise, setCanRaise] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRaiseFunding = async () => {
      const result = await canRaiseFunding(
        dayLeft,
        currentInvestment,
        recentFunding.fundingTarget,
        urlId,
      );
      setCanRaise(result);
    };

    checkRaiseFunding();
  }, [urlId, dayLeft, currentInvestment, recentFunding.fundingTarget]);

  return (
    <div className="m-5 sticky top-36 bg-[#e9e9e9] dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:to-[#2b2b2b] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 md:p-1 lg:p-2 xl:p-3">
      <div className="mb-4 md:mb-2 lg:mb-4 xl:mb-5">
        <h2 className="text-black dark:text-white text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center">
          Deal Terms
        </h2>
      </div>
      <div className="space-y-3 md:space-y-2 lg:space-y-3 xl:space-y-4">
        <DealTermElement data={dayLeft} label="Days Left" type="deadline" />
        <DealTermElement
          data={`${recentFunding.valuation.toLocaleString()} $`}
          label="Valuation"
        />
        <DealTermElement
          data={`${(recentFunding.fundingTarget * recentFunding.priceShare).toLocaleString()} $`}
          label="Funding Target"
        />
        <DealTermElement
          data={`${(recentFunding.maxInvest * recentFunding.priceShare).toLocaleString()} $`}
          label="Maximum Investment"
        />
        <DealTermElement
          data={`${(recentFunding.minInvest * recentFunding.priceShare).toLocaleString()} $`}
          label="Minimum Investment"
        />
        <DealTermElement
          data={`${recentFunding.priceShare.toLocaleString()} $`}
          label="Price per Share"
        />
        <DealTermElement
          data={`${recentFunding.totalShare.toLocaleString()}`}
          label="Total Shares"
        />
      </div>
      <DealTermElement data={totalInvestor} label="Investors" />

      {roleId !== 3 && (
        <div className="mt-5 md:mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InvestBtn
            text="Invest Now"
            textColor="text-white"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#76ABAE] dark:bg-[#FF8A00]"
            hoverBgColor="hover:bg-[#639093] dark:hover:bg-[#FF8A00]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
            urlId={urlId}
            investorId={Number(investorId) ?? null}
            user={user}
            recentFunding={recentFunding}
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
            investorId={Number(investorId) ?? null}
            user={user}
          />
          {/* <div className="sm:col-span-2">
            <PrivateOfferBtn
              text="Private Offer"
              textColor="text-white"
              hoverTextColor="hover:text-white"
              bgColor="bg-[#76ABAE] dark:bg-[#FF8A00]"
              hoverBgColor="hover:bg-[#639093] dark:hover:bg-[#FF8A00]"
              borderColor="border-transparent"
              hoverBorderColor="border-transparent"
              urlId={urlId}
              investorId={investorId}
              user={user}
              recentFunding={recentFunding}
            />
          </div> */}
        </div>
      )}
      {roleId === 3 && isOwnCompany && (
        <div className="mt-2 md:mt-2 lg:mt-4 xl:mt-5 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <RaiseFundingButton canRaiseFunding={canRaise} companyId={urlId} />
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
          <DealTermBtn
            text="Investor Request"
            textColor="text-[#423F3F]"
            hoverTextColor="hover:text-white"
            bgColor="bg-[#AFAB9A]"
            hoverBgColor="hover:bg-[#807D71]"
            borderColor="border-transparent"
            hoverBorderColor="border-transparent"
            link={`/company/${urlId}/Investor-request`}
          />
        </div>
      )}
    </div>
  );
};

export default DealTerm;
