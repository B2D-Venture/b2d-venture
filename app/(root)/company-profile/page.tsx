import React from "react";
import Image from "next/image";

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
      <div className="w-full h-[100px]">
        <div className="logo relative w-[200px] h-[200px] top-40% left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png"
            alt="logo"
            layout="fill"
            objectFit="cover"
            className="rounded-[5px]"
          />
        </div>
      </div>
      <p className="name text-5xl text-white left-1/2 text-center mt-3">
        Company name
      </p>
      <div className="detail text-center text-white text-xl mt-3">
        is a startup that is developing a new generation of plants that are more
        sustainable, efficient, and beautiful than ever before.
      </div>
      <div className="ml-20 mr-20">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-[#fcd535] dark:text-yellow-500">
            45% - 30 days left
          </span>
          <span className="text-base font-medium text-[#fcd535] dark:text-white">
            $ 100,000 target
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-8 mb-4 dark:bg-gray-700">
          <div className="bg-yellow-400 h-8 rounded-full w-[45%] text-black flex items-center">
            <div className="ml-5">$45,000 from 22 investors</div>
          </div>
        </div>
      </div>
      <div className="grid mt-10 grid-cols-2 h-full w-full text-white">
        <div className="flex relative ml-[80px]">
          <div className="Highlights absolute text-5xl top-[20px] left-[0px]">
            Highlights
          </div>
          <div className="SmartPlants w-[994px] left-[0px] top-[100px] absolute text-white text-2xl">
            Smart plants: Plants that can be monitored and controlled remotely,
            using sensors and artificial intelligence.
            <br />
            Vertical farming systems: Systems that allow plants to be grown in
            high-density, indoor environments.
            <br />
            Plant-based food products: Healthy and delicious food products made
            from plants.
            <br />
            Plant-based materials: Sustainable materials made from plants, such
            as bioplastics and textiles.
          </div>

          <div className="Problem left-0 top-[350px] absolute text-white text-5xl">
            Problem
          </div>
          <div className="ProblemDescription w-[994px] left-0 top-[410px] absolute text-white text-2xl">
            The global agricultural industry faces significant challenges in
            meeting the growing demand for food, materials, and resources in a
            sustainable and efficient manner...
          </div>

          <div className="Solution left-0 top-[500px] absolute text-white text-5xl">
            Solution
          </div>
          <div className="SolutionDescription w-[994px] left-0 top-[560px] absolute text-white text-2xl">
            Future Plant offers an innovative approach to agriculture by
            developing smart plants that can be remotely monitored and
            controlled through sensors and artificial intelligence...
          </div>

          <div className="Opportunity left-0 top-[700px] absolute text-white text-5xl">
            Opportunity
          </div>
          <div className="OpportunityDescription w-[994px] left-0 top-[760px] absolute text-white text-2xl">
            Future Plant is still in its early stages, but the company has
            already made significant progress...
          </div>

          <div className="BusinessModel left-0 top-[850px] absolute text-white text-5xl">
            Business Model
          </div>
          <div className="BusinessModelDescription w-[994px] left-0 top-[910px] absolute text-white text-2xl">
            Future Plant operates a hybrid business model that combines
            technology development, product sales, and partnerships...
          </div>
        </div>
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
