"use client";

import { useFormState } from "./FormContext";
import ShowStep from "@/components/ShowStepForm";


const CompanyFormExample = () => {
  const { handleStepChange } = useFormState();
  return (
    <div className="text-white">CompanyFormExample
    <div className="w-full flex justify-center mb-8">
          <ShowStep step={2} />
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
  )
}

export default CompanyFormExample