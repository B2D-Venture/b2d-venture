"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CompanyAllStatistics from "@/components/main/CompanyAllStatistics";
import CompanyLogoBoxList from "@/components/main/CompanyLogoBoxList";
import CompanyCardSlide from "@/components/main/CompanyCardSlide";
import TextOnImage from "@/components/main/TextOnImage";
import Link from "next/link";
import RedirectLoading from "@/components/loading/RedirectLoading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRedirectCompanyPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push("/company");
  };

  return (
    <div className="relative">
      {isLoading && <RedirectLoading />}

      <div className="flex justify-center items-center w-full h-full overflow-hidden">
        <TextOnImage />
      </div>
      <CompanyAllStatistics />

      <div className="p-10 text-black dark:text-white text-4xl font-bold max-lg:text-3xl max-md:text-2xl max-sm:text-xl">
        2,500+ businesses funded and served
        <CompanyLogoBoxList />
      </div>

      <div className="px-10 pt-8 text-black dark:text-white text-4xl font-bold">
        TOP 10 Companies
      </div>
      <div className="px-10 pt-5 w-full">
        <CompanyCardSlide />
      </div>

      <Link
        href="/company"
        onClick={handleRedirectCompanyPage}
        className="bottom-[50px] w-[120px] h-[38px] mb-10 mx-10 py-1.5 bg-[#d9d9d9] hover:bg-[#919191] rounded-lg flex justify-center items-center "
      >
        <div className="text-center text-[#363324] text-xl font-bold hover:text-[#d9d9d9]">
          View All
        </div>
      </Link>
    </div>
  );
};

export default Home;
