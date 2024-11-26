"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getInvestorById, UpdateInvestorAmount } from "@/lib/db/investor";
import {
  addInvestmentRequest,
  getInvestorRequestById,
  getInvestorRequestByInvestorandRaiseFunding,
  addAmount,
} from "@/lib/db/index";
import { User } from "@/types/user";

interface PrivateOfferBtnProps {
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

const PrivateOfferBtn: React.FC<PrivateOfferBtnProps> = ({
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
  const [investor, setInvestor] = useState<{ investableAmount: number } | null>(null);
  const [existingInvestment, setExistingInvestment] = useState<number>(0);
  const [amount, setAmount] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [stockPercentage, setStockPercentage] = useState<number | "">("");
  const [pricePerShare, setPricePerShare] = useState<number | "">(recentFunding.priceShare || "");
  const [error, setError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<{ text: string; type: string } | null>(null);

  const fetchInvestor = async () => {
    const data = await getInvestorById(investorId);
    setInvestor(data);
  };

  const fetchExistingInvestment = async () => {
    const existingRequest = await getInvestorRequestByInvestorandRaiseFunding(investorId, Number(recentFunding.id));
    setExistingInvestment(existingRequest?.amount || 0);
  };

  useEffect(() => {
    fetchInvestor();
    fetchExistingInvestment();
  }, [investorId, recentFunding.id]);

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

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    setPricePerShare(numericValue === "" ? "" : parseFloat(numericValue));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    setAmount(numericValue === "" ? "" : parseFloat(numericValue));

    const enteredAmount = parseFloat(numericValue);
    if (!isNaN(enteredAmount)) {
      const totalInvestment = existingInvestment + enteredAmount;

      if (enteredAmount && pricePerShare) {
        if (investor && enteredAmount > investor.investableAmount) {
          setError(`You only have $${investor.investableAmount.toLocaleString()} available to invest.`);
          setStock("");
          setStockPercentage("");
          return;
        } else {
          setError(null);
          const calculatedStock = enteredAmount / pricePerShare;
          setStock(calculatedStock);

          const calculatedPercentage = (calculatedStock / (recentFunding.valuation / pricePerShare)) * 100;
          setStockPercentage(calculatedPercentage);
        }
      }
    } else {
      setError("Please enter a valid amount.");
      setStock("");
      setStockPercentage("");
    }
  };

  const handleInvestment = async () => {
    if (typeof amount === "number" && typeof stock === "number" && investor) {
      const newAmount = investor.investableAmount - amount;
      try {
        const existingRequest = await getInvestorRequestByInvestorandRaiseFunding(investorId, Number(recentFunding.id));
        if (existingRequest) {
          await addAmount(investorId, Number(recentFunding.id), amount + existingRequest.amount, Number(stockPercentage) + existingRequest.getStock);
          setAlertMessage({ text: "Investment amount updated successfully!", type: "existing" });
        } else {
          await addInvestmentRequest(investorId, Number(recentFunding.id), amount, Number(stockPercentage), Number(pricePerShare));
          setAlertMessage({ text: "New investment request added successfully!", type: "new" });
        }

        await UpdateInvestorAmount({ investorId, amount: newAmount });
        await fetchInvestor();
        await fetchExistingInvestment();
        closeModal();

        setAmount("");
        setStock("");
        setStockPercentage("");
      } catch (err) {
        console.error(err);
        setError("Failed to process the investment request. Please try again.");
      }
    } else {
      setError("Please enter a valid amount.");
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <div className="my-2 flex items-center justify-center">
      <Button
        onClick={handleInvestClick}
        className={`py-2 w-[170px] sm:w-[360px] ${textColor} ${bgColor} ${borderColor} text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg`}
      >
        {text}
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[#D9D9D9] p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-lg text-black font-bold mb-4">Investment Form</h2>
            <p className="text-gray-700 mb-4">
              Available: ${investor?.investableAmount.toLocaleString() ?? "Loading..."}
            </p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Price Per Share:</label>
                <input
                  type="number"
                  value={pricePerShare}
                  onChange={handlePriceChange}
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
                  value={stockPercentage ? `${stockPercentage.toFixed(3)}%` : ""}
                  className="w-full border-2 border-[#ffffff] rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
                />
              </div>
              <div className="flex justify-end space-x-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-[100px] h-[50px] items-center justify-center text-[#423F3F] bg-[#AFAB9A] border-transparent text-center py-2 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#807D71] hover:text-white hover:border-transparent shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInvestment}
                  className="w-[120px] h-[50px] items-center justify-center text-[#ffffff] bg-[#181A20] border-transparent text-center py-2 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#080809] hover:text-[#F7ECDC] hover:border-transparent shadow-md hover:shadow-lg"
                >
                  Invest
                </button>
              </div>
            </form>
            {alertMessage && (
              <p className={`mt-4 ${alertMessage.type === "new" ? "text-green-600" : "text-yellow-600"}`}>
                {alertMessage.text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateOfferBtn;
