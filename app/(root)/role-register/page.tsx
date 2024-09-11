import RoleButton from "@/components/RoleButton";
import React from "react";
// import {
//   PiBuildingsBold,
//   PiBuildingsFill,
//   PiUserListBold,
//   PiUserListFill,
// } from "react-icons/pi";

const RoleRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(24,26,32)] mt-12">
      <div className="w-[1085px] h-[847px] bg-[#d9d9d9] rounded-[30px] relative p-10">
        <div className="text-center text-black text-5xl font-bold">
          Please select your role
        </div>
        <div className="text-center text-[#393737] text-xl font-bold mt-5">
          Select your role Investor or Company. After selecting your role,
          submit the form, and we will guide you through the next steps.
        </div>
        <div className="flex justify-around mt-8">
          <RoleButton role="Investor" />
          <RoleButton role="Company" />
        </div>
        <div className="grid justify-items-center">
          <button className="bg-[#181a20] rounded-[10px] w-40 h-10 mt-10 text-center text-white text-2xl font-bold hover:bg-[#33363e]">
            Confirm
          </button>
        </div>
        <div className="flex justify-center items-center mt-10 space-x-4">
          <div className="w-[21px] h-[21px] bg-[#d7c20b] rounded-full"></div>
          <div className="w-[21px] h-[21px] bg-[#bdbdbb] rounded-full"></div>
          <div className="w-[21px] h-[21px] bg-[#bdbdbb] rounded-full"></div>
        </div>
        <div className="text-center text-white text-sm font-normal font-['Inter'] mt-10">
          copyright ©2024. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default RoleRegister;
