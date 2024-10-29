import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const CompanyLogoBoxLoading = () => {
  return (
    <div className="w-full pt-14 pl-7 grid grid-cols-4 gap-10">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="relative flex items-center p-4 rounded-lg shadow-lg bg-gray-200">
          <div className="ml-6 flex flex-col">
            <Skeleton className="w-full h-[80px] rounded-lg bg-gray-600" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompanyLogoBoxLoading;
