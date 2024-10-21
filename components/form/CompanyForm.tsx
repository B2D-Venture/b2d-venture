import ShowStep from "@/components/ShowStepForm";
import { CompanyRegisterForm } from "@/components/form/CompanyRegisterForm";
import FormContent from "@/components/form/FormContent";

export default function CompanyForm() {
  return (
    <FormContent
      label="Company Profile"
      showStepComponent={<ShowStep step={2} />}
      formComponent={<CompanyRegisterForm />}
    />
  );
}
