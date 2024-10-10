"use client";

import ShowStep from "@/components/ShowStepForm";

import { InvestorRegisterForm } from "@/components/InvestorRegisterForm";

export default function InvestorForm() {
  return (
    <div>
      <div className="text-white">
      </div>
      <div className="flex flex-col items-center min-h-screen mt-7">
        <div className="flex w-11/12 h-9/10">
          <h1 className="self-start text-white ml-70 text-[40px] font-bold mb-2">
            Investor Profile
          </h1>
        </div>

        <div className="bg-[#d9d9d9] rounded-[30px] relative p-10 mt-5 w-full max-w-7xl">
          <div className="w-full flex justify-center mb-8">
            <ShowStep step={2} />
          </div>
          <InvestorRegisterForm />
        </div>
      </div>
    </div>
  );
}
