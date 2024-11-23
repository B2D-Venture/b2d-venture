import React from "react";
import { FaFire } from "react-icons/fa";

const DealTermElement = ({ data, label, type }: DealTermElementProps) => {
  return (
    <div className="px-2">
      <div className="flex items-center justify-between">
        {type === "deadline" && (
          <div className="flex items-center space-x-2">
            {typeof data === 'number' && data <= 30 ? (<FaFire className="text-red-500 text-4xl md:text-sm lg:text-lg xl:text-xl animate-pulse" />) : null}
            <span data-id={label} className="text-black dark:text-white text-4xl md:text-sm lg:text-lg xl:text-xl font-bold">{data}</span>
          </div>
        )}
        {type !== "deadline" && (
          <div data-id={label} className="text-black dark:text-white text-4xl md:text-sm lg:text-lg xl:text-xl font-bold">{data}</div>
        )}
        <div className="text-[#423f3f] dark:text-white md:text-[10px] lg:text-lg xl:text-xl font-semibold ml-4">{label}</div>
      </div>
      <div className="w-full border border-[#dcdcdc] my-1 md:my-1 lg:my-2 xl:my-3" />
    </div>
  );
};

export default DealTermElement;
