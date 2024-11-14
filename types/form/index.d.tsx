import { ReactNode } from 'react';

export type FormContentProps = {
    label: string;
    showStepComponent: ReactNode;
    formComponent: ReactNode;
};

export interface FormFieldProps {
    control: any;
    name: string;
    label?: string;
    dataId?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    defaultValue?: string | Date;
};

export interface SuccessFormProps {
    role: string;
    hasApproval: boolean | null;
    roleIdNumber?: number;
}

export interface AuthFormProps {
    title: "Sign In" | "Sign Up";
    apiPath: string;
    redirectPath: string;
    linkPath: string;
    linkText: string;
}