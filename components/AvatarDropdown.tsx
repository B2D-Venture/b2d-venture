import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Session } from "next-auth";
import Link from "next/link";
import { FaChevronDown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { getInvestorById, getUser } from "@/lib/db/index";

const AvatarDropdown = ({ session }: { session: Session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(session?.user?.name);
  const [imageUrl, setImageUrl] = useState(session?.user?.image);
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) return;

      const user = await getUser(userEmail);
      if (user) {
        if (user.roleId === 2 && user.roleIdNumber !== null) { // Investor
          const investor = await getInvestorById(user.roleIdNumber);
          if (investor.status) {
            setName(investor.firstName + " " + investor.lastName);
            setImageUrl(investor.profileImage);
          } else { // Not Approved Yet
            setName(session?.user?.name);
            setImageUrl(session?.user?.image);
          }
        } else {
          setName(session?.user?.name);
          setImageUrl(session?.user?.image);
        }
      }
    };

    fetchUserData();
  }, [userEmail]);

  if (!userEmail) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <Avatar imageUrl={imageUrl} width={50} height={50} />
        <FaChevronDown
          className={`ml-2 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`sub-menu-wrap transform transition-transform duration-300 ease-out ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="sub-menu shadow-lg rounded-lg">
          <div className="user-info flex items-center p-2">
            <Avatar imageUrl={imageUrl} width={50} height={50} />
            <h2 className="font-bold text-xl text-gray-700 ml-3">{name}</h2>
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
