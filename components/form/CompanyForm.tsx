import ShowStep from "@/components/form/ShowStepForm";
import { CompanyRegisterForm } from "@/components/form/CompanyRegisterForm";
import FormContent from "@/components/form/FormContent";

export default function CompanyForm({ onRoleChange }: { onRoleChange: () => void }) {
  return (
    <FormContent
      label="Company Profile"
      showStepComponent={<ShowStep step={2} />}
      formComponent={<CompanyRegisterForm onRoleChange={onRoleChange} />}
    />
  );
}
