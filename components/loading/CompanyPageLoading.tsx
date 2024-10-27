import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";

const CompanyPageLoading = () => {
    return (
        <div className="grid grid-cols-2 gap-4
                        md:grid-cols-3
                        xl:grid-cols-4
                        2xl:grid-cols-5
                        3xl:grid-cols-6
                        4xl:grid-cols-7
                        5xl:grid-cols-9
                        6xl:grid-cols-11
                        7xl:grid-cols-12">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="flex-1">
                    <div className='flex justify-center items-center p-4'>
                        <Skeleton className="w-[270px] h-[378px] border-2 rounded-[20px]" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CompanyPageLoading