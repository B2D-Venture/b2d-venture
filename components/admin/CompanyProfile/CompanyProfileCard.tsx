"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import CompanyProfileBadge from "@/components/admin/CompanyProfile/CompanyProfileBadge";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { OutputTextBox } from "@/components/admin/OutputTextBox";

import { CheckIcon } from "@radix-ui/react-icons";
import { RejectButton } from "@/components/admin/reject/RejectButton";

import Image from 'next/image';
import Pitch from "@/components/profile/company/Pitch";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import DocumentBox from "@/components/form/elements/DocumentBox";
import { PdfFile } from "@/types/form/index.d";
import { getDataRoomByCompanyId } from "@/lib/db/dataroom";
import { useEffect, useState } from "react";

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
  const [pdfSrc, setPdfSrc] = useState<PdfFile[]>([]);
  useEffect(() => {
    const fetchDocuments = async () => {
      const documents = await getDataRoomByCompanyId(companyRequest.company.id);
      const transformedDocuments = documents ? documents.map(doc => ({
        name: doc.documentName,
        size: doc.documentSize,
        key: doc.id.toString(),
        lastModified: new Date(doc.uploadDate).getTime(),
        serverData: doc,
        url: doc.documentUrl,
      })) : [];

      setPdfSrc(transformedDocuments);
    };
    fetchDocuments();
  }, [companyRequest.company.id]);

  return (
    <div className="flex flex-col w-full space-y-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div className="grid grid-cols-10">
            <Image
              src={companyRequest.company.logo}
              alt="Company Logo"
              width={90}
              height={90}
              className="w-14 h-14 rounded-full col-span-1"
            />
            <div className="col-span-9">
              <AccordionTrigger className="text-lg text-black flex w-full justify-between text-left">
                <span data-id="company-card-name" className="flex-1">{companyRequest.company.name}</span>
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
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <b>Request Date:</b> {companyRequest.requestDate
                ? new Date(companyRequest.requestDate).toLocaleDateString('en-GB')
                : "N/A"}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-700">
              <b>Description:</b> {companyRequest.company.description}
            </p>
          </div>

          <div className="grid grid-cols-3 text-black justify-start w-full">
            <div>
              <OutputTextBox label="Abbreviation" value={companyRequest.company.abbr} />
            </div>
            <div>
              <OutputTextBox label="Deadline" value={companyRequest.company.raiseFunding.deadline} />
            </div>
            <div>
              <OutputTextBox label="Funding Target" value={companyRequest.company.raiseFunding.fundingTarget} iconSideLeft="$" />
            </div>
            <div>
              <OutputTextBox label="Valuation" value={companyRequest.company.raiseFunding.valuation} iconSideLeft="$" />
            </div>
            <div>
              <OutputTextBox
                label="Minimum Investment"
                value={companyRequest.company.raiseFunding.minInvest}
                iconSideLeft="$"
              />
            </div>
            <div>
              <OutputTextBox
                label="Maximum Investment"
                value={companyRequest.company.raiseFunding.maxInvest}
                iconSideLeft="$"
              />
            </div>
            <div>
              <OutputTextBox label="Registration Number" value={companyRequest.company.registrationNumber} />
            </div>
          </div>
          <AccordionContent>
            <p className="text-3xl text-black font-extrabold m-2">Document</p>
            {pdfSrc.length > 0 ? (
              pdfSrc.map((pdf, index) => (
                <DocumentBox key={index} doc={pdf} />
              ))
            ) : (
              <p>No PDF files uploaded</p>
            )}
            <p className="text-3xl text-black font-extrabold m-2">Pitch</p>
            <div className="bg-[#e1e1e1] rounded-md px-8 pt-2 flex flex-col items-center justify-center">
              <div className="relative w-[600px] h-[438px]">
                <AspectRatio ratio={3 / 2}>
                  <Image
                    src={companyRequest.company.banner}
                    alt="banner"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md shadow-lg"
                  />
                </AspectRatio>
              </div>
              <div className="w-full h-[70px] md:h-[100px] lg:h-[80px]">
                <div className="relative w-[120px] h-[120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:w-[100px] xl:h-[100px] lg:w-[150px] lg:h-[150px] md:w-[130px] md:h-[130px]">
                  <Image
                    src={companyRequest.company.logo}
                    alt="logo"
                    layout="fill"
                    className="rounded-[5px] border-2 border-gray-700"
                  />
                </div>
              </div>
              <Pitch pitchData={companyRequest.company.pitch} />
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

        <RejectButton type="company" request={companyRequest} email={email} handleReject={handleReject} />
      </div>
    </div>
  );
}
