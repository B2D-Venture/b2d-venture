"use client";

import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Footer = () => {
    const pathname = usePathname();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch('/api/user');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        fetchCompany();
    }, []);
    return (
        <footer
            className="flex flex-col items-center bg-zinc-100 dark:bg-neutral-600 text-center">
            {!user && (
                <div className="container p-3">
                    <div className="">
                        <p className="flex items-center justify-center text-xs">
                            <span className="me-4">Register for free</span>
                            <Link href="/signup">
                                <button
                                    type="button"
                                    className="inline-block rounded-full border-2 dark:border-neutral-100 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normaltransition duration-150 ease-in-out hover:border-[#9f7b38] hover:text-[#9f7b38] focus:border-[#c19543] focus:text-[#aa8541] focus:outline-none focus:ring-0 active:border-[#9f7b38] active:text-[#9f7b38] dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light">
                                    Sign up!
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>
            )}


            <div className="w-full bg-black/20 dark:bg-neutral-700 p-4 text-center text-xs">
                © 2024 Copyright:
                <a href="/">B2D Venture</a>
            </div>
        </footer>
    )
}

export default Footer