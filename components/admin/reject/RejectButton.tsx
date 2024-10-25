"use client";

import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { RejectMessageForm } from "@/components/admin/reject/RejectMessageForm";
import { Cross2Icon } from "@radix-ui/react-icons";

interface RejectButtonProps {
    // handleReject: () => void;
    type: "investor" | "company" | "funding" | null;
}

export function RejectButton({ type }: RejectButtonProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    let messagesForm: { id: string; title: string; description: string; }[] = [];
    if (type === "company") {
        messagesForm = [
            { id: "message1", title: "Incorrect Logo", description: "The uploaded logo does not match the official company logo." },
            { id: "message2", title: "Incorrect Banner", description: "The uploaded banner does not meet branding guidelines." },
            { id: "message3", title: "Incorrect Company Name", description: "The company name is misspelled or incorrect." },
            { id: "message4", title: "Incorrect Company Abbreviation", description: "The company abbreviation is incorrect." },
            { id: "message5", title: "Inaccurate Company Description", description: "The description does not accurately represent the company profile." },
            { id: "message6", title: "Inaccurate Pitch Information", description: "The pitch does not reflect the correct product details." },
        ];
    } else if (type === "investor") {
        messagesForm = [
            { id: "message1", title: "Missing Identification", description: "The investor identification is incomplete or incorrect." },
            { id: "message2", title: "Incorrect Financial Information", description: "The financial information does not match verified records." },
            { id: "message3", title: "Missing Contact Details", description: "The investor contact details are incomplete." },
        ];
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="my-2 flex items-center justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="bg-red-500"
                            onClick={() => { }}>
                            <Cross2Icon className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Message for Reject</DialogTitle>
                        <DialogDescription>
                            Provide the necessary details to reject the creation.
                        </DialogDescription>
                    </DialogHeader>

                    <RejectMessageForm className="company-form" messages={messagesForm} />

                </DialogContent>
            </Dialog>
        );
    }

    // Mobile: Use Drawer
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="my-2 flex items-center justify-center">
                    {/* <Button
                        variant="ghost"
                        size="icon"
                        className="bg-red-500"
                        onClick={handleReject}>
                        <Cross2Icon className="h-4 w-4" />
                    </Button> */}
                </div>
            </DialogTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Raise Funding</DrawerTitle>
                    <DrawerDescription>
                        Provide the necessary details to raise funding.
                    </DrawerDescription>
                </DrawerHeader>

                <RejectMessageForm className="px-4" messages={messagesForm} />

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
