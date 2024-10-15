import React from 'react'

const getPercentage = (currentInvestAmount: number, fundingTarget: number) => {
    return Math.round((currentInvestAmount / fundingTarget) * 10000) / 100
}

const ProgressBar = ({ currentInvestAmount, dayLeft, fundingTarget }: ProgressBarProps) => {
    const percentage = getPercentage(currentInvestAmount, fundingTarget)
    return (
        <div className="w-full min-w-[300px] max-w-[1000px] mx-8 mt-4 md:mx-20">
            <div className="flex justify-between mb-1">
                <span className="text-sm md:text-base font-medium text-[#fcd535] dark:text-yellow-500">
                    {percentage}% - {dayLeft} days left
                </span>
                <span className="text-sm md:text-base font-medium text-[#fcd535] dark:text-white">
                    $ {fundingTarget?.toLocaleString()} target
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="flex bg-yellow-400 h-6 text-sm font-medium text-black text-center p-0.5 leading-none rounded-full justify-center items-center" style={{ width: `${percentage}%` }}> {currentInvestAmount.toLocaleString()} $</div>
            </div>
        </div>
    )
}

export default ProgressBar