"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import CheckboxMessage from "@/components/admin/reject/element/CheckboxMessage";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
} from "@/components/ui/form";

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
    messages: Message[];
};

export function RejectMessageForm({ className, messages }: RejectMessageFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            messages: messages.reduce((acc, message) => {
                acc[message.id] = false;
                return acc;
            }, {} as Record<string, boolean>),
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const checkedMessages = messages.filter((message) => values.messages[message.id]);

        console.log("Checked Messages:");
        checkedMessages.forEach(({ title, description }) => {
            console.log(`Title: ${title}, Description: ${description}`);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`grid gap-4 ${className}`}>
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

