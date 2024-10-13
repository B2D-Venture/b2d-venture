import { ReactNode } from 'react';

export type FormContentProps = {
    label: string;
    shopStepComponent: ReactNode;
    formComponent: ReactNode;
};

export interface FormFieldProps {
    control: any;
    name: string;
    label?: string;
    dataId?: string;
    placeholder?: string;
    type?: string;
};