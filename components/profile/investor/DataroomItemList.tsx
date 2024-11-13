import { Company, DataRoom, DataRoomRequest } from '@/types/company'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import CompanyLogoBox from "@/components/CompanyLogoBox";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FaRegFileLines, FaEye } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";

interface DataRoomItemsProps {
    company: Company;
    request: DataRoomRequest;
    status: string;
    pdfs: DataRoom[];
}

const getStatusColor = (status: string) => {
    return status === "Waitlisted"
        ? "text-[#d5c642] dark:text-[#E4DEA8]"
        : status === "Finalized"
            ? "text-[#34ba5a] dark:text-[#8AE2A3]"
            : "text-[#ff0000] dark:text-[#eaadad]";
}

const DataroomItemList = ({ dataroomItems }: { dataroomItems: DataRoomItemsProps[] }) => {
    return (
        <div className="w-full">
            <div className="w-full mt-8 p-4 grid grid-cols-5 gap-5 items-center">
                <div className="col-span-2 text-[#E4A222] text-3xl font-bold">Dataroom</div>
                <div className="col-span-1"></div>
                <div className="col-span-2 text-black dark:text-white text-3xl font-bold">Status</div>
            </div>
            <div className="border-b-2 border-black dark:border-white mb-5" />
            {dataroomItems.length >= 0 ? (
                <div className="flex justify-center items-center text-center text-xl mt-8">
                    <FaRegFileAlt className="mr-3 text-4xl" />
                    <span>No Data Room Request</span>
                </div>
            ) : (
                dataroomItems.map((item, index) => (
                    <div key={index}>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-2" className="w-full">
                                <div className="grid grid-cols-5 gap-5 p-4 justify-center items-center">
                                    <div className="col-span-2 text-black dark:text-white text-xl">
                                        <CompanyLogoBox
                                            key={item.company.id}
                                            logoUrl={item.company.logo}
                                            companyAbbr={item.company.abbr}
                                            companyName={item.company.name}
                                            companyId={item.company.id ?? 0}
                                        />
                                    </div>
                                    <div></div>
                                    <div className={`col-span-1 ${getStatusColor(item.status)} text-3xl font-bold`}>
                                        {item.status} <br />
                                        <span className="text-gray-400 text-sm">{item.request.requestDate.toLocaleDateString()}</span>
                                    </div>
                                    <div className="col-span-1">
                                        <AccordionTrigger asChild className="hover:no-underline">
                                            {item.status === "Finalized" && (
                                                <Button className="w-full bg-gradient-to-r from-[#D9D9D9] to-[#B0B0B0] text-black text-base font-bold hover:bg-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                                                    <span className="flex-grow transition-transform duration-200 hover:scale-105">View my Investment</span>
                                                    <ChevronDownIcon
                                                        className="font-bold ml-2 transition-transform duration-200 transform group-hover:rotate-180"
                                                        aria-hidden
                                                        color="black"
                                                        scale={1.5}
                                                    />
                                                </Button>
                                            )}
                                        </AccordionTrigger>
                                    </div>
                                </div>

                                <AccordionContent>
                                    <div className="grid grid-cols-3 gap-y-1 gap-x-5 justify-center items-center w-full space-y-2 pl-4 pr-4">
                                        <div className="text-black dark:text-white text-lg font-bold">
                                            {item.pdfs.map((pdf, index) => (
                                                <div key={pdf.id} className="flex bg-[#eeee] dark:bg-[#1b1b1b] h-[80px] border-2 border-dotted border-black dark:border-[#382e17] rounded-lg my-4">
                                                    <div className="text-2xl w-16 h-14 flex items-center justify-center">
                                                        <FaRegFileLines />
                                                    </div>
                                                    <div className="flex-1 my-2">
                                                        <p className="font-semibold">{pdf.documentName}</p>
                                                        {pdf.documentSize > 0 && <p className="text-gray-500 text-sm">{(pdf.documentSize / 1024).toFixed(2)} KB</p>}
                                                    </div>
                                                    <a
                                                        href={`${pdf.documentUrl}`}
                                                        target="_blank"
                                                        className="text-xl hover:underline flex items-center justify-center mx-6"
                                                    >
                                                        <FaEye />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ))
            )}
        </div>
    );
};


export default DataroomItemList