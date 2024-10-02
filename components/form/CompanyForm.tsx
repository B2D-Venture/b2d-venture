"use client";

import { useFormState } from "../FormContext";
import ShowStep from "@/components/ShowStepForm";

import { CompanyRegisterForm } from "@/components/CompanyRegisterForm";

export default function CompanyForm() {
  const { handleStepChange } = useFormState();
  return (
    <div>
      <div className="w-full flex justify-center mb-8">
        <ShowStep step={2} />
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex w-11/12 h-9/10">
          <h1 className="self-start text-white ml-70 text-[40px] font-bold mt-5 mb-3">Company Profile</h1>
        </div>
        <div className="flex w-11/12 h-9/10 bg-[#D9D9D9] rounded-[10px] justify-center items-center p-[57px]">
          <CompanyRegisterForm />
        </div>
      </div>
      <button
        onClick={() => handleStepChange(-2)}
        className="w-[211px] h-[51px] text-center bg-white text-black text-base font-bold"
      >
        Back
      </button>
      <button
        onClick={() => handleStepChange(1)}
        className="w-[211px] h-[51px] text-center bg-white text-black text-base font-bold"
      >
        Submit
      </button>
    </div>
  );
}
