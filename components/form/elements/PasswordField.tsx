import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import { Control } from "react-hook-form";
import { PasswordFieldProps } from "@/types/form/index.d";


const PasswordField = ({ form, name }: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className="relative">
                            <Input
                                placeholder={name === "password" ? "Password" : "Confirm Password"}
                                className="w-full px-8 py-6 rounded-lg bg-gray-100 border text-sm focus:outline-none"
                                {...field}
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black dark:text-white"
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PasswordField;
