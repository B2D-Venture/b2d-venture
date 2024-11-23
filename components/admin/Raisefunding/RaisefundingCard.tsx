import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import * as React from "react";

import { Button } from "@/components/ui/button";
import RaisefundingBadge from "./RaisefundingBadge";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { OutputTextBox } from "@/components/admin/OutputTextBox";

import { CheckIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";

import Image from "next/image";
import { Company } from "@/types/company";

export function RaiseFundingCard({
  company,
  raiseFunding,
  requestDate,
  handleApprove,
  handleReject,
}: {
  company: Company;
  raiseFunding: RaiseFunding;
  requestDate: Date;
  handleApprove: () => void;
  handleReject: () => void;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-10">
            <Image
              src={company.logo}
              alt="Company Logo"
              width={90}
              height={90}
              className="w-14 h-14 rounded-full col-span-1"
            />
            <div className="col-span-9">
              <AccordionTrigger className="text-lg text-black flex w-full justify-between text-left">
                <span data-id="funding-card-name" className="flex-1">{company.name}</span>
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
          <RaisefundingBadge />
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <b>Request Date:</b> {
                new Date(requestDate).toLocaleDateString('en-GB')
                ? new Date(requestDate).toLocaleDateString('en-GB')
                : "N/A"}
            </p>
          </div>
          <p className="w-full text-black pt-2">
            <b>Description:</b> {company.description}
          </p>
          <AccordionContent>
            <div className="grid grid-cols-3 text-black justify-start w-full space-y-2">
              <div>
                <OutputTextBox label="Deadline" value={raiseFunding.deadline} />
              </div>
              <div>
                <OutputTextBox label="Price Per Share" value={raiseFunding.priceShare} iconSideLeft="$" />
              </div>
              <div>
                <OutputTextBox label="Funding Target" value={raiseFunding.fundingTarget} iconSideLeft="$" />
              </div>
              <div>
                <OutputTextBox label="Valuation" value={raiseFunding.valuation} iconSideLeft="$" />
              </div>
              <div>
                <OutputTextBox
                  label="Minimum Investment"
                  value={raiseFunding.minInvest}
                  iconSideLeft="$"
                />
              </div>
              <div>
                <OutputTextBox
                  label="Maximum Investment"
                  value={raiseFunding.maxInvest}
                  iconSideLeft="$"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-row space-x-2 justify-end">
        <Button
          data-id="approve-button"
          variant="ghost"
          size="icon"
          className="bg-green-500"
          onClick={handleApprove}
        >
          <CheckIcon className="h-4 w-4" />
        </Button>
        <Button
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
