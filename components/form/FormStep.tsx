'use client';

import React, { useState, useEffect } from "react";
import { useFormState } from "../FormContext";
import RoleSelectForm from "./RoleSelectForm";
import InvestorForm from "./InvestorForm";
import CompanyForm from "./CompanyForm";
import SuccessForm from "../SuccessForm";
import {
  getInvestorRequestById,
} from "@/lib/db/index";
import FormSubmitLoading from "@/components/loading/FormSubmitLoading";

export default function FormStep() {
  const [user, setUser] = useState<User | null>(null);
  const { step } = useFormState();
  const [loading, setLoading] = useState(true);
  const [successRole, setSuccessRole] = useState<string | null>(null);
  const [hasApproval, setHasApproval] = useState<boolean | null>(null);

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

  useEffect(() => {
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
          setSuccessRole("Company");
        }
      }
    };

    fetchApprovalStatus();
  }, [user]);

  const handleRoleChange = () => {
    fetchUser(); // Refetch user data after role change
  };

  if (loading) {
    return (
      <FormSubmitLoading />
    );
  }

  if ((user && user.roleId !== 1) || step === 4) {
    if (user.roleId === 2) {
      return <SuccessForm role={"Investor"} hasApproval={hasApproval} />;
    } else if (user.roleId === 3) {
      return <SuccessForm role={"Company"} hasApproval={hasApproval} roleIdNumber={user?.roleIdNumber} />;
    }
  }

  if (step === 1) {
    return <RoleSelectForm />;
  }
  else if (step === 2) {
    return <InvestorForm onRoleChange={handleRoleChange} />;
  }
  else if (step === 3) {
    return <CompanyForm onRoleChange={handleRoleChange} />;
  }

  return null;
}
