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
import { Company } from "@/types/company";


interface RejectButtonProps {
    handleReject: () => void;
    type: "investor" | "company" | "funding" | null;
    request: any;
    email?: string;
}

export function RejectButton({ type, request, email, handleReject }: RejectButtonProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    let messagesForm: { id: string; title: string; description: string; }[] = [];

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

                    <RejectMessageForm className="company-form" type={type} request={request} email={email} handleReject={handleReject} />

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

                <RejectMessageForm className="px-4" type={type} request={request} email={email} handleReject={handleReject} />

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
