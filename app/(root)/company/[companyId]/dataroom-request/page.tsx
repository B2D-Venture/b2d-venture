"use client";
import React, { useState, useEffect } from "react";
import { approveDataRoomRequest, getDataRoomRequests, rejectDataRoomRequest } from "@/lib/db/dataroom";
import { getInvestorById, getCompanyById } from "@/lib/db/index";
import { DataRoomCard } from "@/components/company/dataroom/card/DataRoomCard";
import { InvestorProps } from "@/types/investor";
import { Company } from "@/types/company";

interface dataroomRequest {
  investor: InvestorProps;
  id: number;
  companyId: number;
  investorId: number;
  requestDate: Date;
  approval: boolean | null;
}

const sendEmailDataroomRequestStatus = async (dataroom: any, email: string, status: "approved" | "rejected", company: Company, investorProfile: string) => {
  try {
      const response = await fetch("/api/mail/dataroom", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              message: '',
              status,
              email,
              company,
              investorProfile,
          }),
      });

      if (response.ok) {
          console.log("Email sent successfully!");
      } else {
          const errorData = await response.json();
          console.error(`Error: ${errorData.message || "Failed to send email"}`);
      }
  } catch (error) {
      console.error("Error:", error);
  }
};

const DataroomRequestPage = () => {
  const [dataroomData, setDataroomData] = useState<dataroomRequest[]>([]);

  const fetchData = async () => {
    try {
      const dataRoomRequests = await getDataRoomRequests();

      const DataRoomDetails = await Promise.all(
        dataRoomRequests.map(async (request) => {
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
        dataroomData.map((dataRoomRequests, index) => (
          <div
            key={index}
            className="flex w-11/12 h-11/12 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[40px]"
          >
            <DataRoomCard
              investor={dataRoomRequests.investor}
              companyId={dataRoomRequests.companyId}
              handleApprove={async () => {
                await approveDataRoomRequest(dataRoomRequests.id);
                await delay(100);
                console.log("Approve");
                const company = await getCompanyById(dataRoomRequests.companyId);
                sendEmailDataroomRequestStatus(dataRoomRequests, dataRoomRequests.investor.email, "approved", company, dataRoomRequests.investor.profileImage);
                fetchData();
              }}
              handleReject={async () => {
                await rejectDataRoomRequest(dataRoomRequests.id);
                await delay(100);
                console.log("Reject");
                fetchData();
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default DataroomRequestPage;
