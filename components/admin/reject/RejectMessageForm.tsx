"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import CheckboxMessage from "@/components/admin/reject/element/CheckboxMessage";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
} from "@/components/ui/form";
import { getUserByCompanyId, getCompanyById } from "@/lib/db/index";
import { InvestorProps } from "@/types/investor";
import { Company } from "@/types/company";

// Define a type for each message to make the form reusable
type Message = {
    id: string;
    title: string;
    description: string;
};

const formSchema = z.object({
    messages: z.record(z.boolean().default(false)),
});

type RejectMessageFormProps = {
    className?: string;
    type: "investor" | "company" | "funding" | null;
    request: any;
    email?: string;
    companyId?: number;
    handleReject: () => void;
};

const sendEmailCompanyStatus = async (company: any, email: string, status: "approved" | "rejected", message: Message[]) => {
    try {
        const response = await fetch("/api/mail/company", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                status,
                email,
                name: company.name,
                abbr: company.abbr,
                description: company.description,
                pitch: company.pitch,
                logo: company.logo,
                banner: company.banner,
            }),
        });

        if (response.ok) {
            console.log("Email sent successfully!");
        } else {
            const errorData = await response.json();
            console.error(`Error: ${errorData.message || "Failed to send email"}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const sendEmailInvestorStatus = async (investor: InvestorProps, status: "approved" | "rejected", message: Message[]) => {
    try {
        const response = await fetch("/api/mail/investor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                status,
                email: investor.email,
                profileImage: investor.profileImage,
                firstName: investor.firstName,
                lastName: investor.lastName,
                nationalId: investor.nationalId,
                birthDate: investor.birthDate,
                nationality: investor.nationality,
                networth: investor.networth,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error: ${errorData.message || "Failed to send email"}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const sendEmailDataroomRequestStatus = async (dataroom: any, email: string, status: "approved" | "rejected", message: Message[], company: Company, investorProfile: string) => {
    try {
        const response = await fetch("/api/mail/dataroom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                status,
                email,
                company,
                investorProfile,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error: ${errorData.message || "Failed to send email"}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const getRejectMessage = (type: string) => {
    if (type === "company") {
        return [
            { id: "message1", title: "Incorrect Logo", description: "The uploaded logo does not match the official company logo." },
            { id: "message2", title: "Incorrect Banner", description: "The uploaded banner does not meet branding guidelines." },
            { id: "message3", title: "Incorrect Company Name", description: "The company name is misspelled or incorrect." },
            { id: "message4", title: "Incorrect Company Abbreviation", description: "The company abbreviation is incorrect." },
            { id: "message5", title: "Inaccurate Company Description", description: "The description does not accurately represent the company profile." },
            { id: "message6", title: "Incorrect Company Registration Number", description: "The registration number provided is incorrect." },
            { id: "message7", title: "Inaccurate Pitch Information", description: "The pitch does not reflect the correct product details." },
            { id: "message8", title: "Incorrect Data Room Documents", description: "The uploaded documents do not match the company profile." },
        ];
    } else if (type === "investor") {
        return [
            { id: "message1", title: "Incorrect Profile Image", description: "The uploaded profile image does not match the investor." },
            { id: "message2", title: "Incorrect Name", description: "The name provided does not match the investor." },
            { id: "message3", title: "Incorrect Nationality", description: "The Nationality provided is incorrect." },           
        ];
    } else if (type === "funding") {
        return [
            { id: "message1", title: "Access Level Insufficient", description: "Your current access level does not permit viewing this document." },
            { id: "message2", title: "Confidential Document", description: "This document contains sensitive information and is restricted to approved investors only." },
        ];
    }
    return [];
}

export function RejectMessageForm({ className, type, request, handleReject, email, companyId }: RejectMessageFormProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let messages: Message[] = getRejectMessage(type ?? "");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            messages: messages.reduce((acc, message) => {
                acc[message.id] = false;
                return acc;
            }, {} as Record<string, boolean>),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const checkedMessages = messages.filter((message) => values.messages[message.id]);

        if (checkedMessages.length === 0) {
            setErrorMessage("⚠️ Please select at least one reason for rejection.");
            return;
        }

        setErrorMessage(null);

        if (type === "company") {
            const user = await getUserByCompanyId(request.companyId);
            await sendEmailCompanyStatus(request.company, user.email, "rejected", checkedMessages);
            handleReject();
        } else if (type === "investor") {
            await sendEmailInvestorStatus(request.investor, "rejected", checkedMessages);
            handleReject();
        } else if (type === "funding") {
            const investorProfile = request.investorProfile;
            if (companyId !== undefined) {
                const company = await getCompanyById(companyId);
                if (company) {
                    await sendEmailDataroomRequestStatus(request, email ?? "", "rejected", checkedMessages, company, investorProfile);
                    handleReject();
                } else {
                    setErrorMessage("⚠️ Company information is missing.");
                }
            }
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`grid gap-4 ${className}`}>
                {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
                <div className="grid grid-cols-2 gap-2">
                    {messages.map((message) => (
                        <FormField
                            key={message.id}
                            control={form.control}
                            name={`messages.${message.id}`}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <CheckboxMessage
                                            title={message.title}
                                            description={message.description}
                                            checked={field.value ?? false}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

