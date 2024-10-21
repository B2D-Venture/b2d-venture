"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { navbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoPeopleCircleOutline } from "react-icons/io5";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="navbar w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <div className="text-navbarTitle">
            <RxHamburgerMenu />
          </div>
        </SheetTrigger>
        <SheetContent side="top" className="border-none bg-[#2B3129]">
          <Link
            href="/"
            className="mb-12 cursor-pointer flex items-center gap-1 px-4"
          >
            <Image
              src="/logo/b2d-logo.png"
              alt="b2d logo"
              width={60}
              height={60}
              className="b2d-logo"
            />
            <h1 className="text-3xl font-ibm-plex-serif font-bold text-navbarTitle">
              B2D Venture
            </h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                <button className="w-full h-[35px] bg-white rounded-[58px] flex items-center justify-center">
                  <div className="google-label">
                    <FcGoogle className="mr-3 text-lg" />
                    Sign in with Google
                  </div>
                  <div className="flex justify-center text-yellow-500 text-2xl">
                    <IoPeopleCircleOutline />
                  </div>
                </button>
                <div className="h-[45px] pl-6 pr-40 pt-2 pb-2 bg-white rounded-[60px] border-2 border-black flex items-center justify-between">
                  <span className="flex items-center text-placeholder">
                    <FaSearch className="mr-3" />
                    Search
                  </span>
                </div>
                {navbarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className="mobilenav-sheet_close w-[230px]"
                      >
                        <p
                          className={cn("mobile-nav", {
                            "!text-black bg-navbarTitle rounded-full p-3 w-full": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
