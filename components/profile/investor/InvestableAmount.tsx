"use client";

import React, { useState } from "react";
import AnimatedCounter from "@/components/animation/AnimatedCounter";
import { HiCash } from "react-icons/hi";
import { MdOutlinePayment } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import TopUpForm from "@/components/form/TopUpForm";
import { InvestableAmountProps } from "@/types/investor";

const InvestableAmount = ({ initialAmount, investorId, email }: InvestableAmountProps) => {
  let [amount, setAmount] = useState(initialAmount);
  const [showTopUpDialog, setShowTopUpDialog] = useState(false);

  const popup = () => {
    setShowTopUpDialog(true);
  };

  const closeDialog = () => {
    setShowTopUpDialog(false);
  };

  return (
    <div className="p-4 rounded-xl bg-[#f7fbfe] dark:bg-[#1a1c22] shadow-lg text-right transition-all duration-300 my-3">
      <h3 className="text-xl font-semibold text-black dark:text-gray-300">You can Invest</h3>
      <div className="text-4xl flex justify-center items-center font-extrabold my-4 text-[#E4A222]">
        <AnimatedCounter amount={initialAmount} />
        <HiCash className="ml-3 text-[#E4A222] animate-pulse" />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Based on your income, net worth, <br /> and current investments
      </p>
      <div className="flex justify-end items-center space-x-2 group">
        <button
          onClick={popup}
          className="flex items-center space-x-2 group-hover:text-yellow-400 group-hover:scale-110 active:text-yellow-600 active:scale-100 transition duration-200 ease-in-out transform"
        >
          <MdOutlinePayment className="text-[#E4A222] text-2xl" />
          <span className="text-xl text-[#E4A222] font-bold">Top Up</span>
        </button>
      </div>
      {showTopUpDialog && (
        <Dialog open={showTopUpDialog} onOpenChange={setShowTopUpDialog}>
          <DialogContent className="w-full dark:bg-[#1f1f1f] dark:border-gray-600">
            <DialogHeader>
              <DialogTitle className="text-2xl">Top Up</DialogTitle>
              <DialogDescription>
                <p>Top up your account to increase your investable amount</p>
              </DialogDescription>
            </DialogHeader>

            <TopUpForm email={email} investorId={investorId} closeDialog={closeDialog} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InvestableAmount;
