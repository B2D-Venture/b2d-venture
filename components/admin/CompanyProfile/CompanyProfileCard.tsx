import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import CompanyProfileBadge from "@/components/admin/CompanyProfile/CompanyProfileBadge";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { OutputTextBox } from "@/components/admin/OutputTextBox";
import { OutputTextBoxDollar } from "@/components/admin/OutputTextBoxDollar";
import { OutputTextBoxPercentage } from "@/components/admin/OutputTextBoxPercentage";
import { Target } from "lucide-react";

export function CompanyProfileCard({
  logo,
  companyName,
  description,
  abbreviation,
  valuation,
  minimumInvestment,
  maximumInvestment,
  securityType,
  target,
}: {
  logo: string;
  companyName: string;
  description: string;
  abbreviation: string;
  valuation: number;
  minimumInvestment: number;
  maximumInvestment: number;
  securityType: string;
  target: number;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-10">
            <img
              src={logo}
              alt="Company Logo"
              className="w-14 h-14 rounded-full col-span-1"
            />
            <div className="col-span-9">
              <AccordionTrigger className="text-lg text-black flex w-full justify-between text-left">
                <span className="flex-1">{companyName}</span>
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
            {description}
          </p>
          <AccordionContent>
            <div className="grid grid-cols-3 text-black justify-start w-full space-y-2">
              <div className="flex flex-row items-center space-x-5">
                <OutputTextBox label="Abbreviation" value={abbreviation} />
              </div>
              <div className="flex flex-row items-center space-x-[60px]">
                <OutputTextBox label="Security Type" value={securityType} />
              </div>
              <div className="flex flex-row items-center space-x-[47px]">
                <OutputTextBoxDollar label="Funding Target" value={target} />
              </div>
              <div className="flex flex-row items-center space-x-[33px]">
                <OutputTextBoxDollar
                  label="Valuation"
                  value={valuation}
                />
              </div>
              <div className="flex flex-row items-center space-x-1">
                <OutputTextBoxDollar
                  label="Minimum Investment"
                  value={minimumInvestment}
                />
              </div>
              <div className="flex flex-row items-center space-x-1">
                <OutputTextBoxDollar
                  label="Maximum Investment"
                  value={maximumInvestment}
                  classNameLabel=""
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
