import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdPeopleAlt } from "react-icons/md";
import { CompanyCardProps } from "@/types";

const CompanyCard = ({
  company,
  className,
}: CompanyCardProps) => {
  return (
    <div className="flex justify-center items-center p-4">
      <Link href={`/company/${company.id}`}>
        <div className={`card ${className} group`}>
          <div className="relative w-full h-full">
            {/* Background Image */}
            <Image
              src={company.banner}
              alt={`${company.name} background`}
              layout="fill"
              objectFit="cover"
              className="rounded-[20px] absolute"
            />

            {/* Logo */}
            <Image
              id="example-profile-image"
              src={company.logo}
              width={60}
              height={60}
              alt="Company Logo Image"
              className="card-logo transition-all ease-in-out duration-300 object-cover w-16 h-16"
            />

            {/* Card Inside */}
            <div className="card-inside transition-all ease-in-out duration-300">
              <div>
                <div className="card-name">{company.name}</div>
                <div className="card-description">{company.description}</div>
              </div>

              <div className="card-below">
                <div>
                  $<b>{(company.fundingTarget ?? 0).toLocaleString()}</b> raised
                </div>
                <div className="flex items-center space-x-2">
                  <b>{(company.investorCount ?? 0).toLocaleString()}</b>
                  <span>Investors</span>
                  <MdPeopleAlt />
                </div>
                <div>
                  $<b>{(company.minInvest ?? 0).toLocaleString() ?? "0"}</b> min. investment
                </div>
                <div>
                  $<b>{(company.maxInvest ?? 0).toLocaleString() ?? "0"}</b> max. investment
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
