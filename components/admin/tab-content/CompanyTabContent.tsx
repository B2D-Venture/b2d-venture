import React from "react";
import { CompanyProfileCard } from "@/components/admin/CompanyProfile/CompanyProfileCard";
import { CompanyRequestData } from "@/types/company";

interface CompanyTabProps {
    companyData: CompanyRequestData[];
    fetchData: () => void;
    handleApprove: (companyRequest: CompanyRequestData) => void;
    handleReject: (id: number) => void;
}

export const CompanyTabContent: React.FC<CompanyTabProps> = ({ companyData, fetchData, handleApprove, handleReject }) => {

    return (
        <div className="flex flex-col items-center mt-10 space-y-4 mb-10">
            {
                companyData.map((request, index) => (
                    <div
                        key={index}
                        className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
                    >
                        <CompanyProfileCard
                            key={request.id}
                            companyRequest={request}
                            handleApprove={() => handleApprove(request)}
                            handleReject={() => handleReject(request.id)}
                            email=""
                        />
                    </div>
                ))
            }
        </div>
    );
};
