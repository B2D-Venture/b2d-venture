import React from "react";
import Image from "next/image";
import Pitch from "@/components/profile/company/Pitch";
import DealTerm from "@/components/profile/company/dealterm/DealTerm";
import {
  getUser,
  getCompanyById,
  getCompanyRequestById,
  getRecentRaiseFundingByCompanyId,
  getInvesmentByFundingId,
  getOneRecentFundingByCompanyId,
} from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import WaitingShow from "@/components/profile/WaitingShow";
import RejectShow from "@/components/profile/RejectShow";
import ProgressBar from "@/components/profile/company/ProgressBar";
import PublishForm from "@/components/profile/company/PublishForm";

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

const hasPublish = (request: any) => {
  if (Array.isArray(request) && request.length === 0) {
    return false;
  }
  return true;
}

const isOwnCompany = (urlId: number, user: User) => {
  if (user) {
    if (user.roleIdNumber == urlId) {
      return true;
    }
  }
  return false;
}

export default async function CompanyProfile({
  params,
}: {
  params: { companyId: number };
}) {
  const session = await getServerSession(authConfig);
  const companyRequest = await getCompanyRequestById(params.companyId);  

  let user: User | undefined = undefined;
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

  if (!isOwnCompany(params.companyId ?? 1, user)) {
    if (!companyRequest || companyRequest[0]?.approval !== true) {
      return notFound();
    }
  } 

  const company = await getCompanyById(params.companyId);
  const recentFunding = await getRecentRaiseFundingByCompanyId(params.companyId);
  const oneFunding = await getOneRecentFundingByCompanyId(params.companyId);
  let allInvestmentFunding = [];
  let totalInvestor = 0;
  let totalInvestment = 0;

  if (recentFunding) {
    allInvestmentFunding = await getInvesmentByFundingId(recentFunding.id);
    totalInvestor = getTotalInvestor(allInvestmentFunding);
    totalInvestment = getTotalInvestment(allInvestmentFunding);
  }

  return (
    <div className="flex flex-col items-center min-h-screen relative mb-20">
      {(roleId === 3 && isApproval?.approval === null && user && await isOwnCompany(params.companyId ?? 1, user)) && (
        <WaitingShow />
      )}
      {(roleId === 3 && isApproval?.approval === false && user && await isOwnCompany(params.companyId ?? 1, user)) && (
        <RejectShow user={user} />
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
      <p className="name text-2xl text-black dark:text-white left-1/2 text-center md:mt-8 md:text-5xl">
        {company?.name}
      </p>
      <div className="detail text-center text-black dark:text-white text-sm mt-3 md:text-xl">
        {company?.description}
      </div>
      {recentFunding && (
        <ProgressBar
          dayLeft={calculateDaysLeft(recentFunding.deadline)}
          currentInvestAmount={totalInvestment}
          fundingTarget={recentFunding.fundingTarget}
        />
      )}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 text-black dark:text-white">
        <div className="col-span-2 bg-[#f7f7f7] dark:bg-[#1a1c22] rounded-sm">
          <Pitch pitchData={company?.pitch || ""} />
        </div>
        <div>
          {(recentFunding || oneFunding) && (
            <div className="sticky top-28">
              {(isOwnCompany(params.companyId ?? 1, user) && !hasPublish(companyRequest)) && <PublishForm
                companyId={params.companyId}
                raiseId={recentFunding?.id || oneFunding.id}
              />}
              <DealTerm
                recentFunding={recentFunding || oneFunding}
                currentInvestment={totalInvestment}
                dayLeft={calculateDaysLeft(recentFunding?.deadline || oneFunding.deadline)}
                totalInvestor={totalInvestor}
                roleId={user?.roleId ?? null}
                isOwnCompany={await isOwnCompany(params.companyId ?? 1, user)}
                urlId={params.companyId}
                investorId={user?.roleIdNumber ?? null}
                user={user}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
