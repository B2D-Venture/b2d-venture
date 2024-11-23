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
import { NoRequestCard } from "@/components/admin/NoRequestCard";
import SortRequestButton from "@/components/admin/SortRequestButton";

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
      setDataroomData(
        DataRoomDetails.filter(
          (detail) => detail !== undefined
        ) as dataroomRequest[]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [params.companyId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const user = await getUserByEmail(session.user.email);
          const companyRequest = await getCompanyRequestById(params.companyId);

          if (
            !isOwnCompany(Number(params.companyId), Number(user.roleIdNumber))
          ) {
            setNotfound(true);
          } else if (!companyRequest || companyRequest[0]?.approval !== true) {
            setNotfound(true);
          } else {
            await fetchData();
          }
        } catch (error) {
          console.error("Error during user fetch:", error);
          setNotfound(true);
        }
      } else {
        setNotfound(true);
      }
      setLoading(false);
    };

    if (status === "authenticated") {
      fetchUser();
    } else if (status === "unauthenticated") {
      setNotfound(true);
      setLoading(false);
    }
  }, [status, session, params.companyId, fetchData]);

  if (loading) {
    return <div></div>;
  }

  if (notfound) {
    return notFound();
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const sortRequests = (data: any[], order: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.requestDate).getTime();
      const dateB = new Date(b.requestDate).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedData = sortRequests(dataroomData, sortOrder);

  return (
    <div className="text-white flex flex-col items-center mt-10 space-y-4 mb-10">
      <SortRequestButton sortOrder={sortOrder} onSortChange={handleSortChange} />
      {sortedData.length === 0 ? (
        <NoRequestCard
          title="No Data Room Requests"
          description="You currently have no pending requests. Any new requests will appear here."
        />
      ) : (
        sortedData.length > 0 &&
        sortedData.map((dataRoomRequests, index) => (
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
