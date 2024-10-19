import InvestableAmount from "@/components/InvestableAmount";
import InvestmentItemList from "@/components/InvestmentItemList";
import { InvestorProfileCard } from "@/components/InvestorProfileCard";
import {
  getUserByEmail,
  getInvestorById,
  getInvestorRequestById,
  getAllInvestmentRequestByInvestorId,
  getRaiseFundingById,
  getCompanyById,
} from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import WaitingShow from "@/components/profile/WaitingShow";
import { CgProfile } from "react-icons/cg";

const getAllInvestmentData = async (investmentRequest: any) => {
  const investmentData = await Promise.all(investmentRequest.map(async (request: any) => {
    const raiseFunding = await getRaiseFundingById(request.raiseFundingId);
    const company = await getCompanyById(raiseFunding.companyId);
    return {
      logoUrl: company.logo,
      companyName: company.name,
      companyAbbr: company.abbr,
      status: request.approval ? "Finalized" : "Waitlisted",
      date: request.requestDate,
      amount: request.amount,
      stockPercentage: request.getStock,
      marketPrice: 1000,          // Random
      priceChange: 10,            // Random
      valuationAtInvest: 200000,  // Random
      valuationMarket: 220000,    // Random
    };
  }));

  return investmentData;
}


export default async function InvestorProfile() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    redirect(`/signup?callbackUrl=/investor-profile`);
  }

  const userEmail = session.user.email;
  const user = await getUserByEmail(2, userEmail); // get user role 2 = investor

  if (!user) {
    redirect("/role-register");
  }

  let investor = null;
  let investorRequest = null;
  let investmentRequest = null;
  let investmentData = null;
  if (user.roleIdNumber !== null) {
    investor = await getInvestorById(user.roleIdNumber);
    investorRequest = await getInvestorRequestById(user.roleIdNumber);
    investmentRequest = await getAllInvestmentRequestByInvestorId(user.roleIdNumber);
    investmentData = await getAllInvestmentData(investmentRequest);
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen relative">
        {investorRequest?.approval === null && (<WaitingShow />)}

        <div className="flex justify-between w-11/12 h-9/10">
          <h1 className="flex flex-col justify-end text-white ml-70 text-[40px] font-bold mt-10">
            <div className="flex justify-center items-center mb-2">
              <CgProfile className="mr-2" /> My Portfolio
            </div>
          </h1>
          <InvestableAmount initialAmount={investor?.investableAmount ?? 0} investorId={investor?.id ?? 0} />
        </div>
        <div className="flex w-11/12 h-9/10 bg-[#FFFDF3] bg-opacity-30 rounded-[20px] justify-center items-center p-[27px]">
          {investor && <InvestorProfileCard investor={investor} />}
        </div>
        <div className="flex flex-col w-11/12 h-9/10 justify-center items-center">
          {investmentData && <InvestmentItemList investments={investmentData} />}
        </div>
      </div>
    </div>
  );
}
