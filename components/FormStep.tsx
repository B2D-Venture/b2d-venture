import React from "react";
import { useFormState } from "./FormContext";
import RoleSelectForm from "./RoleSelectForm";
import InvestorFormExample from "./InvestorFormExample";
import CompanyFormExample from "./CompanyFormExample";
import SuccessForm from "./SuccessForm";

const FormStep = () => {
  const { step } = useFormState();

  switch (step) {
    case 1:
      return <RoleSelectForm />;
    case 2:
        return <InvestorFormExample />
    case 3:
        return <CompanyFormExample />
    case 4:
        return <SuccessForm />
    default:
      return null;
  }
};

export default FormStep;
