import React from "react";
import { InvestorRequest } from "@/types/investor";
import { InvestorProfileCard } from "../InvestorProfile/InvestorProfileCard";

interface InvestorTabProps {
    investorData: InvestorRequest[];
    handleApprove: (investorRequest: InvestorRequest) => void;
    handleReject: (id: number) => void;
}

export const InvestorTabContent: React.FC<InvestorTabProps> = ({ investorData, handleApprove, handleReject }) => {

    return (
        <div className="flex flex-col items-center mt-10 space-y-4 mb-10">
            {
                investorData.map((investorRequest, index) => (
                    <div
                        key={index}
                        className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
                    >
                        <InvestorProfileCard
                            investorRequest={investorRequest}
                            handleApprove={() => handleApprove(investorRequest)}
                            handleReject={() => handleReject(investorRequest.id)}
                        />
                    </div>
                ))
            }
        </div>
    );
};
