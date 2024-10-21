"use client";
import React from 'react'
import FormContent from '@/components/form/FormContent';
import ShowStep from '@/components/ShowStepForm';
import { CompanyRegisterForm } from '@/components/form/CompanyRegisterForm';

export default function CompanyEdit() {
    return (
        <FormContent
            label="Edit Company Profile"
            showStepComponent={<ShowStep step={2} />}
            formComponent={<CompanyRegisterForm canEdit={true} />}
        />
    )
}