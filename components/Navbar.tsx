"use client";

import Link from "next/link";
import Image from "next/image";
import { navbarLinks } from "@/constants";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileNav from "@/components/MobileNav";
import UserProfileOrSignInButton from "@/components/UserProfileOrSignInButton"; // Import the component
import { SessionProvider } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  
  return (
    <section className="navbar">
      <nav className="flex flex-col gap-4">
        <div className="w-full h-[100px] bg-black shadow flex items-center justify-between px-4">
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
                <div className="text-navbarTitle text-xl font-bold">
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
            <div className="search-bar">
              <span className="flex items-center text-placeholder">
                <FaSearch className="mr-3" />
                Search
              </span>
            </div>
            {/* Show either sign-in button or user profile based on authentication status */}
            <SessionProvider>
            <UserProfileOrSignInButton />
            </SessionProvider>
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

// components/Navbar.tsx
// "use client";  // Ensure this is a client component

// import Link from "next/link";
// import Image from "next/image";
// import { navbarLinks } from "@/constants";
// import { FaSearch } from "react-icons/fa";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import MobileNav from "@/components/MobileNav";
// import UserProfileOrSignInButton from "./UserProfileOrSignInButton";

// const Navbar = () => {
//   const pathname = usePathname();
//   return (
//     <section className="navbar">
//       <nav className="flex flex-col gap-4">
//         <div className="w-full h-[100px] bg-black shadow flex items-center justify-between px-4">
//           <div className="flex items-center gap-6">
//             <Link href="/">
//               <div className="flex items-center">
//                 <Image
//                   src="/logo/b2d-logo.png"
//                   width={60}
//                   height={60}
//                   alt="b2d logo"
//                   className="b2d-logo"
//                 />
//                 <div className="text-navbarTitle text-xl font-bold">
//                   B2D Venture
//                 </div>
//               </div>
//             </Link>
//           </div>
//           <div className="flex items-center gap-6">
//             {navbarLinks.map((link) => {
//               const isActive =
//                 pathname === link.route ||
//                 pathname.startsWith(`${link.route}/`);
//               return (
//                 <Link key={link.route} href={link.route}>
//                   <div
//                     className={cn(
//                       "navbar-link",
//                       isActive && "navbar-link-active"
//                     )}
//                   >
//                     {link.label}
//                   </div>
//                 </Link>
//               );
//             })}
//             <div className="search-bar">
//               <span className="flex items-center text-placeholder">
//                 <FaSearch className="mr-3" />
//                 Search
//               </span>
//             </div>
//             <UserProfileOrSignInButton />
//           </div>
//           <div className="text-xl p-3 lg:hidden">
//             <MobileNav />
//           </div>
//         </div>
//       </nav>
//     </section>
//   );
// };

// export default Navbar;

