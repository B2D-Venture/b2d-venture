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
  const [existingInvestment, setExistingInvestment] = useState<number>(0);
  const [amount, setAmount] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [stockPercentage, setStockPercentage] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<{
    text: string;
    type: string;
  } | null>(null);

  const fetchInvestor = async () => {
    const data = await getInvestorById(investorId);
    setInvestor(data);
  };

  const fetchExistingInvestment = async () => {
    const existingRequest = await getInvestorRequestByInvestorandRaiseFunding(
      investorId,
      recentFunding.id
    );
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

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredAmount = parseFloat(event.target.value);
    setAmount(enteredAmount);

    const totalInvestment = existingInvestment + enteredAmount;

    if (enteredAmount && recentFunding.priceShare) {
      if (existingInvestment === 0 && enteredAmount < recentFunding.minInvest) {
        setError(
          `Amount must be at least $${recentFunding.minInvest} for the first investment.`
        );
        setStock("");
        setStockPercentage("");
        return;
      } else if (totalInvestment > recentFunding.maxInvest) {
        setError(
          `Total investment must not exceed $${recentFunding.maxInvest}.`
        );
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
      const newAmount = investor.investableAmount - amount;
      try {
        const existingRequest =
          await getInvestorRequestByInvestorandRaiseFunding(
            investorId,
            Number(recentFunding.id)
          );

        if (existingRequest) {
          await addAmount(
            investorId,
            Number(recentFunding.id),
            amount + existingRequest.amount,
            Number(stockPercentage) + existingRequest.getStock
          );
          setAlertMessage({
            text: "Investment amount updated successfully!",
            type: "existing",
          });
        } else {
          await addInvestmentRequest(
            investorId,
            Number(recentFunding.id),
            amount,
            Number(stockPercentage)
          );
          setAlertMessage({
            text: "New investment request added successfully!",
            type: "new",
          });
        }

        await UpdateInvestorAmount({ investorId, amount: newAmount });
        await fetchInvestor();
        await fetchExistingInvestment();
        closeModal();

        // Reset the amount, stock, and stockPercentage fields
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
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer); // Clear timeout if alertMessage changes
    }
  }, [alertMessage]);

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
              Available: $
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
          </div>
        </div>
      )}

      {alertMessage && (
        <div
          className={`fixed top-32 right-4 px-4 py-3 rounded-lg text-white shadow-md z-50 ${
            alertMessage.type === "new"
              ? "bg-yellow-400 border-t-4 border-yellow-500"
              : "bg-green-400 border-t-4 border-green-500"
          }`}
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-white mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">
                {alertMessage.type === "new"
                  ? "New Request Added!"
                  : "Request Updated!"}
              </p>
              <p className="text-sm">{alertMessage.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestBtn;
