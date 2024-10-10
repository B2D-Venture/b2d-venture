import React from "react";

const ShowStep = ({ step }: { step: number }) => {
  return (
    <div className="bg-[#EEEEEE] p-4 rounded-lg">
      <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        <li className={`flex items-center space-x-2.5 rtl:space-x-reverse ${step >= 1 ? 'text-black' : 'text-gray-400'}`}>
          <span className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${step >= 1 ? 'bg-black border-black' : 'border-gray-500'}`}>
            <span className={`${step >= 1 ? 'text-white' : 'text-gray-400'}`}>1</span>
          </span>
          <span>
            <h3 className="font-bold leading-tight">Role Info</h3>
            <p className="text-sm">Select Your Role</p>
          </span>
        </li>
        <li className={`flex items-center space-x-2.5 rtl:space-x-reverse ${step >= 2 ? 'text-black font-bold' : 'text-gray-400'}`}>
          <span className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${step >= 2 ? 'bg-black border-black' :  'border-gray-500'}`}>
            <span className={`${step >= 2 ? 'text-white' : 'text-gray-400'}`}>2</span>
          </span>
          <span>
            <h3 className="font-bold leading-tight">Form Info</h3>
            <p className="text-sm">Fill Out Information</p>
          </span>
        </li>
        <li className={`flex items-center space-x-2.5 rtl:space-x-reverse ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
          <span className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${step >= 3 ? 'bg-black border-black' : 'border-gray-500'}`}>
            <span className={`${step >= 3 ? 'text-white' : 'text-gray-400'}`}>3</span>
          </span>
          <span>
            <h3 className="font-bold leading-tight">Approval</h3>
            <p className="text-sm">Pending Review</p>
          </span>
        </li>
      </ol>
    </div>
  );
};

export default ShowStep;
