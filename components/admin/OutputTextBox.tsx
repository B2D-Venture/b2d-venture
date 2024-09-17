import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OutputTextBoxProps} from "@/types";

export function OutputTextBox({
    label,
    value,
    classNameLabel,
    classNameValue,
} : OutputTextBoxProps) {
  return (
    <>
    <Label className={`flex-shrink-0 ${classNameLabel}`}>{label}</Label>
    <Input
      value={value}
      disabled
      className={`border-2 border-black w-auto ${classNameValue}`}
    />
  </>
  );
}