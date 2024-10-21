"use client";
import React from 'react'
import FormContent from '@/components/form/FormContent';
import ShowStep from '@/components/ShowStepForm';
import { CompanyRegisterForm } from '@/components/CompanyRegisterForm';
import { redirect } from 'next/navigation';
import { getUser } from "@/lib/db/index";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

const isOwnCompany = async (urlId: number, user: { roleIdNumber: number | null }) => {
    if (user.roleIdNumber == urlId) {
        return true;
    }
    return false;
}

export default async function CompanyEdit({ params }: { params: { companyId: number } }) {
    // const session = await getServerSession(authConfig);

    // let user = null;
    // if (session && session.user?.email) {
    //     const userEmail = session.user.email;
    //     user = await getUser(session.user.email);
    //     if (!(await isOwnCompany(params.companyId, user))) {
    //         redirect(`/company/${params.companyId}`);
    //     }
    // } else {
    //     redirect(`/company/${params.companyId}`);
    // }

    return (
        <FormContent
            label="Edit Company Profile"
            showStepComponent={<ShowStep step={2} />}
            formComponent={<CompanyRegisterForm canEdit={true} companyEditId={params.companyId} />}
        />
    )
}