"use client";

import Link from "next/link";
import Image from "next/image";
import { navbarLinks } from "@/constants";
import { FaSearch } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav>
      <div className="w-full h-[100px] bg-black shadow flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/logo/b2d-logo.png"
                width={60}
                height={60}
                alt="b2d logo"
                className="rounded-full m-3"
              />
              <div className="text-navbarTitle text-xl font-bold">
                B2D Venture
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {navbarLinks.map((link) => {
            const isActive =
              pathname === link.route || pathname.startsWith(`${link.route}/`);
            return (
              <Link key={link.route} href={link.route}>
                <div
                  className={cn(
                    "navbar-link",
                    isActive && "navbar-link-active"
                  )}
                >
                  {link.label}
                </div>
              </Link>
            );
          })}
          <div className="w-[350px] h-[45px] pl-6 pr-[166.50px] pt-[7px] pb-[6.50px] bg-white rounded-[60px] border-2 border-black flex items-center justify-between">
            <span className="flex items-center text-placeholder">
              <FaSearch className="mr-3" />
              Search
            </span>
          </div>
          <button className="w-[206px] h-[35px] bg-white rounded-[58px] flex items-center justify-center gap-[14.50px]">
            <div className="flex items-center text-center text-black text-xs font-normal font-['Inter']">
              <FcGoogle className="mr-3 text-lg" />
              Sign in with Google
            </div>
            <div className="flex justify-center text-yellow-500 text-2xl">
              <IoPeopleCircleOutline />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
