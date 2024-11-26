import React from 'react'
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { TopUpFieldProps } from '@/types/form/index.d';
import "@/styles/InvestableAmount.css";

const TopUpFields = ({
    control,
    label,
    name,
    dataId,
    placeholder,
    type,
    disabled,
}: TopUpFieldProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="inputBox">
                    <span>{label}</span>
                    <FormControl>
                        <div className="input-container">
                            <Input
                                data-id={dataId}
                                placeholder={placeholder}
                                type={type}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    field.onChange(type === "number" ? (value ? parseFloat(value) : 0) : value);
                                }}
                                className='dark:border-gray-700'
                                value={type === "number" ? field.value || 0 : field.value}
                                disabled={disabled}
                            />
                        </div>
                    </FormControl>
                    <FormMessage className="dark:text-[#e49494]" />
                </FormItem>
            )}
        />
    );
}

export default TopUpFields