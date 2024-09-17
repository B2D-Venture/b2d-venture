import React from "react";

const CompanyAllStatistics = () => {
  return (
    <div className="w-full h-[180px] bg-[#121212]/80 flex flex-row justify-around items-center px-4 max-xl:h-[160px] max-lg:h-[150px] max-md:h-[140px] max-sm:h-[130px]">
      <div className="flex flex-col items-center">
        <div className="text-company-statistic-num">
          1K+
          <br />
          <span className="text-company-statistic-desc">Investor community</span>
        </div>
      </div>
      <div className="h-[100px] border-l-4 border-white"></div>
      <div className="flex flex-col items-center">
        <div className="text-company-statistic-num">
          1,500+
          <br />
          <span className="text-company-statistic-desc">Ventures supported</span>
        </div>
      </div>
      <div className="h-[100px] border-l-4 border-white"></div>
      <div className="flex flex-col items-center">
        <div className="text-company-statistic-num">
          10+
          <br />
          <span className="text-company-statistic-desc">Unicorns in portfolio</span>
        </div>
      </div>
      <div className="h-[100px] border-l-4 border-white"></div>
      <div className="flex flex-col items-center">
        <div className="text-company-statistic-num">
          $1.5B+
          <br />
          <span className="text-company-statistic-desc">Delegated assets</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyAllStatistics;