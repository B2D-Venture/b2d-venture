"use client";

import Link from "next/link";
import Image from "next/image";
import { navbarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import MobileNav from "@/components/navbar/MobileNav";
import UserProfileOrSignInButton from "@/components/UserProfileOrSignInButton";
import { SessionProvider } from "next-auth/react";
import { ModeToggle } from "@/components/navbar/DarkMode";
import { useEffect, useState } from "react";

const Navbar = () => {
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
    <section className="navbar">
      <nav className="flex flex-col gap-4">
        <div className="w-full h-[100px] bg-[#d2d3db] dark:bg-black shadow flex items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo/b2d-logo.png"
                  width={60}
                  height={60}
                  alt="b2d logo"
                  className="b2d-logo"
                />
                <div className="text-black dark:text-navbarTitle text-xl font-bold">
                  B2D Venture
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {navbarLinks.map((link) => {
              const isActive =
                pathname === link.route ||
                pathname.startsWith(`${link.route}/`);

              if (
                link.route === "/role-register" &&
                (user?.roleId === 2 || user?.roleId === 3)
              ) {
                return null;
              }

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
            <SearchBar initialSearch="" classSearch="search-bar" />
            <SessionProvider>
              <UserProfileOrSignInButton />
            </SessionProvider>
            <div>
              <ModeToggle />
            </div>
          </div>
          <div className="text-xl p-3 lg:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
