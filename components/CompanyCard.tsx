import React from "react";
import Image from "next/image";
import Link from "next/link";

const CompanyCard = ({
  logoUrl,
  backgroundUrl,
  companyName,
  shortDescription,
  investmentGoal,
  investorCount,
}: CompanyCardProps) => {
  return (
    <div className="p-4">
      <div className="card">
        <Image
          src={backgroundUrl}
          alt={`${companyName} background`}
          layout="fill"
          objectFit="cover"
          className="rounded-[20px] absolute"
        />

        <div className="absolute left-[27px] top-[160px] z-10">
          <Image
            src={logoUrl}
            alt={`${companyName} logo`}
            width={57}
            height={57}
            className="rounded-lg shadow-md border-solid border-white border-2 box-shadow hover:shadow-xl"
          />
        </div>

        <div className="card-inside">
          
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
