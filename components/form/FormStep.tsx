'use client';

import React, { useState, useEffect } from "react";
import { useFormState } from "../FormContext";
import RoleSelectForm from "../RoleSelectForm";
import InvestorForm from "./InvestorForm";
import CompanyForm from "./CompanyForm";
import SuccessForm from "../SuccessForm";
import { Skeleton } from "@/components/ui/skeleton"

export default function FormStep() {
  const [user, setUser] = useState<any>(null);
  const [roleSelected, setRoleSelected] = useState<string | null>("");
  const { step } = useFormState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        window.location.href = `/signup?callbackUrl=/role-register`;
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (step === 2) {
      setRoleSelected("Investor");
    } else if (step === 3) {
      setRoleSelected("Company");
    }
  }, [step]);

  if (loading) {
    return (
      <div className="w-full h-[600px] flex flex-col items-center">
        <div className="w-full max-w-7xl text-left">
          <Skeleton className="w-1/4 h-8 mb-12 mt-5 rounded-[30px]" />
        </div>

        <div className="bg-[#D9D9D9] rounded-xl shadow-lg p-8 max-w-7xl w-full max-h-7xl h-full">
          <div className="w-full flex justify-center mb-8">
            <Skeleton className="w-[562px] h-[72px] rounded-xl" />
          </div>
          <div className="flex justify-center items-center mb-8">
            <Skeleton className="w-[300px] h-[300px] rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (user) {
    if (user.roleId !== 1) {
      if (user.roleId === 2) {
        return <SuccessForm role="Investor" />;
      }
      else if (user.roleId === 3) {
        return <SuccessForm role="Company" />;
      }
    }
  }

  if (step === 1) {
    return <RoleSelectForm />;
  }
  if (step === 2) {
    return <InvestorForm />;
  }
  if (step === 3) {
    return <CompanyForm />;
  }
  if (step === 4) {
    return <SuccessForm role={roleSelected || ""} />;
  }

  return null;
};
