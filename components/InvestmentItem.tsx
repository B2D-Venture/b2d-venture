"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CompanyLogoBox from "@/components/CompanyLogoBox";
import { Button } from "@/components/ui/button";
import { InvestmentItemProps } from "@/types";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const InvestmentItem = (company: InvestmentItemProps) => {
  const statusColor =
    company.status === "Finalized" ? "text-[#8AE2A3]" : "text-[#E4DEA8]";

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat().format(amount);
  };

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2" className="w-full">
          <div className="grid grid-cols-5 gap-5 p-4 justify-center items-center">
            <div className="col-span-2 text-white text-xl">
              <CompanyLogoBox
                key={company.companyName}
                logoUrl={company.logoUrl}
                companyAbbr={company.companyAbbr}
                companyName={company.companyName}
              />
            </div>
            <div className="col-span-1 text-white text-3xl font-bold">
              $ {formatAmount(company.amount)}
            </div>
            <div className={`col-span-1 ${statusColor} text-3xl font-bold`}>
              {company.status} <br />
              <span className="text-gray-400 text-sm">{company.date}</span>
            </div>
            <div className="col-span-1">
              <AccordionTrigger asChild className="hover:no-underline">
                <Button className="w-full bg-gradient-to-r from-[#D9D9D9] to-[#B0B0B0] text-black text-base font-bold hover:bg-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                  <span className="flex-grow transition-transform duration-200 hover:scale-105">View my Investment</span>
                  <ChevronDownIcon
                    className="font-bold ml-2 transition-transform duration-200 transform group-hover:rotate-180"
                    aria-hidden
                    color="black"
                    scale={1.5}
                  />
                </Button>
              </AccordionTrigger>
            </div>
          </div>

          <AccordionContent>
            <div className="grid grid-cols-5 gap-y-1 gap-x-5 justify-center items-center w-full space-y-2 pl-4 pr-4">
              <div className="flex text-white text-lg font-bold col-span-2">
                <span>Market Price:</span>
                <span className="mx-1">
                  {formatAmount(company.marketPrice)}$
                </span>
                <p className="text-[#319f43]">
                  (+{company.priceChange.toFixed(1)}$)
                </p>
              </div>
              <div className="flex text-white text-lg font-bold col-span-3">
                <span>Valuation at invest:</span>
                <span className="mx-1">
                  {formatAmount(company.valuationAtInvest)}$
                </span>
              </div>
              <div className="flex text-white text-lg font-bold col-span-2">
                <span>Stock:</span>
                <span className="mx-1">
                  {company.stockPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="flex text-white text-lg font-bold col-span-3">
                <span>Valuation Market:</span>
                <span className="mx-1">
                  {formatAmount(company.valuationMarket)}$
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div >
  );
};

export default InvestmentItem;
