import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OutputTextBoxDollarProps } from "@/types";

export function OutputTextBoxDollar({
  label,
  value,
  classNameLabel,
  classNameValue,
}: OutputTextBoxDollarProps) {
  return (
    <>
      <Label className={`flex-shrink-0 ${classNameLabel}`}>{label}</Label>
      <div className={`flex flex-row items-center ${classNameLabel}`}>
        <span>$</span>
        <Input
          value={value}
          disabled
          className={`border-2 border-black w-auto ${classNameValue}`}
        />
      </div>
    </>
  );
}
