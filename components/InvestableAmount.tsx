"use client";

import React from "react";

const InvestableAmount = ({ amount }: { amount: number }) => {
  const formattedAmount = new Intl.NumberFormat().format(amount);
  return (
    <div className="text-white p-4 rounded-lg text-right">
      <h3 className="text-xl">You can Invest</h3>
      <p className="text-4xl font-bold my-2 text-[#E4A222]">${formattedAmount}</p>
      <p className="text-xs">
        Based on your income, net worth<br></br>
        and current investments
      </p>
    </div>
  );
};

export default InvestableAmount;
