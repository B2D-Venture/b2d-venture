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

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";
import { InvestorProps } from "@/types/investor";
import { Company } from "@/types/company";
import Image from "next/image";

export function Dealcard({
  investor,
  company,
  raiseFunding,
  investAmount,
  stockPercentage,
  valuation,
  handleApprove,
  handleReject,
}: {
  investor: InvestorProps;
  company: Company;
  raiseFunding: RaiseFunding;
  investAmount: number;
  stockPercentage: number;
  valuation: number;
  handleApprove: () => void;
  handleReject: () => void;
}) {
  return (
    <div className="w-full space-y-5">
      <span className="flex text-black">
        <Image
          src={investor.profileImage}
          alt="Investor Profile"
          width={90}
          height={90}
          className="w-14 h-14 rounded-full col-span-1"
        />
        <span className="flex items-center mx-3 text-xl">
          <b>{investor.firstName + " " + investor.lastName}</b>&nbsp;invest in
        </span>
        <Image
          src={company.logo}
          alt="Company Logo"
          width={90}
          height={90}
          className="w-14 h-14 rounded-full col-span-1"
        />
        <span className="flex items-center mx-2 text-xl">
          <b>{company.name}</b>
        </span>
      </span>
      <div className="border-b-2 border-black mt-2 mb-2" />
      <DealBadge />
      <div className="grid grid-cols-3 text-black justify-between w-full">
        <div>
          <OutputTextBox
            label="Investor Name"
            value={investor.firstName + " " + investor.lastName}
          />
        </div>
        <div>
          <OutputTextBox
            label="Company Name"
            value={company.name}
          />
        </div>
        <div>
          <OutputTextBox
            label="Invest Amount"
            value={investAmount}
            iconSideLeft="$"
          />
        </div>
        <div>
          <OutputTextBox
            label="Money Ready For Investment"
            value={investor.investableAmount}
            iconSideLeft="$"
          />
        </div>
        <div>
          <OutputTextBox
            label="Raise Target"
            value={raiseFunding.fundingTarget}
            iconSideLeft="$"
          />
        </div>
        <div>
          <OutputTextBox
            label="Valuation"
            value={valuation}
            iconSideLeft="$"
          />
        </div>
        <div>
          <OutputTextBox
            label="Get Stock"
            value={stockPercentage}
            iconSideRight="%"
          />
        </div>
        <div>
          <OutputTextBox
            label="Raise Percentage"
            value={(investAmount / raiseFunding.fundingTarget) * 100}
            iconSideRight="%"
          />
        </div>
      </div>
      <div className="flex flex-row space-x-2 justify-end">
        <Button
          data-id="approve"
          variant="ghost"
          size="icon"
          className="bg-green-500"
          onClick={handleApprove}
        >
          <CheckIcon className="h-4 w-4" />
        </Button>
        <Button
          data-id="reject"
          variant="ghost"
          size="icon"
          className="bg-red-500"
          onClick={handleReject}
        >
          <Cross2Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
