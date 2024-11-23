"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  addDataRoomRequest,
  getCompanyDataRoomRequestsByCompanyAndInvestor,
  getInvestorRequestById,
} from "@/lib/db/index";
import { User } from "@/types/user";

const RequestBtn = ({
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
  user: User;
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const requestBtn = async () => {
    if (user) {
      const investorRequest = await getInvestorRequestById(investorId);
      if (user.roleId === 2 && investorRequest?.approval) {
        try {
          const requests = await getCompanyDataRoomRequestsByCompanyAndInvestor(
            urlId,
            investorId
          );
          const last_request = requests.at(-1);

          if (last_request && last_request.approval === null) {
            setIsPopupVisible(true);
            return;
          } else {
            await addDataRoomRequest(urlId, investorId);
            setIsAlertVisible(true); // Show alert box
            setTimeout(() => setIsAlertVisible(false), 3000); // Hide after 3 seconds
          }
        } catch (error) {
          console.error("Failed to retrieve or add data room requests:", error);
        }
      }
    }
  };

  return (
    <div className="my-2 flex items-center justify-center">
      <Button
        data-id="request-data-room"
        onClick={() => {
          requestBtn();
        }}
        className={`py-2 w-[170px] ${textColor} ${bgColor} ${borderColor} text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${hoverBgColor} ${hoverTextColor} hover:${hoverBorderColor} shadow-md hover:shadow-lg`}
      >
        {text}
      </Button>

      {/* Popup if request already sent */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg text-center text-black">
            <p>Request already sent</p>
            <Button onClick={() => setIsPopupVisible(false)} className="mt-2">
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Alert box for successful addDataRoomRequest */}
      {isAlertVisible && (
        <div
          className="fixed top-32 right-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md z-50"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Request successfully added!</p>
              <p className="text-sm">
                Your request has been processed successfully.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestBtn;
