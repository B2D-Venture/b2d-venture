import React from "react";
import { RaiseFundingCard } from "../Raisefunding/RaisefundingCard";

interface FundingTabProps {
    raiseFundingData: RaiseFundingRequestData[];
    handleApprove: (raiseFunding: RaiseFundingRequestData) => void;
    handleReject: (id: number) => void;
}

export const FundingTabContent: React.FC<FundingTabProps> = ({ raiseFundingData, handleApprove, handleReject }) => {

    return (
        <div className="flex flex-col items-center mt-10 space-y-4 mb-10">
            {
                raiseFundingData.map((raiseFunding, index) => (
                    <div
                        key={index}
                        className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
                    >
                        <RaiseFundingCard
                            key={raiseFunding.id}
                            company={raiseFunding.company}
                            raiseFunding={raiseFunding.raiseFunding!}
                            requestDate={raiseFunding.requestDate}
                            // logo={raiseFunding.company?.logo || "default_logo_url.png"}
                            // companyName={raiseFunding.company?.name || "Company Name"}
                            // description={
                            //     raiseFunding.company?.description || "Company Description"
                            // }

                            // PricePerShare={raiseFunding.raiseFunding?.priceShare || 100}
                            // valuation={raiseFunding.raiseFunding?.valuation || 10000000}
                            // minimumInvestment={raiseFunding.raiseFunding?.minInvest || 1000}
                            // maximumInvestment={raiseFunding.raiseFunding?.maxInvest || 10000}
                            // deadline={raiseFunding.raiseFunding?.deadline || "Stock"}
                            // target={raiseFunding.raiseFunding?.fundingTarget || 10000000}
                            handleApprove={() => handleApprove(raiseFunding)}
                            handleReject={() => handleReject(raiseFunding.id)}
                        />
                    </div>
                ))
            }
        </div>
    );
};
