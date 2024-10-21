import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const FormSubmitLoading = () => {
    return (
        <div className="w-full h-[600px] flex flex-col items-center">
            <div className="w-full max-w-7xl text-left">
                <Skeleton className="w-1/4 h-8 mb-12 mt-5 rounded-[30px]" />
            </div>

            <div className="bg-[#D9D9D9] rounded-xl shadow-lg p-8 max-w-7xl w-full max-h-7xl h-full">
                <div className="w-full flex justify-center mb-8">
                    <Skeleton className="w-[562px] h-[72px] rounded-xl" />
                </div>
                <div className="flex justify-center items-center mb-8">
                    <Skeleton className="w-[300px] h-[300px] rounded-xl" />
                </div>
            </div>
        </div>
    )
}

export default FormSubmitLoading