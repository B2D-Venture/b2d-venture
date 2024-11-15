"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { MdErrorOutline } from "react-icons/md";
import { changeToViewerRole } from '@/lib/db/index';
import { User } from '@/types/user';

interface RejectShowProps {
    user: User;
}

const RejectShow: React.FC<RejectShowProps> = ({ user }) => {

    const changeRole = (email: string) => {
        changeToViewerRole(email);
        window.location.href = '/role-register';
    };

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 z-20 p-4">
            <div className="bg-[#ffffffe6] rounded-lg text-center p-8 shadow-lg border-4 border-[#FF6347]">
                <div className="flex justify-center mb-4">
                    <MdErrorOutline className="text-[#FF6347] text-[80px]" />
                </div>

                <h1 className="text-[42px] font-bold text-[#FF6347] mb-2">Account Creation Rejected</h1>

                <p className="text-[28px] text-[#A66E38]">
                    Please review the rejection notice sent to your email for further details.
                </p>

                <Button
                    onClick={() => changeRole(user.email)}
                    className="mt-4 px-6 py-3 bg-[#FF6347] text-white text-[20px] font-semibold rounded-lg hover:bg-[#ff7f60] focus:outline-none transition-all"
                >
                    Retry Role Registration
                </Button>
            </div>
        </div>
    );
};

export default RejectShow;
