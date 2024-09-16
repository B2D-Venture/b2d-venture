import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import InvestorProfileBadge from "@/components/admin/InvestorProfile/InvestorProfileBadge";

export function InvestorProfileCard({
  logo,
  investorName,
  description,
  age,
  netWorth,
  moneyReadyForInvestment,
}: {
  logo: string;
  investorName: string;
  description: string;
  age: number;
  netWorth: number;
  moneyReadyForInvestment: number;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="flex flex-row space-x-10">
            <img
              src={logo}
              alt="Investor Profile"
              className="w-14 h-14 rounded-full"
            />
            <AccordionTrigger className="text-lg text-black flex w-full justify-between">
              <span className="flex-1">{investorName}</span>
              {/* <ChevronDownIcon
                className="AccordionChevron text-muted-foreground transition-transform duration-200 text-black"
                aria-hidden
              /> */}
            </AccordionTrigger>
          </div>
          <div className="border-b-2 border-black mt-2 mb-2" />
          <InvestorProfileBadge />
          <p className="w-full overflow-hidden text-black pt-2">
            {description}
          </p>
          <AccordionContent>
            <div className="flex flex-row items-center justify-between">
              <Label>Age</Label>
              <div className="flex flex-row items-center space-x-1">
                <Input
                  value={age}
                  disabled
                  className="border-2 border-black w-auto"
                />
              </div>
              <Label>netWorth</Label>
              <div className="flex flex-row items-center space-x-1">
                <span>$</span>
                <Input
                  value={netWorth}
                  disabled
                  className="border-2 border-black w-auto"
                />
              </div>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
