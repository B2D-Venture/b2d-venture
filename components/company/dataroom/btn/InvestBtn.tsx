"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getInvestorById } from "@/lib/db/investor";

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
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investor, setInvestor] = useState<{ investableAmount: number } | null>(null);

  useEffect(() => {
    const fetchInvestor = async () => {
      const data = await getInvestorById(investorId);
      setInvestor(data);
    };
    fetchInvestor();
  }, [investorId]);

  const handleInvestClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              Available: ${investor?.investableAmount ?? "Loading..."}
            </p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Price:</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount:</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Stock:</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-[#BFBFBF]"
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
