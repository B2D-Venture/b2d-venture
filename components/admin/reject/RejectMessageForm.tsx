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
import {
    getInvestmentRequest,
    getCompanyRequest,
    getInvestorRequest,
    getRaiseFundingRequests,
    rejectCompanyRequest,
    getUserByCompanyId,
} from "@/lib/db/index";

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
    handleReject: () => void;
    // messages: Message[];
};

const sendEmailCompanyStatus = async (company: any, email: string, status: "approved" | "rejected") => {
    const messages = {
      approved: "Your company profile has been successfully created.",
      rejected: "Thank you for your request",
    };
  
    try {
      const response = await fetch("/api/mail/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messages[status],
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

const getRejectMessage = (type: string) => {
    if (type === "company") {
        return [
            { id: "message1", title: "Incorrect Logo", description: "The uploaded logo does not match the official company logo." },
            { id: "message2", title: "Incorrect Banner", description: "The uploaded banner does not meet branding guidelines." },
            { id: "message3", title: "Incorrect Company Name", description: "The company name is misspelled or incorrect." },
            { id: "message4", title: "Incorrect Company Abbreviation", description: "The company abbreviation is incorrect." },
            { id: "message5", title: "Inaccurate Company Description", description: "The description does not accurately represent the company profile." },
            { id: "message6", title: "Inaccurate Pitch Information", description: "The pitch does not reflect the correct product details." },
        ];
    } else if (type === "investor") {
        return [
            { id: "message1", title: "Missing Identification", description: "The investor identification is incomplete or incorrect." },
            { id: "message2", title: "Incorrect Financial Information", description: "The financial information does not match verified records." },
            { id: "message3", title: "Missing Contact Details", description: "The investor contact details are incomplete." },
        ];
    }
    return [];
}

export function RejectMessageForm({ className, type, request, handleReject }: RejectMessageFormProps) {
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

        console.log("Checked Messages: ", checkedMessages);
        checkedMessages.forEach(({ title, description }) => {
            console.log(`Title: ${title}, Description: ${description}`);
        });

        handleReject();
        // if (type === "company") {
        //     // const companyRequests = await getCompanyRequest();
        //     // const investorRequests = await getInvestorRequest();
        //     // const investmentRequests = await getInvestmentRequest();
        //     // const raiseFundingRequests = await getRaiseFundingRequests();
        //     rejectCompanyRequest(request.id);
        //     const user = await getUserByCompanyId(request.companyId);
        //     // await sendEmailCompanyStatus(request.company, user.email, "rejected");
        //     console.log("Rejected Company Request");

        // } else if (type === "investor") {
        //     console.log("Rejected Investor Request");
        // }
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

