"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvestorProfileCardProps } from "@/types/investor/index";
import Image from "next/image";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";


export function InvestorProfileCard({ investor }: InvestorProfileCardProps) {
  const [showNationalId, setShowNationalId] = useState(false);

  // Function to toggle visibility
  const toggleNationalIdVisibility = () => {
    setShowNationalId(!showNationalId);
  };

  // Mask the National ID
  const maskedNationalId = investor.nationalId.replace(
    /\d(?=\d{0})/g,
    "*",
  );

  const formattedNetWorth = new Intl.NumberFormat().format(
    investor.networth,
  );

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-5 gap-4">
        <div className="cor-span-1 flex flex-col justify-center items-center">
          <div className="w-56 h-56 max-sm:w-24 max-sm:h-24 border-2 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-center">
          <Image
              id="example-profile-image"
              src={investor.profileImage}
              width={300}
              height={350}
              alt="Example Profile Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 col-span-4 text-black dark:text-white">
          {/* First Name */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">First Name</Label>
            <Input
              className="font-bold border-black dark:border-white disabled:opacity-100"
              disabled
              value={investor.firstName}
            />
          </div>
          {/* Last Name */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">Last Name</Label>
            <Input
              className="font-bold border-black dark:border-white disabled:opacity-100"
              disabled
              value={investor.lastName}
            />
          </div>
          {/* National ID Card */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">National ID Card</Label>
            <div className="relative">
              <Input
                className="font-bold border-black dark:border-white disabled:opacity-100"
                disabled
                value={
                  showNationalId
                    ? investor.nationalId
                    : maskedNationalId
                }
              />
              <button
                onClick={toggleNationalIdVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-white"
              >
                {showNationalId ? <IoEyeOutline /> : <IoEyeOffOutline />}{" "}
              </button>
            </div>
          </div>
          {/* Birthdate */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">Birthdate</Label>
            <Input
              className="font-bold border-black dark:border-white disabled:opacity-100"
              disabled
              value={investor.birthDate}
            />
          </div>
          {/* Email Address */}
          <div className="col-span-2 space-y-2">
            <Label className="text-[20px]">Email Address</Label>
            <Input
              className="font-bold border-black dark:border-white disabled:opacity-100"
              disabled
              value={investor.email}
            />
          </div>
          {/* Nationality */}
          <div className="col-span-1 space-y-2">
            <Label className="text-[20px]">Nationality</Label>
            <Input
              className="font-bold border-black dark:border-white disabled:opacity-100"
              disabled
              value={investor.nationality}
            />
          </div>
          {/* Net Worth */}
          <div className="col-span-1 space-y-2">
            <Label className="text-[20px]">Net Worth</Label>
            <div className="relative">
              <Input
                className="font-bold border-black dark:border-white disabled:opacity-100"
                disabled
                value={formattedNetWorth}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-white">
                {"$"}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
