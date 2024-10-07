import InvestableAmount from "@/components/InvestableAmount";
import InvestmentItemList from "@/components/InvestmentItemList";
import { InvestorProfileCard } from "@/components/InvestorProfileCard";

export default function InvestorProfile() {
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
          <InvestorProfileCard />
        </div>
        <div className="flex flex-col w-11/12 h-9/10 justify-center items-center">
          <InvestmentItemList />
        </div>
      </div>
    </div>
  );
}
