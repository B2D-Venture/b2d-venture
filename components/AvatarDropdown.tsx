import React, { useState } from "react";
import Avatar from "./Avatar";
import { Session } from "next-auth";
import Link from "next/link";
import { FaChevronDown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react";

const AvatarDropdown = ({ session }: { session: Session }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <Avatar session={session} width={50} height={50} />
        <FaChevronDown
          className={`ml-2 text-gray-500 transition-transform ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>
      <div
        className={`sub-menu-wrap transform transition-transform duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="sub-menu shadow-lg rounded-lg">
          <div className="user-info">
            <Avatar session={session} width={50} height={50} />
            <h2 className="font-bold text-xl text-gray-700 ml-3">
              {session.user?.name}
            </h2>
          </div>
          <hr className="border-0 h-[1px] w-full bg-[#edd54d] mb-2" />
          <ul className="p-2">
            <li className="mb-2 flex items-center">
              <FaUserCircle className="mr-2 text-lg text-gray-700" />
              <Link href="/profile">
                <span className="block text-gray-700 text-lg font-semibold hover:scale-105 hover:text-[#c3a21ff4] transition-transform duration-200 ease-out">
                  Profile
                </span>
              </Link>
            </li>
            <li className="flex items-center">
              <FaSignOutAlt className="mr-2 text-lg text-gray-700" />
              <button onClick={() => signOut()} className="focus:outline-none">
                <span className="block text-gray-700 text-lg font-semibold hover:scale-105 hover:text-red-600 transition-transform duration-200 ease-out">
                  Sign Out
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AvatarDropdown;
