import React from "react";
import { motion, useMotionValue } from "framer-motion";
import VerifyAnimation from "./VerifyAnimation";
import Link from "next/link";

const SuccessForm = () => {
  const progress = useMotionValue(90);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl text-left text-white text-5xl font-bold mb-12 mt-5">
        Investor Profile
      </div>

      <div className="bg-[#D9D9D9] rounded-lg shadow-lg p-8 max-w-7xl w-full max-h-7xl h-full">
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
          Submit Success
        </div>

        <div className="text-center text-[#939191] text-2xl mb-8">
          Waiting for admin approval of your information
        </div>

        <div className="w-full flex justify-center">
          <Link
            href="/profile"
            className="block w-[211px] h-[51px] bg-black text-white text-xl font-bold rounded-full text-center transition duration-300 hover:bg-gray-800 flex items-center justify-center"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessForm;
