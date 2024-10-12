import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdPeopleAlt } from "react-icons/md";
import { CompanyCardProps } from "@/types";

const CompanyCard = ({
  logoUrl,
  backgroundUrl,
  companyName,
  shortDescription,
  investmentGoal,
  investorCount = 0, // default value = 0
  minInvest,
  className,
}: CompanyCardProps) => {
  return (
    <div className="p-4">
      <Link href="/">
      {/* \    /* @apply w-[390px]; */
    /* @apply sm:w-[500px];
    @apply md:w-[750px];
    @apply lg:w-[350px];
    @apply xl:w-[270px]; */}
        <div className={`card ${className} group`}>
          <div className="relative w-full h-full">
            {/* Background Image */}
            <Image
              src={backgroundUrl}
              alt={`${companyName} background`}
              layout="fill"
              objectFit="cover"
              className="rounded-[20px] absolute"
            />

            {/* Logo */}
            <Image
              src={logoUrl}
              alt={`${companyName} logo`}
              width={57}
              height={57}
              className="card-logo transition-all ease-in-out duration-300"
            />

            {/* Card Inside */}
            <div className="card-inside transition-all ease-in-out duration-300">
              <div className="card-name">{companyName}</div>

              <div className="card-description">{shortDescription}</div>

              <div className="card-below">
                <div>
                  $<b>{investmentGoal.toLocaleString()}</b> raised
                </div>
                <div className="flex items-center space-x-2">
                  <b>{investorCount.toLocaleString()}</b>
                  <span>Investors</span>
                  <MdPeopleAlt />
                </div>
                <div>
                  $<b>{minInvest.toLocaleString()}</b> min. investment
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CompanyCard;
