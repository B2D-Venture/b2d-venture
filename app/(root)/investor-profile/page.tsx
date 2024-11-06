import InvestableAmount from "@/components/InvestableAmount";
import InvestmentItemList from "@/components/profile/investor/InvestmentItemList";
import { InvestorProfileCard } from "@/components/InvestorProfileCard";
import {
  getUserByEmail,
  getInvestorById,
  getInvestorRequestById,
  getAllInvestmentRequestByInvestorId,
  getRaiseFundingById,
  getCompanyById,
  getCompanyDataRoomRequestsByInvestor,
  getDataRoomByCompanyId,
} from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import WaitingShow from "@/components/profile/WaitingShow";
import RejectShow from "@/components/profile/RejectShow";
import { CgProfile } from "react-icons/cg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataroomItemList from "@/components/profile/investor/DataroomItemList";


const getAllInvestmentData = async (investmentRequest: any) => {
  const investmentData = await Promise.all(investmentRequest.map(async (request: any) => {
    const raiseFunding = await getRaiseFundingById(request.raiseFundingId);
    const company = await getCompanyById(raiseFunding.companyId);
    return {
      id: company?.id ?? undefined,
      company: company,
      request: request,
      status: request.approval === null ? "Waitlisted" : request.approval === true ? "Finalized" : "Rejected",
    };
  }));

  return investmentData;
}

const getAllDataroomData = async (dataroomRequest: any) => {
  const dataroomData = await Promise.all(dataroomRequest.map(async (request: any) => {
    const company = await getCompanyById(request.companyId);
    const pdfs = await getDataRoomByCompanyId(request.companyId);
    return {
      id: company?.id ?? undefined,
      company: company,
      request: request,
      status: request.approval === null ? "Waitlisted" : request.approval === true ? "Finalized" : "Rejected",
      pdfs: pdfs,
    };
  }));

  return dataroomData;
}


export default async function InvestorProfile() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    redirect(`/signin?callbackUrl=/investor-profile`);
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
  let dataroomRequest = null;
  let dataroomItems = null;
  if (user.roleIdNumber !== null) {
    investor = await getInvestorById(user.roleIdNumber);
    investorRequest = await getInvestorRequestById(user.roleIdNumber);
    investmentRequest = await getAllInvestmentRequestByInvestorId(user.roleIdNumber);
    investmentData = await getAllInvestmentData(investmentRequest);
    dataroomRequest = await getCompanyDataRoomRequestsByInvestor(user.roleIdNumber);
    dataroomItems = await getAllDataroomData(dataroomRequest);
  }

  return (
    <div className="mb-20">
      <div className="flex flex-col items-center min-h-screen relative">
        {investorRequest?.approval === null && (<WaitingShow />)}
        {investorRequest?.approval === false && (<RejectShow user={user} />)}

        <div className="flex justify-between w-11/12 h-9/10">
          <h1 className="flex flex-col justify-end text-black dark:text-white ml-70 text-[40px] font-bold mt-10">
            <div className="flex justify-center items-center mb-2">
              <CgProfile className="mr-2" /> My Portfolio
            </div>
          </h1>
          <InvestableAmount initialAmount={investor?.investableAmount ?? 0} investorId={investor?.id ?? 0} />
        </div>
        <div className="flex w-11/12 h-9/10 bg-[#d2d3db] bg-opacity-50 dark:bg-[#FFFDF3] dark:bg-opacity-30 rounded-[20px] justify-center items-center p-[27px]">
          {investor && <InvestorProfileCard investor={investor} />}
        </div>
        <div className="flex flex-col w-11/12 h-9/10 justify-center items-center">
          <Tabs defaultValue="investment" className="w-full h-full mt-8">
            <TabsList>
              <TabsTrigger value="investment" className="text-lg text-black">Investment</TabsTrigger>
              <TabsTrigger value="request" className="text-lg text-black">Dataroom</TabsTrigger>
            </TabsList>
            <TabsContent value="investment">{investmentData && <InvestmentItemList investments={investmentData} />}</TabsContent>
            <TabsContent value="request">
              {dataroomItems && <DataroomItemList dataroomItems={dataroomItems} />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
