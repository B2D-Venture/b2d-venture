"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getInvestorById } from "@/lib/db/investor";
import { addInvestmentRequest, getInvestorRequestById } from "@/lib/db/index";

interface InvestBtnProps {
  text: string;
  textColor: string;
  hoverTextColor: string;
  bgColor: string;
  hoverBgColor: string;
  borderColor: string;
  hoverBorderColor: string;
  urlId: number;
  investorId: number;
  user: User;
  recentFunding: RaiseFunding;
}

const InvestBtn: React.FC<InvestBtnProps> = ({
  text,
  textColor,
  hoverTextColor,
  bgColor,
  hoverBgColor,
  borderColor,
  hoverBorderColor,
  urlId,
  investorId,
  user,
  recentFunding,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investor, setInvestor] = useState<{ investableAmount: number } | null>(
    null
  );
  const [amount, setAmount] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [stockPercentage, setStockPercentage] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestor = async () => {
      const data = await getInvestorById(investorId);
      setInvestor(data);
    };
    fetchInvestor();
  }, [investorId]);

  const handleInvestClick = async () => {
    try {
      const investorRequest = await getInvestorRequestById(investorId);
      if (user && user.roleId === 2 && investorRequest?.approval) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching investor request:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredAmount = parseFloat(event.target.value);
    setAmount(enteredAmount);

    if (enteredAmount && recentFunding.priceShare) {
      if (enteredAmount < recentFunding.minInvest) {
        setError(`Amount must be at least $${recentFunding.minInvest}.`);
        setStock("");
        setStockPercentage("");
        return;
      } else if (enteredAmount > recentFunding.maxInvest) {
        setError(`Amount must not exceed $${recentFunding.maxInvest}.`);
        setStock("");
        setStockPercentage("");
        return;
      } else if (investor && enteredAmount > investor.investableAmount) {
        setError(
          `You only have $${investor.investableAmount.toLocaleString()} available to invest.`
        );
        setStock("");
        setStockPercentage("");
        return;
      } else {
        setError(null);
        const calculatedStock = enteredAmount / recentFunding.priceShare;
        setStock(calculatedStock);

        const calculatedPercentage =
          (calculatedStock /
            (recentFunding.valuation / recentFunding.priceShare)) *
          100;
        setStockPercentage(calculatedPercentage);
      }
    } else {
      setStock("");
      setStockPercentage("");
    }
  };

  const handleInvestment = async () => {
    if (typeof amount === "number" && typeof stock === "number") {
      try {
        await addInvestmentRequest(investorId, recentFunding.id, amount, stock);
        closeModal();
      } catch (err) {
        console.error(err);
        setError("Failed to process the investment request. Please try again.");
      }
    } else {
      setError("Please enter a valid amount.");
    }
  };

  return (
    <div className="my-2 flex items-center justify-center">
      <Button
        onClick={handleInvestClick}
        className={`py-2 w-[170px] ${textColor} ${bgColor} ${borderColor} text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg`}
      >
        {text}
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[#D9D9D9] p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-lg text-black font-bold mb-4">
              Investment Form
            </h2>
            <p className="text-gray-700 mb-4">
              Available: ${" "}
              {investor?.investableAmount.toLocaleString() ?? "Loading..."}
            </p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Price Per Share:</label>
                <input
                  type="number"
                  disabled
                  value={recentFunding.priceShare}
                  className="w-full border-2 border-[#ffffff] rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Money Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full border-2 border-[#000000] rounded px-3 py-2 mt-1 bg-[#898989]"
                />
              </div>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <div className="mb-4">
                <label className="block text-gray-700">Share Amount:</label>
                <input
                  disabled
                  value={stock.toLocaleString() || ""}
                  className="w-full border-2 border-[#ffffff] rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Share Percentage:</label>
                <input
                  disabled
                  value={
                    stockPercentage ? `${stockPercentage.toFixed(3)}%` : ""
                  }
                  className="w-full border-2 border-[#ffffff] rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
                />
              </div>
              <div className="flex justify-end space-x-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`w-[100px] h-[50px] items-center justify-center text-[#423F3F] bg-[#AFAB9A] border-transparent text-center py-2 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#807D71] hover:text-white hover:border-transparent shadow-md hover:shadow-lg`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInvestment}
                  className={`w-[120px] h-[50px] items-center justify-center text-[#ffffff] bg-[#181A20] border-transparent text-center py-2 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#FF8a00] hover:text-white hover:border-transparent shadow-md hover:shadow-lg`}
                >
                  Invest In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestBtn;
