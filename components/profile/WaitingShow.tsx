import React from 'react'
import { AiOutlineClockCircle } from "react-icons/ai";

const WaitingShow = () => {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-20 p-4">
            <div className="bg-[#ffffffe6] rounded-lg text-center p-8 shadow-lg border-4 border-[#FABC3F]">
                {/* Centered Animated Icon */}
                <div className="flex justify-center mb-4 animate-bounce">
                    <AiOutlineClockCircle className="text-[#FFAD60] text-[80px]" />
                </div>

                <h1 data-id="request-label" className="text-[42px] font-bold text-[#FFAD60] mb-2">Not Approved Yet</h1>

                <p className="text-[28px] text-[#A66E38]">
                    Waiting for admin to approve your information...
                </p>
            </div>
        </div>
    )
}

export default WaitingShow;
