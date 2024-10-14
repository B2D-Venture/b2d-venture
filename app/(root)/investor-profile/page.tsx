import InvestableAmount from "@/components/InvestableAmount";
import InvestmentItemList from "@/components/InvestmentItemList";
import { InvestorProfileCard } from "@/components/InvestorProfileCard";
import { getUserByEmail, getInvestorById } from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AiOutlineClockCircle } from "react-icons/ai";

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
      <div className="flex flex-col items-center min-h-screen relative">
        {/* Overlay for accounts under review */}
        {investor?.status === false && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-20 p-4">
            <div className="bg-[#ffffffe6] rounded-lg text-center p-8 shadow-lg border-4 border-[#FABC3F]">
              {/* Centered Animated Icon */}
              <div className="flex justify-center mb-4 animate-bounce">
                <AiOutlineClockCircle className="text-[#FFAD60] text-[80px]" />
              </div>

              {/* Title */}
              <h1 className="text-[42px] font-bold text-[#FFAD60] mb-2">Not Approved Yet</h1>

              {/* Optional: Add a subtle fade-in animation */}
              <p className="text-[28px] text-[#A66E38]">
                Waiting for admin to approve your information...
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between w-11/12 h-9/10">
          <h1 className="flex flex-col justify-center text-white ml-70 text-[40px] font-bold mt-10">
            My Portfolio
          </h1>
          <InvestableAmount amount={investor?.investableAmount} />
        </div>
        <div className="flex w-11/12 h-9/10 bg-[#FFFDF3] bg-opacity-30 rounded-[20px] justify-center items-center p-[27px]">
          <InvestorProfileCard investor={investor} />
        </div>
        <div className="flex flex-col w-11/12 h-9/10 justify-center items-center">
          <InvestmentItemList />
        </div>
      </div>
    </div>
  );
}
