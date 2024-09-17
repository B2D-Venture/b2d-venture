import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OutputTextBoxPercentageProps } from "@/types";

export function OutputTextBoxPercentage ({
  label,
  value,
  classNameLabel,
  classNameValue,
}: OutputTextBoxPercentageProps) {
  return (
    <>
      <Label className={`flex-shrink-0 ${classNameLabel}`}>{label}</Label>
      <div className={`flex flex-row items-center`}>
        <Input
          value={value}
          disabled
          className={`border-2 border-black w-auto ${classNameValue}`}
        />
        <span>%</span>
      </div>
    </>
  );
}
