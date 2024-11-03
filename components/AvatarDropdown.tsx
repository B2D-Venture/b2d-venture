import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Session } from "next-auth";
import Link from "next/link";
import { FaChevronDown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { 
  getInvestorById, 
  getUser, 
  getInvestorRequestById, 
  getCompanyById, 
  getCompanyRequestById 
} from "@/lib/db/index";
import { MdEmail } from "react-icons/md";

const AvatarDropdown = ({ session }: { session: Session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(session?.user?.name);
  const [imageUrl, setImageUrl] = useState(session?.user?.image);
  const [user, setUser] = useState(session?.user);
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) return;

      try {
        const userData = await getUser(userEmail);
        if (!userData || userData.roleIdNumber === null) {
          setName(session?.user?.name);
          setImageUrl(session?.user?.image);
          return;
        }

        let fetchedData = null;
        let requestApproval = null;

        if (userData.roleId === 2) { // Investor
          fetchedData = await getInvestorById(userData.roleIdNumber);
          requestApproval = await getInvestorRequestById(userData.roleIdNumber);
        } else if (userData.roleId === 3) { // Company
          fetchedData = await getCompanyById(userData.roleIdNumber);
          const requestList = await getCompanyRequestById(userData.roleIdNumber);
          requestApproval = requestList ? requestList[0] : null;
        }

        if (fetchedData && requestApproval?.approval) {
          setName('firstName' in fetchedData ? `${fetchedData.firstName} ${fetchedData.lastName}` : fetchedData?.name);
          setImageUrl('profileImage' in fetchedData ? fetchedData.profileImage : fetchedData.logo);
        }
        setUser(userData);

      } catch (error) {
        console.error("Error fetching user data: ", error);
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
        <Avatar imageUrl={imageUrl || ""} width={50} height={50} />
        <FaChevronDown
          className={`ml-2 text-gray-500 transition-transform ${isOpen ? "rotate-0" : "rotate-180"
            }`}
        />
      </button>
      <div
        className={`sub-menu-wrap transform transition-transform duration-300 ease-out ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          }`}
      >
        <div className="sub-menu shadow-lg rounded-lg">
          <div className="user-info flex items-center p-2">
            <Avatar imageUrl={imageUrl || ""} width={50} height={50} />
            <h2 className="font-bold text-xl text-gray-700 ml-3">{name}</h2>
            <div className="flex items-center justify-center">
              <MdEmail className="text-black" />
              <h4 className="text-gray-500 text-sm ml-1">{session?.user?.email}</h4>
            </div>
          </div>
          <hr className="border-0 h-[1px] w-full bg-gray-800 dark:bg-[#edd54d] mb-2" />
          <ul className="p-2">
            <li className="mb-2 flex items-center">
              <FaUserCircle className="mr-2 text-lg text-gray-700" />
              {(user.roleId === 2) ? (
                <Link href="/investor-profile">
                  <span className="block text-gray-700 text-lg font-semibold hover:scale-105 hover:text-[#c3a21ff4] transition-transform duration-200 ease-out">
                    Investor Profile
                  </span>
                </Link>
              ) :
              (user.roleId === 3) ? (
                <Link href={`/company/${user.roleIdNumber}`}>
                  <span className="block text-gray-700 text-lg font-semibold hover:scale-105 hover:text-[#c3a21ff4] transition-transform duration-200 ease-out">
                    Company Profile
                  </span>
                </Link>
              ) : (
                <Link href="/role-register">
                  <span className="block text-gray-700 text-lg font-semibold hover:scale-105 hover:text-[#c3a21ff4] transition-transform duration-200 ease-out">
                    Register Role
                  </span>
                </Link>
              )}
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
