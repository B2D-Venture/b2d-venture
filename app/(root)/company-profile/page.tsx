import React from "react";
import Image from "next/image";
import Pitch from "@/components/Pitch";

const CompanyProfile = () => {
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
      <div className="grid mt-10 grid-cols-2 h-full w-full text-white">
        <Pitch />
        <div className="flex items-center justify-center h-full">
          <div className="Rectangle48 mt-10 w-[307px] h-[1000px] left-3/4 top-[817px] absolute bg-[#d9d9d9] rounded-[15px]" />
          <div className="absolute mt-8 left-3/4 top-[850px] ml-3">
            <div className="text-black text-5xl">22</div>
            <div className="mb-2 text-[#423f3f] text-2xl">Investors</div>
            <div className="Line4 w-[268.01px] h-[0px] border border-black mb-8"></div>
            <div className="text-black text-5xl">10 Days</div>
            <div className="mb-2 text-[#423f3f] text-2xl">
              Left to investment
            </div>
            <div className="Line4 w-[268.01px] h-[0px] border border-black mb-8"></div>
            <div className="text-black text-5xl">1,000 $</div>
            <div className="mb-2 text-[#423f3f] text-2xl">
              Minimum Investment
            </div>
            <div className="Line4 w-[268.01px] h-[0px] border border-black mb-8"></div>
            <div className="text-black text-5xl">2,000 $</div>
            <div className="mb-2 text-[#423f3f] text-2xl">
              Maximum Investment
            </div>
            <div className="Line4 w-[268.01px] h-[0px] border border-black mb-8"></div>
            <div className="text-black text-5xl">100,000 $</div>
            <div className="mb-2 text-[#423f3f] text-2xl">Funding Goal</div>
            <div className="Line4 w-[268.01px] h-[0px] border border-black mb-8"></div>
            <div className="text-black text-5xl">10.23 $</div>
            <div className="mb-2 text-[#423f3f] text-2xl">
              Price per Security
            </div>
            <div className="Line4 w-[268.01px] h-[0px] border border-black mb-8"></div>
            <div className="flex flex-col items-center space-y-4">
              <button
                type="button"
                className="w-full max-w-[268px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5"
              >
                Question
              </button>
              <button
                type="button"
                className="w-full max-w-[268px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5"
              >
                Invest
              </button>
              <button
                type="button"
                className="w-full max-w-[268px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5"
              >
                Raise Funding
              </button>
              <button
                type="button"
                className="w-full max-w-[268px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5"
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
