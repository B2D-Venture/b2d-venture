import React from "react";
import Image from "next/image";
import CompanyAllStatistics from "@/components/CompanyAllStatistics";
import CompanyLogoBoxList from "@/components/CompanyLogoBoxList";
import CompanyCardSlide from "@/components/CompanyCardSlide";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-[1440px] h-[1967px] relative bg-[#181a20]">
      <Image
        className="max-w-full h-auto left-0 top absolute"
        src="/img-main/background-img-main.png"
        alt="Background"
        width={1440}
        height={630}
      />
      <div className="w-[731px] h-[479px] left-[71px] top-[58px] absolute">
        <span className="text-white text-[64px] font-bold">
          Invest for Future in
          <br></br>
          Stable Platform and
        </span>
        <br></br>
        <span className="text-[#e49012] text-[64px] font-bold">
          Make Fast Money
        </span>
      </div>
      <div className="w-[1458px] h-[254px] left-[-18px] top-[630px] absolute bg-[#121212]/80" />
      <CompanyAllStatistics />
      <div className="left-[41px] top-[916px] absolute text-white text-4xl font-bold">
        2,500+ businesses funded and served
        <CompanyLogoBoxList />
      </div>
      <div className="left-[41px] top-[1378px] absolute text-white text-4xl font-bold">
        TOP 10 Companies
      </div>
      <div className="left-[30px] top-[1430px] absolute w-full">
        <CompanyCardSlide />
      </div>
      <Link
        href="/company-list"
        className="absolute bottom-[50px] left-[50px] w-[120px] h-[38px] px-[15px] py-1.5 bg-[#d9d9d9] rounded-[30px] flex justify-center items-center"
      >
        <div className="text-center text-[#363324] text-xl font-bold">
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
