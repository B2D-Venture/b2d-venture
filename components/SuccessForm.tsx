import React from "react";
import { motion, useMotionValue } from "framer-motion";

const SuccessForm = () => {  
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl text-left text-white text-5xl font-bold mb-12">
        Investor Profile
      </div>

      <div className="bg-[#D9D9D9] rounded-lg shadow-lg p-8 max-w-7xl w-full max-h-7xl h-full">
        <div className="text-center text-black text-4xl font-bold mb-4">
          Submit Success
        </div>

        <div className="text-center text-[#939191] text-2xl mb-8">
          Waiting for admin approval of your information
        </div>

        <div className="w-full flex justify-center">
          <button className="w-[211px] h-[51px] bg-black text-white text-xl font-bold rounded-full transition duration-300 hover:bg-gray-800">
            Go to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessForm;
