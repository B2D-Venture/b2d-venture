import React from "react";
import { motion, useMotionValue } from "framer-motion";
import VerifyAnimation from "./VerifyAnimation";
import Link from "next/link";
import ShowStep from "@/components/ShowStepForm";
import { SuccessFormProps } from "@/types/form/index.d";


const SuccessForm = ({ role, hasApproval, roleIdNumber }: SuccessFormProps) => {
  console.log("SuccessForm: ", role, hasApproval, roleIdNumber);
  const progress = useMotionValue(90);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl text-left text-black dark:text-white text-5xl font-bold mb-12 mt-5">
        {role} Profile
      </div>

      <div className="bg-[#D9D9D9] rounded-[30px] shadow-lg p-8 max-w-7xl w-full max-h-7xl h-full">
        <div className="w-full flex justify-center mb-8">
          <ShowStep step={3} />
        </div>
        <div className="flex justify-center items-center mb-8">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 100 }}
            style={{ x: progress }}
            transition={{ duration: 1 }}
          />
          <VerifyAnimation progress={progress} />
        </div>
        <div className="text-center text-black text-4xl font-bold mb-4">
          {role === "Investor" ? "Submit Success" : "Created Success"}
        </div>

        {role === "Investor" ? (
          hasApproval === true ? (
            <div className="text-center text-[#939191] text-2xl mb-8">
              Your information has been approved successfully
            </div>
          ) : hasApproval === false ? (
            <div className="text-center text-[#939191] text-2xl mb-8">
              Your information has been rejected by admin
            </div>
          ) : (
            <div className="text-center text-[#939191] text-2xl mb-8">
              Waiting for admin approval of your information
            </div>
          )
        ) : null}

        <div className="w-full flex justify-center mt-8">
          <Link
            href={(role === "Investor") ? "/investor-profile" : (role === "Company") ? `/company/${roleIdNumber}` : "/"}
            className="w-[211px] h-[51px] bg-black text-white text-xl font-bold rounded-full text-center transition duration-300 hover:bg-gray-800 flex items-center justify-center"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessForm;
