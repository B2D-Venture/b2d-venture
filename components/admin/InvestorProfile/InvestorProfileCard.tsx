import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

import { Button } from "@/components/ui/button";
import InvestorProfileBadge from "@/components/admin/InvestorProfile/InvestorProfileBadge";
import { OutputTextBox } from "@/components/admin/OutputTextBox";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@radix-ui/react-icons";
import { RejectButton } from "@/components/admin/reject/RejectButton";

import Image from "next/image";

export function InvestorProfileCard({
  investorRequest,
  handleApprove,
  handleReject,
}: {
  investorRequest: any;
  handleApprove: () => void;
  handleReject: () => void;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-10">
            <Image
              src={investorRequest.investor?.profileImage}
              alt="Investor Profile"
              width={90}
              height={90}
              className="w-14 h-14 rounded-full col-span-1"
            />
            <div className="col-span-9">
              <AccordionTrigger className="text-lg text-black flex w-full justify-between text-left">
                <span className="flex-1">
                  {investorRequest.investor?.firstName + " " + investorRequest.investor?.lastName}
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
          <InvestorProfileBadge />
          <div className="grid grid-cols-3 text-black justify-start w-full my-2">
            <div>
              <OutputTextBox
                label="Email"
                value={investorRequest.investor?.email}
              />
            </div>
            <div>
              <OutputTextBox
                label="Nationality"
                value={investorRequest.investor?.nationality}
              />
            </div>
            <div>
              <OutputTextBox
                label="BirthDate"
                value={investorRequest.investor?.birthDate}
              />
            </div>
          </div>
          <AccordionContent>
            <div className="grid grid-cols-3 text-black justify-start w-full my-2">
              <div>
                <OutputTextBox
                  label="Net Worth"
                  value={investorRequest.investor?.networth}
                  iconSideLeft="$"
                />
              </div>
              <div>
                <OutputTextBox
                  label="Investable Money"
                  value={investorRequest.investor?.investableAmount}
                  iconSideLeft="$"
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

        <RejectButton type="investor" request={investorRequest} email={investorRequest.investor?.email} handleReject={handleReject}  />
      </div>
    </div>
  );
}
