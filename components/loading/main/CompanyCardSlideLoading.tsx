import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

const CompanyCardSlideLoading = () => {
    return (
        <div className="overflow-x-auto whitespace-nowrap py-4">
            <div className="inline-flex">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex-1">
                        <div className='flex justify-center items-center p-4'>
                            <Skeleton className="w-[270px] h-[378px] border-2 rounded-[20px] shadow-lg bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompanyCardSlideLoading