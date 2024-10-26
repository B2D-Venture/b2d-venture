'use client';

import React, { useState, useEffect } from "react";
import { useFormState } from "../FormContext";
import RoleSelectForm from "./RoleSelectForm";
import InvestorForm from "./InvestorForm";
import CompanyForm from "./CompanyForm";
import SuccessForm from "../SuccessForm";
import {
  getInvestorRequestById,
  getRecentRaiseFundingByCompanyId,
  getRaiseFundingRequestById,
} from "@/lib/db/index";
import FormSubmitLoading from "@/components/loading/FormSubmitLoading";

export default function FormStep() {
  const [user, setUser] = useState<User | null>(null);
  // const [roleSelected, setRoleSelected] = useState<string | null>("");
  const { step } = useFormState();
  const [loading, setLoading] = useState(true);
  const [successRole, setSuccessRole] = useState<string | null>(null);
  const [hasApproval, setHasApproval] = useState<boolean | null>(null);

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
    const fetchApprovalStatus = async () => {
      if (user) {
        if (user.roleId === 2) {
          const requestData = await getInvestorRequestById(user.roleIdNumber);
          setHasApproval(requestData.approval);
          setSuccessRole("Investor");
        } else if (user.roleId === 3) {
          // const recentFunding = await getRecentRaiseFundingByCompanyId(user.roleIdNumber);
          // const fundingRequest = await getRaiseFundingRequestById(recentFunding.id);
          // console.log(fundingRequest);
          // setHasApproval(fundingRequest.approval);  // TODO: Fix this
          setSuccessRole("Company");
        }
      }
    };

    fetchApprovalStatus();
  }, [user]);

  if (loading) {
    return (
      <FormSubmitLoading />
    );
  }

  if ((user && user.roleId !== 1) || step === 4) {
    if (user.roleId === 2) {
      return <SuccessForm role={successRole || "Investor"} hasApproval={hasApproval} />;
    } else if (user.roleId === 3) {
      return <SuccessForm role={successRole || "Company"} hasApproval={hasApproval} roleIdNumber={user?.roleIdNumber} />;
    }
    return <SuccessForm role={successRole || ""} hasApproval={hasApproval} />;
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

  return null;
}
