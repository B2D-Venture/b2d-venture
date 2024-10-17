"use client";
import React, { useEffect, useState } from 'react'

const getPercentage = (currentInvestAmount: number, fundingTarget: number) => {
    return Math.round((currentInvestAmount / fundingTarget) * 10000) / 100;
}

interface ProgressBarProps {
    currentInvestAmount: number;
    dayLeft: number;
    fundingTarget: number;
}

const ProgressBar = ({ currentInvestAmount, dayLeft, fundingTarget }: ProgressBarProps) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const finalPercentage = getPercentage(currentInvestAmount, fundingTarget);
        setTimeout(() => {
            setPercentage(finalPercentage);
        }, 100);
    }, [currentInvestAmount, fundingTarget]);

    const percentageBar = percentage < 10 ? 10 : percentage;

    return (
        <div className="w-full min-w-[300px] max-w-[1000px] mx-8 mt-4 md:mx-20">
            <div className="flex justify-between mb-1">
                <span className="text-sm md:text-base font-medium text-[#fcd535] dark:text-yellow-500">
                    {percentage}% - {dayLeft} Days Left
                </span>
                <span className="text-sm md:text-base font-medium text-[#fcd535] dark:text-white">
                    $ {fundingTarget?.toLocaleString()} Target
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-lg dark:bg-gray-700">
                <div
                    className="flex bg-yellow-400 h-6 text-sm font-medium text-black text-center p-0.5 leading-none rounded-lg justify-center items-center transition-all duration-1000 ease-out"
                    style={{ width: `${percentageBar}%` }}
                >
                    {currentInvestAmount.toLocaleString()} $
                </div>
            </div>
        </div>
    );
};


export default ProgressBar;