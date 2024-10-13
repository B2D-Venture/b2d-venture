import ShowStep from "@/components/ShowStepForm";
import FormContent from "@/components/form/FormContent";
import { InvestorRegisterForm } from "@/components/InvestorRegisterForm";

export default function InvestorForm() {
  return (
    <FormContent 
      label="Investor Profile"
      shopStepComponent={<ShowStep step={2} />}
      formComponent={<InvestorRegisterForm />}
    />
  );
}
