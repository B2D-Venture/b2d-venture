"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  getInvestorById,
  getCompanyById,
  getUser,
  getCompanyRequestById,
  approveDataRoomRequest,
  getCompanyDataRoomRequestsByCompany,
  rejectDataRoomRequest,
} from "@/lib/db/index";
import { DataRoomCard } from "@/components/company/dataroom/card/DataRoomCard";
import { InvestorProps } from "@/types/investor";
import { Company } from "@/types/company";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { FaList } from "react-icons/fa";

interface dataroomRequest {
  investor: InvestorProps;
  id: number;
  companyId: number;
  investorId: number;
  requestDate: Date;
  approval: boolean | null;
}

const isOwnCompany = (urlId: number, roleIdNumber: number) => {
  if (Number(roleIdNumber) == urlId) {
    return true;
  }
  return false;
};

const sendEmailDataroomRequestStatus = async (
  dataroom: any,
  email: string,
  status: "approved" | "rejected",
  company: Company,
  investorProfile: string
) => {
  try {
    const response = await fetch("/api/mail/dataroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "",
        status,
        email,
        company,
        investorProfile,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error: ${errorData.message || "Failed to send email"}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

async function getUserByEmail(email: string) {
  const user = await getUser(email);
  return user;
}

export default function DataroomRequestPage({
  params,
}: {
  params: { companyId: number };
}) {
  const { data: session, status } = useSession();

  const [dataroomData, setDataroomData] = useState<dataroomRequest[]>([]);
  const [notfound, setNotfound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const dataRoomRequests = await getCompanyDataRoomRequestsByCompany(
        params.companyId
      );
      const DataRoomDetails = await Promise.all(
        dataRoomRequests.map(async (request) => {
          if (request.investorId !== null) {
            const investor = await getInvestorById(request.investorId);
            return {
              ...request,
              investor: investor,
            };
          }
        })
      );
      setDataroomData(DataRoomDetails.filter((detail) => detail !== undefined) as dataroomRequest[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [params.companyId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const user = await getUserByEmail(session?.user?.email);
        const companyRequest = await getCompanyRequestById(params.companyId);

        if (
          !isOwnCompany(Number(params.companyId), Number(user.roleIdNumber))
        ) {
          setNotfound(true);
          setLoading(false);
        } else {
          if (!companyRequest || companyRequest[0]?.approval !== true) {
            setNotfound(true);
            setLoading(false);
          } else {
            fetchData();
            setLoading(false);
          }
        }
      } else {
        setNotfound(true);
        setLoading(false);
      }
    };

    fetchUser();
  }, [session, status, params.companyId, fetchData]);

  if (loading) {
    return <div></div>;
  }

  if (notfound) {
    return notFound();
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="text-white flex flex-col items-center mt-10 space-y-4 mb-10">
      {dataroomData.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-gray-700 dark:text-gray-300">
          <FaList className="mb-4 text-5xl text-gray-400 dark:text-gray-500" />
          <span className="text-2xl font-semibold mb-2">No Data Room Requests</span>
          <p className="text-gray-500 dark:text-gray-400">
            You currently have no pending requests. Any new requests will appear here.
          </p>
        </div>
      ) : (
        dataroomData.length > 0 &&
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
                const company = await getCompanyById(
                  dataRoomRequests.companyId
                );
                if (company) {
                  sendEmailDataroomRequestStatus(
                    dataRoomRequests,
                    dataRoomRequests.investor.email,
                    "approved",
                    company,
                    dataRoomRequests.investor.profileImage
                  );
                }
                fetchData();
              }}
              handleReject={async () => {
                await rejectDataRoomRequest(dataRoomRequests.id);
                await delay(100);
                fetchData();
              }}
            />
          </div>
        ))
      )}

    </div>
  );
}
