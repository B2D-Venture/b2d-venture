"use client";

import React from "react";
import AnimatedCounter from "@/components/animation/AnimatedCounter";
import { HiCash } from "react-icons/hi";

const InvestableAmount = ({ amount }: { amount: number }) => {
  return (
    <div className="text-white p-4 rounded-lg text-right">
      <h3 className="text-xl">You can Invest</h3>
      <div className="text-4xl flex justify-center items-center font-bold my-2 text-[#E4A222]">
        <AnimatedCounter amount={amount} />
        <HiCash className="ml-2" />
      </div>
      <p className="text-xs">
        Based on your income, net worth<br></br>
        and current investments
      </p>
    </div>
  );
};

export default InvestableAmount;
