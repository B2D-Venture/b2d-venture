"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getInvestorById, UpdateInvestorAmount } from "@/lib/db/investor";
import {
  addInvestmentRequest,
  getInvestorRequestById,
  getInvestorRequestByInvestorandRaiseFunding,
  addAmount,
} from "@/lib/db/index";
import { User } from "@/types/user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoWarning } from "react-icons/io5";

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
  currentInvestment: number;
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
  currentInvestment,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investor, setInvestor] = useState<{ investableAmount: number } | null>(
    null
  );
  const [existingInvestment, setExistingInvestment] = useState<number>(0);
  const [shareAmount, setShareAmount] = useState<number | "">("");
  const [moneyAmount, setMoneyAmount] = useState<number | "">("");
  const [stockPercentage, setStockPercentage] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<{
    text: string;
    type: string;
  } | null>(null);

  const fetchInvestor = useCallback(async () => {
    if (!investorId) return;
    const data = await getInvestorById(investorId);
    setInvestor(data);
  }, [investorId]);

  const fetchExistingInvestment = useCallback(async () => {
    if (!investorId || !recentFunding.id) return;

    const existingRequest = await getInvestorRequestByInvestorandRaiseFunding(
      investorId,
      Number(recentFunding.id)
    );
    setExistingInvestment(existingRequest?.amount || 0);
  }, [investorId, recentFunding.id]);

  useEffect(() => {
    fetchInvestor();
    fetchExistingInvestment();
  }, [fetchInvestor, fetchExistingInvestment]);

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

  const handleShareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;
    const enteredShares = parseInt(enteredValue, 10);

    if (isNaN(enteredShares) || enteredShares < 0) {
      setError("Please enter a valid positive integer.");
      setShareAmount("");
      setMoneyAmount("");
      setStockPercentage("");
      return;
    }

    setShareAmount(enteredShares);

    let maxInvest = 0;

    const currentMoreThanTarget =
      recentFunding.maxInvest * recentFunding.priceShare <
      recentFunding.fundingTarget * recentFunding.priceShare -
        currentInvestment*recentFunding.priceShare;

    if (recentFunding.priceShare && enteredShares > 0) {
      const calculatedMoneyAmount = enteredShares * recentFunding.priceShare;
      const totalInvestment = existingInvestment + calculatedMoneyAmount;
      const minInvest = recentFunding.minInvest * recentFunding.priceShare;
      if (currentMoreThanTarget) {
        maxInvest = recentFunding.maxInvest * recentFunding.priceShare;
      } else {
        maxInvest = (recentFunding.fundingTarget - currentInvestment)*recentFunding.priceShare;
      }

      if (investor && calculatedMoneyAmount > investor.investableAmount) {
        setError(
          `You only have $${investor.investableAmount.toLocaleString()} available to invest.`
        );
        setMoneyAmount("");
        setStockPercentage("");
        return;
      } else if (totalInvestment < minInvest) {
        setError(
          `Total investment must be more than ${
            recentFunding.minInvest
          } shares ($ ${(
            recentFunding.minInvest * recentFunding.priceShare
          ).toLocaleString()}).`
        );
        setMoneyAmount("");
        setStockPercentage("");
        return;
      } else if (totalInvestment > maxInvest) {
        if (!currentMoreThanTarget) {
          setError(
            `Total investment must not exceed ${
              (recentFunding.fundingTarget -
              currentInvestment)
            } shares ($ ${(
              (recentFunding.fundingTarget - currentInvestment)*recentFunding.priceShare
            ).toLocaleString()}).`
          );
        } else {
          setError(
            `Total investment must not exceed ${
              recentFunding.maxInvest
            } shares ($ ${(
              recentFunding.maxInvest * recentFunding.priceShare
            ).toLocaleString()}).`
          );
        }
        setMoneyAmount("");
        setStockPercentage("");
        return;
      } else {
        setError(null);
        setMoneyAmount(calculatedMoneyAmount);

        const calculatedPercentage =
          (enteredShares / recentFunding.totalShare) * 100;
        setStockPercentage(calculatedPercentage);
      }
    } else {
      setMoneyAmount("");
      setStockPercentage("");
    }
  };

  const handleInvestment = async () => {
    if (typeof moneyAmount === "number" && typeof shareAmount === "number") {
      if (!investor) {
        setError("Investor data is not available.");
        return;
      }
      const newAmount = investor.investableAmount - moneyAmount;
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
            shareAmount + existingRequest.amount,
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
            shareAmount,
            Number(stockPercentage),
            Number(recentFunding.priceShare)
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

        // Reset fields
        setShareAmount("");
        setMoneyAmount("");
        setStockPercentage("");
      } catch (err) {
        console.error(err);
        setError("Failed to process the investment request. Please try again.");
      }
    } else {
      setError("Please enter a valid number of shares.");
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

  const canInvest = new Date(recentFunding.deadline) < new Date();
  return (
    <div className="my-2 flex items-center justify-center">
      {canInvest ? (
        <Button
          onClick={handleInvestClick}
          className={`py-2 w-[170px] ${textColor} ${bgColor} ${borderColor} text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg`}
        >
          {text}
        </Button>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`py-2 w-[170px] ${textColor} ${bgColor} ${borderColor} text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg cursor-not-allowed`}
              >
                {text}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col items-center p-2 border border-red-500 bg-red-50 text-red-700 rounded-lg shadow-md">
                <div className="flex items-center">
                  <IoWarning className="text-xl mr-2" />
                  <p className="font-semibold">
                    You cannot invest at this time.
                  </p>
                </div>
                <p className="text-sm text-center">
                  This raise funding is fully funded. or the deadline has
                  passed.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
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
                  disabled
                  value={`${recentFunding.priceShare.toLocaleString()} $`}
                  className="w-full border-2 border-[#ffffff] rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Share Amount:</label>
                <input
                  type="number"
                  value={shareAmount}
                  onChange={handleShareChange}
                  className="w-full border-2 border-[#000000] rounded px-3 py-2 mt-1 bg-[#898989]"
                />
              </div>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <div className="mb-4">
                <label className="block text-gray-700">Money Amount:</label>
                <input
                  disabled
                  value={moneyAmount ? `${moneyAmount.toLocaleString()} $` : ""}
                  className="w-full border-2 border-[#ffffff] rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Share Percentage:</label>
                <input
                  disabled
                  value={
                    stockPercentage ? `${stockPercentage.toFixed(3)} %` : ""
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
                  className="w-[100px] h-[50px] items-center justify-center text-[#423F3F] bg-[#AFAB9A] border-transparent text-center py-2 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#807D71] hover:text-white hover:border-transparent shadow-md hover:shadow-lg"
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
          <div className="flex items-start">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-white mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-bold">
                {alertMessage.type === "new"
                  ? "New Request Added!"
                  : "Request Updated!"}
              </p>
              <p className="text-sm">{alertMessage.text}</p>
            </div>
            <button
              onClick={() => setAlertMessage(null)}
              className="text-white hover:text-gray-300 ml-4"
              aria-label="Dismiss"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestBtn;
