import React from "react";
import Image from "next/image";
import Pitch from "@/components/Pitch";
import DealTerm from "@/components/DealTerm";
import { getUserByEmail, getCompanyById } from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CompanyProfile() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    redirect("/"); // Should be redirect to login page, but for now redirect to home page (same as investor-profile)
  }
  const userEmail = session.user.email;
  const user = await getUserByEmail(3, userEmail); // get user role 3 = company

  if (!user) {
    redirect("/role-register");
  }

  let company = null;
  if (user.roleIdNumber !== null) {
    company = await getCompanyById(user.roleIdNumber);
  }

  return (
    <div>
      <div className="banner relative w-full h-[438px] bg-blue">
        <Image
          src="https://images.workpointtoday.com/workpointnews/2022/11/15081905/1668475141_74922_52345681_10156606559473124_7930833184248299520_n.jpeg"
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="rounded-[5px]"
        />
      </div>
      <div className="w-full h-[70px] md:h-[100px] lg:h-[80px]">
        <div className="logo relative w-[120px] h-[120px] top-40% left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:w-[200px] xl:h-[200px] lg:w-[170px] lg:h-[170px] md:w-[150px] md:h-[150px]">
          <Image
            src="https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png"
            alt="logo"
            layout="fill"
            className="rounded-[5px]"
          />
        </div>
      </div>
      <p className="name text-2xl text-white left-1/2 text-center md:mt-8 md:text-5xl">
        Company name
      </p>
      <div className="detail text-center text-white text-sm mt-3 md:text-xl">
        is a startup that is developing a new generation of plants that are more
        sustainable, efficient, and beautiful than ever before.
      </div>
      <div className="mx-8 mt-4 md:mx-20">
        <div className="flex justify-between mb-1">
          <span className="text-sm md:text-base font-medium text-[#fcd535] dark:text-yellow-500">
            45% - 30 days left
          </span>
          <span className="text-sm md:text-base font-medium text-[#fcd535] dark:text-white">
            $ 100,000 target
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-8 mb-4 dark:bg-gray-700">
          <div className="bg-yellow-400 h-8 rounded-full w-[45%] text-black flex items-center">
            <div className="ml-2 md:ml-5 text-sm md:text-base">$45,000 from 22 investors</div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 text-white">
        <Pitch />
        <DealTerm />
      </div>
    </div>
  );
};

