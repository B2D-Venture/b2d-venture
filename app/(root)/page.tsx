import React from "react";
import Image from "next/image";
import CompanyAllStatistics from "@/components/CompanyAllStatistics";
import CompanyLogoBoxList from "@/components/CompanyLogoBoxList";
import CompanyCardSlide from "@/components/CompanyCardSlide";
import Link from "next/link";
import TextOnImage from "@/components/TextOnImage";

const Home = () => {
  return (
    <div className="relative">
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
        className="bottom-[50px] w-[120px] h-[38px] mx-10 py-1.5 bg-[#d9d9d9] hover:bg-[#919191] rounded-lg flex justify-center items-center "
      >
        <div className="text-center text-[#363324] text-xl font-bold hover:text-[#d9d9d9]">
          View All
        </div>
      </Link>

      <div className="w-[235px] h-[17px] left-[604px] top-[2025px] absolute justify-center items-center inline-flex">
        <div className="w-[235px] h-[17px] text-white text-sm font-normal">
          copyright ©2024. All rights reserve
        </div>
      </div>
    </div>
  );
};

export default Home;
