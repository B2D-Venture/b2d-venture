import InvestableAmount from "@/components/InvestableAmount";
import InvestmentItemList from "@/components/InvestmentItemList";
import { InvestorProfileCard } from "@/components/InvestorProfileCard";
import { getUserByEmail, getInvestorById } from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function InvestorProfile() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    redirect("/");
  }
  const userEmail = session.user.email;
  const user = await getUserByEmail(2, userEmail); // get user role 2 = investor

  if (!user) {
    redirect("/role-register");
  }

  let investor = null;
  if (user.roleIdNumber !== null) {
    investor = await getInvestorById(user.roleIdNumber);
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex justify-between w-11/12 h-9/10">
          <h1 className="flex flex-col justify-center text-white ml-70 text-[40px] font-bold mt-10">
            My Portfolio
          </h1>
          <InvestableAmount />
        </div>
        <div className="flex w-11/12 h-9/10 bg-[#FCD535] bg-opacity-65 rounded-[10px] justify-center items-center p-[27px]">
          {/* <InvestorProfileCard investor={investor} /> */}
        </div>
        <div className="flex flex-col w-11/12 h-9/10 justify-center items-center">
          <InvestmentItemList />
        </div>
      </div>
    </div>
  );
}
