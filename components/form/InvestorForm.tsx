import ShowStep from "@/components/ShowStepForm";
import FormContent from "@/components/form/FormContent";
import { InvestorRegisterForm } from "@/components/form/InvestorRegisterForm";

export default function InvestorForm() {
  return (
    <FormContent 
      label="Investor Profile"
      showStepComponent={<ShowStep step={2} />}
      formComponent={<InvestorRegisterForm />}
    />
  );
}
