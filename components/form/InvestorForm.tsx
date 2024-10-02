"use client";

import { useFormState } from "../FormContext";
import ShowStep from "@/components/ShowStepForm";

import { InvestorRegisterForm } from "@/components/InvestorRegisterForm";

export default function InvestorForm() {
  const { handleStepChange } = useFormState();
  return (
    <div>
      <div className="text-white">
        <div className="w-full flex justify-center mb-8">
          <ShowStep step={2} />
        </div>
        <button
          onClick={() => handleStepChange(-1)}
          className="w-[211px] h-[51px] text-center bg-white text-black text-base font-bold"
        >
          Back
        </button>
        <button
          onClick={() => handleStepChange(2)}
          className="w-[211px] h-[51px] text-center bg-white text-black text-base font-bold"
        >
          Submit
        </button>
      </div>
      <div className="flex flex-col items-center min-h-screen mt-7">
        <div className="flex w-11/12 h-9/10">
          <h1 className="self-start text-white ml-70 text-[40px] font-bold mb-2">
            Investor Profile
          </h1>
        </div>
        <div className="flex w-11/12 h-9/10 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[57px]">
          <InvestorRegisterForm />
        </div>
      </div>
    </div>
  );
}
