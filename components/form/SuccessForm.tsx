import React from "react";
import { motion, useMotionValue } from "framer-motion";
import VerifyAnimation from "../animation/VerifyAnimation";
import Link from "next/link";
import ShowStep from "@/components/form/ShowStepForm";
import { SuccessFormProps } from "@/types/form/index.d";


const SuccessForm = ({ role, hasApproval, roleIdNumber }: SuccessFormProps) => {
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
        <div data-id="label" className="text-center text-black text-4xl font-bold mb-4">
          {role === "Investor" ? "Submit Success" : "Created Success"}
        </div>

        {role === "Investor" ? (
          hasApproval === true ? (
            <div data-id="desc" className="text-center text-[#939191] text-2xl mb-8">
              Your information has been <span className="text-green-500">approved</span> successfully
            </div>
          ) : hasApproval === false ? (
            <div data-id="desc" className="text-center text-[#939191] text-2xl mb-8">
              Your information has been <span className="text-red-400">rejected</span> by admin
            </div>
          ) : (
            <div data-id="desc" className="text-center text-[#939191] text-2xl mb-8">
              <span className="text-yellow-600">Waiting</span> for admin approval of your information
            </div>
          )
        ) : null}

        <div className="w-full flex justify-center mt-8">
          <Link
            data-id="go-to-profile"
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
