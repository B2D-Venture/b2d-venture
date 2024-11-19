import { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

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
    title: "Sign In" | "Sign Up" | "Reset Password";
    apiPath: string;
    redirectPath: string;
    linkPath: string;
    linkText: string;
}

export type SignUpFormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    checkboxAbide: boolean;
};

export type SignInFormValues = {
    email: string;
    password: string;
};

export type FormValues = SignUpFormValues | SignInFormValues;

export interface PasswordFieldProps {
    form: UseFormReturn<FormValues>;
    name: "email" | "password" | "confirmPassword";
}

export interface CompanyRegisterFormProps {
    canEdit?: boolean;
    companyEditId?: number;
    onRoleChange?: () => void;
}

export interface TopUpFieldProps {
    control: any;
    name: string;
    label: string;
    dataId: string;
    placeholder?: string;
    type: string;
    disabled?: boolean;
}

export interface TopUpFormProps {
    investorId: number;
    email: string;
    closeDialog: () => void;
}

export interface PdfFile {
    id?: number;
    name: string;
    size: number;
    key: string;
    lastModified: number;
    serverData: any;
    url: string;
}