import React from "react";
import DealBadge from "@/components/admin/badge/DealBadge";
import CompanyProfileBadge from "@/components/admin/CompanyProfile/CompanyProfileBadge";
import InvestorProfileBadge from "@/components/admin/badge/InvestorProfileBadge";
import { CompanyProfileCard } from "@/components/admin/CompanyProfile/CompanyProfileCard";

const AdminPage = () => {
  return (
    <div className="text-white flex flex-col items-center mt-10">
      <div className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]">
        <CompanyProfileCard
          logo="https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png"
          companyName="Amazon"
          ceoName="Kammueang Salengdoi"
          description="Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence."
          valuation={1000000}
          income={100000}
          profit={10000}
          employees={1000}
        />
      </div>
    </div>
  );
};

export default AdminPage;
