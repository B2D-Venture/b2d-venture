import React from "react";

const ShowStep = ({ step }: { step: number }) => {
  return (
    <div>
      <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        <li className={`flex items-center space-x-2.5 rtl:space-x-reverse ${step >= 1 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${step >= 1 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            1
          </span>
          <span>
            <h3 className="font-medium leading-tight">Role Info</h3>
            <p className="text-sm">Select Your Role</p>
          </span>
        </li>
        <li className={`flex items-center space-x-2.5 rtl:space-x-reverse ${step >= 2 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${step >= 2 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            2
          </span>
          <span>
            <h3 className="font-medium leading-tight">Form Info</h3>
            <p className="text-sm">Fill Out Information</p>
          </span>
        </li>
        <li className={`flex items-center space-x-2.5 rtl:space-x-reverse ${step >= 3 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
          <span className={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0 ${step >= 3 ? 'border-blue-600 dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'}`}>
            3
          </span>
          <span>
            <h3 className="font-medium leading-tight">Approval</h3>
            <p className="text-sm">Pending Review</p>
          </span>
        </li>
      </ol>
    </div>
  );
};

export default ShowStep;
