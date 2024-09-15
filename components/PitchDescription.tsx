import { PitchDescriptionProps } from "@/types";
import React from "react";

const PitchDescription = ({ label, desc }: PitchDescriptionProps) => {
  return (
    <div className="my-4 md:my-8">
      <div className="text-2xl md:text-4xl font-bold">{label}</div>
      <div className="w-[994px] my-2 md:my-4 text-white text-base md:text-xl">
        {desc}
      </div>
    </div>
  );
};

export default PitchDescription;
