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
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const FormFields = React.memo(({
    control,
    name,
    label,
    dataId,
    placeholder,
    type,
    disabled = false,
    defaultValue = "",
}: FormFieldProps) => {
    const { setValue } = useFormContext();

    useEffect(() => {
        if (disabled && type === "calendar" && defaultValue instanceof Date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (defaultValue.getTime() !== today.getTime()) {
                setValue(name, today); // Use setValue to update the form field value
            }
        }
    }, [disabled, type, defaultValue, setValue, name]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='text-black'>
                    {type !== "calendar" && <FormLabel className="text-[20px]">{label}</FormLabel>}

                    <FormControl>
                        {type === "calendar" ? (
                            (disabled === true) ? (
                                <div>
                                    <div className="text-[20px]">{label} (Day / Month / Year)</div>
                                    <div className='flex'>
                                        <div className='text-center border-2 border-[#a1a1a1ee] rounded-sm min-w-[60px] p-2 my-2 mr-2'>
                                            {defaultValue instanceof Date ? defaultValue.getDate().toString().padStart(2, '0') : defaultValue}
                                        </div>
                                        <div className='py-4'>/</div>
                                        <div className='text-center border-2 border-[#a1a1a1ee] rounded-sm min-w-[60px] p-2 m-2'>
                                            {defaultValue instanceof Date ? (defaultValue.getMonth() + 1).toString().padStart(2, '0') : defaultValue}
                                        </div>
                                        <div className='py-4'>/</div>
                                        <div className='text-center border-2 border-[#a1a1a1ee] rounded-sm min-w-[60px] p-2 m-2'>
                                            {defaultValue instanceof Date ? defaultValue.getFullYear().toString() : defaultValue}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <CalendarForm label={label || ''} field={field} canSetMoreThanToday={true} />
                            )
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
                                disabled={disabled}
                            />
                        )}
                    </FormControl>
                    {!(type === "calendar" || type === "pitch") && <FormMessage />}
                </FormItem>
            )}
        />
    );
});

export default FormFields;
