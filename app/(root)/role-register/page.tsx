"use client";

import RoleButton from "@/components/RoleButton";
import React, { useState } from "react";

const RoleRegister = () => {
  const [focusedRole, setFocusedRole] = useState<string | null>(null);
  const [hasClickRole, setHasClickRole] = useState<boolean>(false);

  const handleRoleClick = (role: string) => {
    setFocusedRole(role);
    setHasClickRole(true);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(24,26,32)] mt-12">
      <div className="w-[1085px] h-[847px] bg-[#d9d9d9] rounded-[30px] relative p-10">
        <div className="text-center text-black text-5xl font-bold">
          Please select your role
        </div>
        <div className="role-form-desc">
          Select your role Investor or Company. After selecting your role,
          submit the form, and we will guide you through the next steps.
        </div>
        <div className="flex justify-around mt-8">
          <RoleButton
            role="Investor"
            focusedRole={focusedRole}
            onClick={handleRoleClick}
          />
          <RoleButton
            role="Company"
            focusedRole={focusedRole}
            onClick={handleRoleClick}
          />
        </div>
        <div className="grid justify-items-center">
          <button className={`submit-role-btn ${hasClickRole ? "cursor-pointer bg-[#878788]" : "cursor-not-allowed bg-[#adafb4] hover:bg-[#8a8b8f]"}`}>
            Confirm {hasClickRole}
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
