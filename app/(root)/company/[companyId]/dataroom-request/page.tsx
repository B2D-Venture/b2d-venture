"use client";
import React, { useState, useEffect } from "react";
import { approveDataRoomRequest, getDataRoomRequests, rejectDataRoomRequest } from "@/lib/db/dataroom";
import { getInvestorById } from "@/lib/db/investor";
import { DataRoomCard } from "@/components/company/dataroom/card/DataRoomCard";

interface dataroomRequest {
  id: number;
  companyId: number;
  investorId: number;
  requestDate: Date;
  approval: boolean | null;
}

const DataroomRequestPage = () => {
  const [dataroomData, setDataroomData] = useState<dataroomRequest[]>([]);

  const fetchData = async () => {
    try {
      const DataRoomRequests = await getDataRoomRequests();

      const DataRoomDetails = await Promise.all(
        DataRoomRequests.map(async (request) => {
          const inverstor = await getInvestorById(request.investorId);
          return {
            ...request,
            investor: inverstor,
          };
        })
      );

      setDataroomData(DataRoomDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="text-white flex flex-col items-center mt-10 space-y-4">
      {dataroomData.length > 0 &&
        dataroomData.map((DataRoomRequests, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <DataRoomCard
              logo={DataRoomRequests.investor.profileImage}
              investorName={
                DataRoomRequests.investor.firstName +
                " " +
                DataRoomRequests.investor.lastName
              }
              email={DataRoomRequests.investor.email}
              netWorth={DataRoomRequests.investor.networth}
              moneyReadyForInvestment={
                DataRoomRequests.investor.investableAmount
              }
              Nationality={DataRoomRequests.investor.nationality}
              handleApprove={async () => {
                await approveDataRoomRequest(DataRoomRequests.id);
                await delay(100);
                console.log("Approve");
                fetchData();
              }}
              handleReject={async () => {
                await rejectDataRoomRequest(DataRoomRequests.id);
                await delay(100);
                console.log("Reject");
                fetchData();
              }}
            />
          </div>
        ))}
      {/* Refresh Data Button */}
      <button
        onClick={fetchData}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh Data
      </button>

      <button
        onClick={() => {
          console.log(dataroomData);
        }}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Log Data to Console
      </button>
    </div>
  );
};

export default DataroomRequestPage;
