import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { OutputTextBox } from "@/components/admin/OutputTextBox";
import { OutputTextBoxDollar } from "@/components/admin/OutputTextBoxDollar";
import DataroomRequestBadge from "@/components/company/dataroom/card/DataRoomBadge";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@radix-ui/react-icons";
import { RejectButton } from "@/components/admin/reject/RejectButton";
import { InvestorProps } from "@/types/investor";

export function DataRoomCard({
  investor,
  companyId,
  handleApprove,
  handleReject,
}: {
  investor: InvestorProps;
  companyId?: number;
  handleApprove: () => void;
  handleReject: () => void;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-10">
            <img
              src={investor.profileImage}
              alt="Investor Profile"
              className="w-14 h-14 rounded-full col-span-1"
            />
            <div className="col-span-9">
              <AccordionTrigger className="text-lg text-black flex w-full justify-between text-left">
                <span className="flex-1">{investor.firstName + " " + investor.lastName}</span>
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
          <DataroomRequestBadge />
          <div className="grid grid-cols-2 text-black justify-start w-full my-2">
            <div className="flex flex-row items-center space-x-[80px]">
              <OutputTextBox
                label="Email"
                value={investor.email}
                classNameLabel=""
                classNameValue=""
              />
            </div>
            <div className="flex flex-row items-center space-x-[63px]">
              <OutputTextBox
                label="Nationality"
                value={investor.nationality}
                classNameLabel=""
                classNameValue=""
              />
            </div>
          </div>
          <AccordionContent>
            <div className="grid grid-cols-2 text-black justify-start w-full my-2">
              <div className="flex flex-row items-center space-x-[40px]">
                <OutputTextBoxDollar
                  label="Net Worth"
                  value={investor.networth}
                  classNameLabel=""
                  classNameValue=""
                />
              </div>
              <div className="flex flex-row items-center space-x-[10px]">
              <OutputTextBoxDollar
                label="Investable Money"
                value={investor.investableAmount}
                classNameLabel=""
                classNameValue=""
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

        <RejectButton type="funding" request={investor} email={investor.email} handleReject={handleReject} companyId={companyId} />
      </div>
    </div>
  );
}
