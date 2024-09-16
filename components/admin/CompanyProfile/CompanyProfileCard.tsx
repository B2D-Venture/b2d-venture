import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import CompanyProfileBadge from "@/components/admin/CompanyProfile/CompanyProfileBadge";

export function CompanyProfileCard({
  logo,
  companyName,
  description,
  ceoName,
  valuation,
  income,
  profit,
  employees,
}: {
  logo: string;
  companyName: string;
  description: string;
  ceoName: string;
  valuation: number;
  income: number;
  profit: number;
  employees: number;
}) {
  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="flex flex-row space-x-10">
            <img
              src={logo}
              alt="Company Logo"
              className="w-14 h-14 rounded-full"
            />
            <AccordionTrigger className="text-lg text-black flex w-full justify-between">
              <span className="flex-1">{companyName}</span>
              {/* <ChevronDownIcon
                className="AccordionChevron text-muted-foreground transition-transform duration-200 text-black"
                aria-hidden
              /> */}
            </AccordionTrigger>
          </div>
          <div className="border-b-2 border-black mt-2 mb-2" />
          <CompanyProfileBadge />
          <p className="w-full overflow-hidden text-black pt-2">
            {description}
          </p>
          <AccordionContent>
            <div className="flex flex-row items-center justify-center space-x-5">
              <Label>Valuation</Label>
              <div className="flex flex-row items-center space-x-1">
                <span>$</span>
                <Input
                  value={valuation}
                  disabled
                  className="border-2 border-black w-auto"
                />
              </div>
              <Label>Income</Label>
              <div className="flex flex-row items-center space-x-1">
                <span>$</span>
                <Input
                  value={income}
                  disabled
                  className="border-2 border-black w-auto"
                />
              </div>
              <Label>Profit</Label>
              <div className="flex flex-row items-center space-x-1">
                <span>$</span>
                <Input
                  value={profit}
                  disabled
                  className="border-2 border-black w-auto"
                />
              </div>
              <Label>Employees</Label>
              <Input
                value={employees}
                disabled
                className="border-2 border-black"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
