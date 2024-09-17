"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { investorProfileExample } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export function InvestorProfileCard() {
  const investorData: InvestorProfileCardProps = investorProfileExample;

  const [showNationalId, setShowNationalId] = useState(false);

  // Function to toggle visibility
  const toggleNationalIdVisibility = () => {
    setShowNationalId(!showNationalId);
  };

  // Mask the National ID
  const maskedNationalId = investorData.nationalIdCard.replace(
    /\d(?=\d{0})/g,
    "*",
  );

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 flex flex-col items-center">
          <div className="w-40 h-40 max-sm:w-20 max-sm:h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-center">
            <Image
              id="example-profile-image"
              src={investorData.profileImage}
              width={200}
              height={250}
              alt="Example Profile Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 col-span-4 text-white">
          {/* First Name */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">First Name</Label>
            <Input
              className="bg-[#bfbfbf]"
              disabled
              value={investorData.firstName}
            />
          </div>
          {/* Last Name */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">Last Name</Label>
            <Input
              className="bg-[#bfbfbf]"
              disabled
              value={investorData.lastName}
            />
          </div>
          {/* National ID Card */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">National ID Card</Label>
            <div className="relative">
              <Input
                className="bg-[#bfbfbf] w-full"
                disabled
                value={
                  showNationalId
                    ? investorData.nationalIdCard
                    : maskedNationalId
                }
              />
              <button
                onClick={toggleNationalIdVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showNationalId ? <IoEyeOutline /> : <IoEyeOffOutline />}{" "}
              </button>
            </div>
          </div>
          {/* Birthdate */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">Birthdate</Label>
            <Input
              className="bg-[#bfbfbf]"
              disabled
              value={investorData.birthdate}
            />
          </div>
          {/* Email Address */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">Email Address</Label>
            <Input
              className="bg-[#bfbfbf]"
              disabled
              value={investorData.emailAddress}
            />
          </div>
          {/* Nationality */}
          <div className="col-span-1 space-y-2">
            <Label className="text-[20px]">Nationality</Label>
            <Input
              className="bg-[#bfbfbf]"
              disabled
              value={investorData.lastName}
            />
          </div>
          {/* Net Worth */}
          <div className="col-span-1 space-y-2">
            <Label className="text-[20px]">Net Worth</Label>
            <Input
              className="bg-[#bfbfbf]"
              disabled
              value={investorData.lastName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
