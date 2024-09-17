import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import DealBadge from "@/components/admin/Deal/DealBadge";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { OutputTextBox } from "@/components/admin/OutputTextBox";
import { OutputTextBoxDollar } from "@/components/admin/OutputTextBoxDollar";
import { OutputTextBoxPercentage } from "@/components/admin/OutputTextBoxPercentage";

export function Dealcard({
  investorName,
  moneyReadyForInvestment,
  investAmount,
  stockPercentage,
  companyName,
  raiseTarget,
  raisePercentage,
  valuaiton,
}: {
  investorName: string;
  moneyReadyForInvestment: number;
  investAmount: number;
  stockPercentage: number;
  companyName: string;
  raiseTarget: number;
  raisePercentage: number;
  valuaiton: number;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-10">
            <div className="col-span-10">
              <AccordionTrigger className="text-lg text-black flex w-full justify-between text-left">
                <span className="flex-1">
                  {investorName} invest in {companyName}
                </span>
                <ChevronDownIcon
                  className="text-muted-foreground transition-transform duration-200"
                  aria-hidden
                  color="black"
                  scale={1.5}
                />
              </AccordionTrigger>
            </div>
          </div>
          <div className="border-b-2 border-black mt-2 mb-2" />
          <DealBadge />
          <div className="grid grid-cols-2 gap-4 text-black justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center space-x-5">
                <OutputTextBox label="Investor Name" value={investorName} />
              </div>
              <div className="flex flex-row items-center space-x-2">
                <OutputTextBoxDollar
                  label="Invest Amount"
                  value={investAmount}
                  classNameLabel="space-x-1"
                  classNameValue="pl-[5px]"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center space-x-3 pl-[2px]">
                <OutputTextBox label="Company Name" value={companyName} />
              </div>
              <div className="flex flex-row items-center space-x-6">
                <OutputTextBoxDollar
                  label="Raise Target"
                  value={raiseTarget}
                  classNameLabel="space-x-1"
                  classNameValue="pl-[5px]"
                />
              </div>
            </div>
          </div>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 text-black justify-between w-full mt-2">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-12">
                  <OutputTextBoxPercentage
                    label="Get Stock"
                    value={stockPercentage}
                    classNameLabel="space-x-1"
                    classNameValue="pl-[5px]"
                  />
                </div>
                <div className="flex flex-row items-center space-x-2">
                  <OutputTextBoxDollar
                    label="Money Ready For Investment"
                    value={moneyReadyForInvestment}
                    classNameLabel="space-x-1"
                    classNameValue="pl-[5px]"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-1">
                  <OutputTextBoxPercentage
                    label="Raise Percentage"
                    value={raisePercentage}
                    classNameLabel="space-x-1"
                    classNameValue="pl-[5px]"
                  />
                </div>
                <div className="flex flex-row items-center space-x-10">
                  <OutputTextBoxDollar
                    label="Valuation"
                    value={valuaiton}
                    classNameLabel="space-x-1 pl-[5px]"
                    classNameValue=""
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
