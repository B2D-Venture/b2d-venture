"use client";
import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    addCompanyRequest,
    addRaiseFundingRequest,
} from "@/lib/db/index";


interface PublishFormProps {
    companyId: number;
    raiseId: number;
}

const PublishForm = ({
    companyId,
    raiseId
}: PublishFormProps) => {
    const publishCompany = () => {
        addCompanyRequest({ companyId: companyId });
        addRaiseFundingRequest({ raiseFundingId: raiseId })
        window.location.reload();
    };

    return (
        <div className="sticky top-36 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1f1f1f] dark:to-[#2b2b2b] md:m-5 md:rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
            <div className="mb-8">
                <h2 className="text-gray-800 dark:text-white text-3xl font-extrabold text-center">
                    Publish on Website
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
                    Share your content with the world in just one click.
                </p>
            </div>

            <div className="flex justify-center mt-8">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex justify-between w-full'>
                            <Button
                                className="flex items-center justify-center bg-[#4A628A] hover:bg-[#7AB2D3] text-white font-semibold px-6 py-5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                <Link href={`/company/${companyId}/edit`}>Edit Details</Link>
                            </Button>
                            <Button
                                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-5 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                <FaPaperPlane className="mr-2 text-lg animate-bounce" />
                                Publish
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px] bg-white dark:bg-[#2b2b2b] rounded-xl p-6 shadow-xl transform transition-all duration-300 ease-out">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                                Confirm Publish
                            </DialogTitle>
                            <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
                                Publishing your content will make it visible to everyone on the website. <b>Please ensure all details are final</b>, as <b>changes cannot be made afterward</b>.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex justify-center">
                            <Button
                                type="submit"
                                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
                                onClick={publishCompany}
                            >
                                <FaPaperPlane className="mr-2 animate-bounce" />
                                Publish
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}

export default PublishForm