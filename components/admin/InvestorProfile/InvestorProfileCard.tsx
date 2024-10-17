import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import * as React from "react";

import { Button } from "@/components/ui/button";
import InvestorProfileBadge from "@/components/admin/InvestorProfile/InvestorProfileBadge";
import { OutputTextBox } from "@/components/admin/OutputTextBox";
import { OutputTextBoxDollar } from "@/components/admin/OutputTextBoxDollar";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";

export function InvestorProfileCard({
  logo,
  investorName,
  email,
  birthDate,
  netWorth,
  moneyReadyForInvestment,
  Nationality,
  handleApprove,
  handleReject,
}: {
  logo: string;
  investorName: string;
  email: string;
  Nationality: string;
  birthDate: string;
  netWorth: number;
  moneyReadyForInvestment: number;
  handleApprove: () => void;
  handleReject: () => void;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-10">
            <img
              src={logo}
              alt="Investor Profile"
              className="w-14 h-14 rounded-full col-span-1"
            />
            <div className="col-span-9">
              <AccordionTrigger className="text-lg text-black flex w-full justify-between text-left">
                <span className="flex-1">{investorName}</span>
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
          <InvestorProfileBadge />
          <div className="flex flex-row items-center space-x-4 mt-2 text-black mb-2">
            <OutputTextBox
              label="Email"
              value={email}
              classNameLabel=""
              classNameValue=""
            />
            <OutputTextBox
              label="Nationality"
              value={Nationality}
              classNameLabel=""
              classNameValue=""
            />
          </div>
          <AccordionContent>
            <div className="flex flex-row items-center justify-between">
              <OutputTextBox
                label="BirthDate"
                value={birthDate}
                classNameLabel=""
                classNameValue=""
              />
              <OutputTextBoxDollar
                label="Net Worth"
                value={netWorth}
                classNameLabel=""
                classNameValue=""
              />
              <OutputTextBoxDollar
                label="Money Ready For Investment"
                value={moneyReadyForInvestment}
                classNameLabel=""
                classNameValue=""
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-row space-x-2 justify-end">
        <Button variant="ghost" size="icon" className="bg-green-500" onClick={handleApprove}>
          <CheckIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="bg-red-500" onClick={handleReject}>
          <Cross2Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
