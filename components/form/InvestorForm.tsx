import ShowStep from "@/components/form/ShowStepForm";
import FormContent from "@/components/form/FormContent";
import { InvestorRegisterForm } from "@/components/form/InvestorRegisterForm";

export default function InvestorForm({ onRoleChange }: { onRoleChange: () => void }) {
  return (
    <FormContent
      label="Investor Profile"
      showStepComponent={<ShowStep step={2} />}
      formComponent={<InvestorRegisterForm onRoleChange={onRoleChange} />}
    />
  );
}
