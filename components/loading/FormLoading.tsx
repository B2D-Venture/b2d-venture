import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'


const FormLoading = () => {
  return (
    <div className="space-y-8">
      <div className="w-full flex justify-center mb-6 rounded-lg">
        <Skeleton className='w-96 h-20 flex items-center text-black font-bold text-3xl bg-[#eeee] p-2 rounded-lg' />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1 flex flex-col items-center">
          <Skeleton className="w-24 h-24" />
          <Skeleton className="mt-3 w-full h-8" />
          <Skeleton className="mt-5 w-full h-16" />
        </div>
        <div className="grid grid-cols-3 gap-4 col-span-3">
          <Skeleton className="w-full h-40 col-span-3" />
          <Skeleton className="w-full h-10 col-span-2" />
          <Skeleton className="w-full h-10 col-span-1" />
          <Skeleton className="w-full h-10 col-span-1" />
          <Skeleton className="w-full h-10 col-span-1" />
          <Skeleton className="w-full h-10 col-span-1" />
          <Skeleton className="w-full h-10 col-span-1" />
          <Skeleton className="w-full h-10 col-span-1" />
          <Skeleton className="w-full h-24 col-span-3" />
        </div>
      </div>
    </div>
  )
}

export default FormLoading
