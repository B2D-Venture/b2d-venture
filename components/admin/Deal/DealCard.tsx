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
          <div className="flex flex-row space-x-10">
            <AccordionTrigger className="text-lg text-black flex w-full justify-between">
              <span className="flex-1">
                {investorName} invest in {companyName}
              </span>
              {/* <ChevronDownIcon
                className="AccordionChevron text-muted-foreground transition-transform duration-200 text-black"
                aria-hidden
              /> */}
            </AccordionTrigger>
          </div>
          <div className="border-b-2 border-black mt-2 mb-2" />
          <DealBadge />
          <div className="grid grid-cols-2 gap-4 text-black justify-between w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center space-x-5">
                <Label className="flex-shrink-0 ">Investor Name</Label>
                <Input
                  value={investorName}
                  disabled
                  className="border-2 border-black w-auto"
                />
              </div>
              <div className="flex flex-row items-center space-x-2">
                <Label>Invest Amount</Label>
                <div className="flex flex-row items-center space-x-1">
                  <span>$</span>
                  <Input
                    value={investAmount}
                    disabled
                    className="border-2 border-black w-auto"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center space-x-3 pl-[2px]">
                <Label className="flex-shrink-0 ">Company Name</Label>
                <Input
                  value={companyName}
                  disabled
                  className="border-2 border-black w-auto"
                />
              </div>
              <div className="flex flex-row items-center space-x-6">
                <Label>Raise Target</Label>
                <div className="flex flex-row items-center space-x-1">
                  <span>$</span>
                  <Input
                    value={raiseTarget}
                    disabled
                    className="border-2 border-black w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 text-black justify-between w-full mt-2">
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-12">
                  <Label>Get Stock</Label>
                  <div className="flex flex-row items-center space-x-1  pl-[4px]">
                    <Input
                      value={stockPercentage}
                      disabled
                      className="border-2 border-black w-auto"
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                  <Label>Money Ready For Investment</Label>
                  <div className="flex flex-row items-center space-x-1">
                    <span>$</span>
                    <Input
                      value={moneyReadyForInvestment}
                      disabled
                      className="border-2 border-black w-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center space-x-1">
                  <Label>Raise Percentage</Label>
                  <div className="flex flex-row items-center space-x-1">
                    <Input
                      value={raisePercentage}
                      disabled
                      className="border-2 border-black w-auto"
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="flex flex-row items-center space-x-10">
                  <Label>Valuation</Label>
                  <div className="flex flex-row items-center space-x-1 pl-[5px]">
                    <span>$</span>
                    <Input
                      value={valuaiton}
                      disabled
                      className="border-2 border-black w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
