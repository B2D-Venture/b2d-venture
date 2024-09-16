import React from "react";
import { CompanyProfileCard } from "@/components/admin/CompanyProfile/CompanyProfileCard";
import { InvestorProfileCard } from "@/components/admin/InvestorProfile/InvestorProfileCard";

const AdminPage = () => {
  return (
    <div className="text-white flex flex-col items-center mt-10 space-y-4">
      <div className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]">
        <CompanyProfileCard
          logo="https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png"
          companyName="Amazon"
          ceoName="Kammueang Salengdoi"
          description="Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence."
          valuation={100000000}
          income={10000000}
          profit={5000000}
          employees={1000}
        />
      </div>
      <div className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]">
        <InvestorProfileCard
          logo="https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png"
          investorName="Bossy kupaikon"
          description="I was born in japan, live in bangkok for 10 years. i work with NASA and i interest in teachnology"
          age={50}
          netWorth={50000000}
          moneyReadyForInvestment={10000000}
        />
      </div>
    </div>
  );
};

export default AdminPage;
