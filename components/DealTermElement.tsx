import React from "react";

const DealTermElement = ({ data, label }: DealTermElementProps) => {
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="text-black text-3xl">{data}</div>
        <div className="text-[#423f3f] text-xl">{label}</div>
      </div>
      <div className="w-full border border-black my-3"></div>
    </div>
  );
};

export default DealTermElement;
