import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import * as React from "react";

import { Button } from "@/components/ui/button";
import CompanyProfileBadge from "@/components/admin/CompanyProfile/CompanyProfileBadge";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { OutputTextBox } from "@/components/admin/OutputTextBox";
import { OutputTextBoxDollar } from "@/components/admin/OutputTextBoxDollar";

import { CheckIcon } from "@radix-ui/react-icons";
import { RejectButton } from "@/components/admin/reject/RejectButton";
import { Company } from "@/types/company";

export function CompanyProfileCard({
  companyRequest,
  email,
  handleApprove,
  handleReject,
}: {
  companyRequest: any;
  email: string;
  handleApprove: () => void;
  handleReject: () => void;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-10">
            <img
              src={companyRequest.company.logo}
              alt="Company Logo"
              className="w-14 h-14 rounded-full col-span-1"
            />
            <div className="col-span-9">
              <AccordionTrigger className="text-lg text-black flex w-full justify-between text-left">
                <span className="flex-1">{companyRequest.company.name}</span>
                <ChevronDownIcon
                  className="AccordionChevron text-muted-foreground transition-transform duration-200"
                  aria-hidden
                  color="black"
                  scale={1.5}
                />
              </AccordionTrigger>
            </div>
          </div>
          <div className="border-b-2 border-black mt-2 mb-2" />
          <CompanyProfileBadge />
          <p className="w-full text-black pt-2">
            <b>Description:</b> {companyRequest.company.description}
          </p>
          <AccordionContent>
            <div className="grid grid-cols-3 text-black justify-start w-full space-y-2">
              <div className="flex flex-row items-center space-x-5">
                <OutputTextBox label="Abbreviation" value={companyRequest.company.abbr} />
              </div>
              <div className="flex flex-row items-center space-x-[93px]">
                <OutputTextBox label="Deadline" value={companyRequest.company.raise_funding.deadline} />
              </div>
              <div className="flex flex-row items-center space-x-[47px]">
                <OutputTextBoxDollar label="Funding Target" value={companyRequest.company.raise_funding.fundingTarget} />
              </div>
              <div className="flex flex-row items-center space-x-[33px]">
                <OutputTextBoxDollar label="Valuation" value={10000} />
              </div>
              <div className="flex flex-row items-center space-x-1">
                <OutputTextBoxDollar
                  label="Minimum Investment"
                  value={companyRequest.company.raise_funding.minInvest}
                />
              </div>
              <div className="flex flex-row items-center space-x-1">
                <OutputTextBoxDollar
                  label="Maximum Investment"
                  value={companyRequest.company.raise_funding.maxInvest}
                  classNameLabel=""
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-row space-x-2 justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="bg-green-500"
          onClick={handleApprove}
        >
          <CheckIcon className="h-4 w-4" />
        </Button>

        <RejectButton type="company" request={companyRequest} email={email} handleReject={handleReject}  />
      </div>
    </div>
  );
}
