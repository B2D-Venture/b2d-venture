import React from "react";
import { FaFire } from "react-icons/fa";

const DealTermElement = ({ data, label, type }: DealTermElementProps) => {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        {type === "deadline" && (
          <div className="flex items-center space-x-2">
            {typeof data === 'number' && data <= 30 ? (<FaFire className="text-red-500 text-3xl animate-pulse" />) : null}
            <span className="text-black text-4xl font-bold">{data}</span>
          </div>
        )}
        {type !== "deadline" && (
          <div className="text-black text-4xl font-bold">{data}</div>
        )}
        <div className="text-[#423f3f] text-lg font-semibold ml-4">{label}</div>
      </div>
      <div className="w-full border border-[#dcdcdc] my-3" />
    </div>
  );
};

export default DealTermElement;
