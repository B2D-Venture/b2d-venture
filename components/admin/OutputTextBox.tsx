import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OutputTextBoxProps } from "@/types";

export function OutputTextBox({
  label,
  value,
  classNameLabel,
  classNameValue,
  iconSideLeft,
  iconSideRight,
}: OutputTextBoxProps) {
  return (
    <div className="flex justify-between items-center py-3 px-5">
      <Label className={`${classNameLabel}`}>{label}</Label>
      <div className="flex items-center justify-center">
        {iconSideLeft && <span className="">{iconSideLeft}</span>}
        <Input
          value={value}
          disabled
          className={`border-2 border-black w-auto mx-1 ${classNameValue}`}
        />
        {iconSideRight && <span className="">{iconSideRight}</span>}
      </div>
    </div>
  );
}