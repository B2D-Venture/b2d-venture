"use client";
import React from 'react';
import FormContent from '@/components/form/FormContent';
import { CompanyRegisterForm } from '@/components/form/CompanyRegisterForm';

export default function CompanyEdit({ params }: { params: { companyId: number } }) {
    return (
        <FormContent
            label=""
            showStepComponent=""
            formComponent={<CompanyRegisterForm canEdit={true} companyEditId={params.companyId} />}
        />
    )
}
