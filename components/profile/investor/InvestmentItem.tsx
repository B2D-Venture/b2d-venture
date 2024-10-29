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

const InvestmentItem = ({ company, request, status }: InvestmentItemProps) => {
  const statusColor =
    status === "Waitlisted"
      ? "text-[#d5c642] dark:text-[#E4DEA8]"
      : status === "Finalized"
        ? "text-[#34ba5a] dark:text-[#8AE2A3]"
        : "text-[#ff0000] dark:text-[#eaadad]";



  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat().format(amount);
  };

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2" className="w-full">
          <div className="grid grid-cols-5 gap-5 p-4 justify-center items-center">
            <div className="col-span-2 text-black dark:text-white text-xl">
              <CompanyLogoBox
                key={company.id}
                logoUrl={company.logo}
                companyAbbr={company.abbr}
                companyName={company.name}
                companyId={company.id ?? 0}
              />
            </div>
            <div className="col-span-1 text-black dark:text-white text-3xl font-bold">
              $ {formatAmount(request.amount)}
            </div>
            <div className={`col-span-1 ${statusColor} text-3xl font-bold`}>
              {status} <br />
              <span className="text-gray-400 text-sm">{request.requestDate.toLocaleDateString()}</span>
            </div>
            <div className="col-span-1">
              <AccordionTrigger asChild className="hover:no-underline">
                {status === "Finalized" && (
                  <Button className="w-full bg-gradient-to-r from-[#D9D9D9] to-[#B0B0B0] text-black text-base font-bold hover:bg-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                    <span className="flex-grow transition-transform duration-200 hover:scale-105">View my Investment</span>
                    <ChevronDownIcon
                      className="font-bold ml-2 transition-transform duration-200 transform group-hover:rotate-180"
                      aria-hidden
                      color="black"
                      scale={1.5}
                    />
                  </Button>
                )}
              </AccordionTrigger>
            </div>
          </div>

          <AccordionContent>
            <div className="grid grid-cols-3 gap-y-1 gap-x-5 justify-center items-center w-full space-y-2 pl-4 pr-4">
              <div className="flex text-black dark:text-white text-lg font-bold">
                <span>Market Price:</span>
                <span className="mx-1">
                  {formatAmount(1000)}$
                </span>
                <p className="text-[#319f43]">
                  (+10.0$)
                </p>
              </div>
              <div className="flex text-black dark:text-white text-lg font-bold">
                <span>Valuation:</span>
                <span className="mx-1">
                  {formatAmount(request.valuation)}$
                </span>
              </div>
              <div className="flex text-black dark:text-white text-lg font-bold">
                <span>Stock:</span>
                <span className="mx-1">
                  3%
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
