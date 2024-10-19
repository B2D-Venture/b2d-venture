"use client";

import React, { useState } from "react";
import AnimatedCounter from "@/components/animation/AnimatedCounter";
import { HiCash } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import { UpdateInvestorAmount } from "@/lib/db/index"; 


const InvestableAmount = ({ initialAmount, investorId }: { initialAmount: number, investorId: number }) => {
  let [amount, setAmount] = useState(initialAmount);

  const addCash = () => {
    setAmount((prevAmount) => prevAmount + 25000);
    UpdateInvestorAmount({ investorId, amount: amount + 25000 });
  };

  return (
    <div className="p-4 rounded-xl shadow-lg text-right text-white transition-all duration-300 my-3">
      <h3 className="text-xl font-semibold text-gray-300">You can Invest</h3>
      <div className="text-4xl flex justify-center items-center font-extrabold my-4 text-[#E4A222]">
        <AnimatedCounter amount={amount} />
        <HiCash className="ml-3 text-[#E4A222] animate-pulse" />
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Based on your income, net worth, <br /> and current investments
      </p>
      <div className="flex justify-end items-center space-x-2">
        <button onClick={addCash}>
          <IoAddCircleOutline className="text-[#E4A222] text-2xl hover:text-yellow-400 transition duration-200 ease-in-out transform hover:scale-125" />
        </button>
        <div className="text-xl text-[#E4A222] font-bold">25,000 $</div>
      </div>
    </div>
  );
};

export default InvestableAmount;
