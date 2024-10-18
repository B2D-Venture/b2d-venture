"use client";

import { FormFieldProps } from '@/types/form/index.d';
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CalendarForm } from "@/components/CalendarForm";
import Tiptap from "@/components/form/company/Tiptap";

const FormFields = ({
    control,
    name,
    label,
    dataId,
    placeholder,
    type,
}: FormFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {type !== "calendar" && <FormLabel className="text-[20px]">{label}</FormLabel>}

                    <FormControl>
                        {type === "calendar" ? (
                            <CalendarForm label={label || ''} field={field} canSetMoreThanToday={true} />
                        ) : type === "pitch" ? (
                            <div>
                                <FormMessage />
                                <Tiptap pitch={field.value} onChange={field.onChange} />
                            </div>
                        ) : (
                            <Input
                                data-id={dataId}
                                className="bg-[#bfbfbf]"
                                placeholder={placeholder}
                                type={type}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    if (type === "number") {
                                        field.onChange(value ? parseFloat(value) : 0);
                                    } else {
                                        field.onChange(value);
                                    }
                                }}
                                value={type === "number" ? field.value || 0 : field.value}
                            />
                        )}
                    </FormControl>
                    {!(type === "calendar" || type === "pitch") && <FormMessage />}
                </FormItem>
            )}
        />
    );
}

export default FormFields;
