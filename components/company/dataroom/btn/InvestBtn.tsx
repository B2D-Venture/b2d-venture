"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  addDataRoomRequest,
  getCompanyDataRoomRequestsByCompanyAndInvestor,
} from "@/lib/db/dataroom";

const InvestBtn = ({
  text,
  textColor,
  hoverTextColor,
  bgColor,
  hoverBgColor,
  borderColor,
  hoverBorderColor,
  urlId,
  investorId,
}: {
  text: string;
  textColor: string;
  hoverTextColor: string;
  bgColor: string;
  hoverBgColor: string;
  borderColor: string;
  hoverBorderColor: string;
  urlId: number;
  investorId: number;
}) => {
  const invest = async () => {};

  return (
    <div className="my-2 flex items-center justify-center">
      <Button
        onClick={() => {
          invest();
        }}
        className={`py-2 w-[170px] ${textColor} ${bgColor} ${borderColor} text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg`}
      >
        {text}
      </Button>
    </div>
  );
};

export default InvestBtn;
