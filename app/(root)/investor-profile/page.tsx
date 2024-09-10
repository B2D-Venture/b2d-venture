import InvestorFormButton from "@/components/InvestorFormButton";
import InvestorFormField from "@/components/InvestorFormField";
import InvestorProfileImageUpload from "@/components/InvestorProfileImageUpload";
import InvestorPaginationDots from "@/components/InvestorPaginationDots";
import React from "react";

const InvestorProfile = () => {
  return (
    <div className="h-screen flex flex-col items-center p-6 mb-80">
      {/* Heading */}
      <h1 className="text-4xl font-semibold mb-8 ml-7 mt-4 text-white self-start">
        Investor Profile
      </h1>
      <div className="bg-[#d9d9d9] p-10 pt-20 rounded-2xl w-full max-w-7xl shadow-lg">
        <div className="grid grid-cols-4 gap-12">
          {/* Left section with image upload */}
          <div className="col-span-1">
            <InvestorProfileImageUpload />
          </div>

          {/* Right section with form inputs */}
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-12 mb-6">
              <InvestorFormField
                label="Firstname"
                type="text"
              />
              <InvestorFormField
                label="Lastname"
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-12 mb-6">
              <InvestorFormField
                label="National ID Card"
                type="text"
              />
              <InvestorFormField
                label="Birthdate"
                type="date"
              />
            </div>
            <div className="grid grid-cols-2 gap-12 mb-6">
              <InvestorFormField
                label="Email Address"
                type="email"
              />
              <InvestorFormField
                label="Nationality"
                type="text"
              />
            </div>
            <div className="mb-10">
              <InvestorFormField
                label="Net Worth"
                type="text"
              />
            </div>

            {/* Submit button */}
            <div className="mb-10">
              <InvestorFormButton label="Create Profile" />
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <InvestorPaginationDots />
      </div>
    </div>
  );
};

export default InvestorProfile;
