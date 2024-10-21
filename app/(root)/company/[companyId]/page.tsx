import React from "react";
import Image from "next/image";
import Pitch from "@/components/profile/company/Pitch";
import DealTerm from "@/components/DealTerm";
import {
  getUser,
  getCompanyById,
  getCompanyRequestById,
  getRecentRaiseFundingByCompanyId,
  getInvesmentByFundingId,
} from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import WaitingShow from "@/components/profile/WaitingShow";
import ProgressBar from "@/components/profile/company/ProgressBar";

const calculateDaysLeft = (deadline: string) => {
  const today: Date = new Date();
  const endDate: Date = new Date(deadline);

  const timeDiff = endDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft >= 0 ? daysLeft : 0;
};

const getTotalInvestor = (allInvestmentFunding: any) => {
  return allInvestmentFunding.length;
};

const getTotalInvestment = (allInvestmentFunding: any) => {
  let totalInvestment = 0;
  allInvestmentFunding.forEach((investment: any) => {
    totalInvestment += investment.amount;
  });

  return totalInvestment;
};

const isOwnCompany = async (urlId: number, user: User) => {
  if (user.roleIdNumber == urlId) {
    return true;
  }
  return false;
}

export default async function CompanyProfile({
  params,
}: {
  params: { companyId: number };
}) {
  console.log("Company ID:", params.companyId);

  const session = await getServerSession(authConfig);

  let user = null;
  let roleId = 1;
  let isApproval = null;
  if (session && session.user?.email) {
    const userEmail = session.user.email;
    user = await getUser(userEmail);
    roleId = user.roleId;
    if (user.roleIdNumber !== null) {
      const isApprovalObj = await getCompanyRequestById(user.roleIdNumber);
      isApproval = isApprovalObj[0];
    }
  }

  const company = await getCompanyById(params.companyId);
  const recentFunding = await getRecentRaiseFundingByCompanyId(params.companyId);
  const allInvestmentFunding = await getInvesmentByFundingId(recentFunding.id);
  const totalInvestor = getTotalInvestor(allInvestmentFunding);
  const totalInvestment = getTotalInvestment(allInvestmentFunding);

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {(roleId === 3 && isApproval?.approval === null && user && await isOwnCompany(params.companyId ?? 1, user)) && (
        <WaitingShow />
      )}
      <div className="banner relative w-full h-[438px] bg-blue">
        <Image
          src={company?.banner || "/default-banner.png"}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="rounded-[5px]"
        />
      </div>
      <div className="w-full h-[70px] md:h-[100px] lg:h-[80px]">
        <div className="logo relative w-[120px] h-[120px] top-40% left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:w-[200px] xl:h-[200px] lg:w-[170px] lg:h-[170px] md:w-[150px] md:h-[150px]">
          <Image
            src={company?.logo || "/default-logo.png"}
            alt="logo"
            layout="fill"
            className="rounded-[5px]"
          />
        </div>
      </div>
      <p className="name text-2xl text-white left-1/2 text-center md:mt-8 md:text-5xl">
        {company?.name}
      </p>
      <div className="detail text-center text-white text-sm mt-3 md:text-xl">
        {company?.description}
      </div>
      {recentFunding && (
        <ProgressBar
          dayLeft={calculateDaysLeft(recentFunding.deadline)}
          currentInvestAmount={totalInvestment}
          fundingTarget={recentFunding.fundingTarget}
        />
      )}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 text-white">
        <div className="col-span-2">
          <Pitch pitchData={company?.pitch || ""} />
        </div>
        <div>
          {recentFunding && (
            <DealTerm
              recentFunding={recentFunding}
              currentInvestment={totalInvestment}
              dayLeft={calculateDaysLeft(recentFunding.deadline)}
              totalInvestor={totalInvestor}
              roleId={user?.roleId ?? null}
              isOwnCompany={await isOwnCompany(params.companyId ?? 1, user)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
