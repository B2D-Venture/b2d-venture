import React, { useState, useEffect } from "react";
import { useFormState } from "../FormContext";
import RoleSelectForm from "../RoleSelectForm";
import InvestorForm from "./InvestorForm"
import CompanyForm from "./CompanyForm";
import SuccessForm from "../SuccessForm";

const FormStep = () => {
  const [roleSelected, setRoleSelected] = useState<string | null>("");
  const { step } = useFormState();

  useEffect(() => {
    if (step === 2) {
      setRoleSelected("Investor");
    } else if (step === 3) {
      setRoleSelected("Company");
    }
  }, [step]);

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

export default FormStep;
