import React, { useState, useEffect } from "react";
import { useFormState } from "./FormContext";
import RoleSelectForm from "./RoleSelectForm";
import InvestorFormExample from "./InvestorFormExample";
import CompanyFormExample from "./CompanyFormExample";
import SuccessForm from "./SuccessForm";

const FormStep = () => {
  const [roleSelected, setRoleSelected] = useState(null);
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
    return <InvestorFormExample />;
  }
  if (step === 3) {
    return <CompanyFormExample />;
  }
  if (step === 4) {
    return <SuccessForm role={roleSelected} />;
  }

  return null;
};

export default FormStep;
