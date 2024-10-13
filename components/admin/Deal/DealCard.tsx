import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import * as React from "react";

import { Button } from "@/components/ui/button";
import DealBadge from "@/components/admin/Deal/DealBadge";
import { OutputTextBox } from "@/components/admin/OutputTextBox";
import { OutputTextBoxDollar } from "@/components/admin/OutputTextBoxDollar";
import { OutputTextBoxPercentage } from "@/components/admin/OutputTextBoxPercentage";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";


export function Dealcard({
  investorName,
  moneyReadyForInvestment,
  investAmount,
  stockPercentage,
  companyName,
  raiseTarget,
  raisePercentage,
  valuation,
}: {
  investorName: string;
  moneyReadyForInvestment: number;
  investAmount: number;
  stockPercentage: number;
  companyName: string;
  raiseTarget: number;
  raisePercentage: number;
  valuation: number;
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
          <DealBadge/>
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
              <div className="flex flex-row items-center space-x-[19px]">
                <OutputTextBox label="Company Name" value={companyName} />
              </div>
              <div className="flex flex-row items-center space-x-7">
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
                <div className="flex flex-row items-center space-x-[52px]">
                  <OutputTextBoxPercentage
                    label="Get Stock"
                    value={stockPercentage}
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
                <div className="flex flex-row items-center space-x-2">
                  <OutputTextBoxPercentage
                    label="Raise Percentage"
                    value={raisePercentage}
                    classNameLabel="space-x-1"
                    classNameValue="pl-[5px]"
                  />
                </div>
                <div className="flex flex-row items-center space-x-12">
                  <OutputTextBoxDollar
                    label="Valuation"
                    value={valuation}
                    classNameLabel="space-x-1"
                    classNameValue=""
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-row space-x-2 justify-end">
        <Button variant="ghost" size="icon" className="bg-green-500">
          <CheckIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-red-500">
          <Cross2Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
