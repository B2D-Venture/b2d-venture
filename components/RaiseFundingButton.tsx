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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RaiseFundingForm } from "@/components/RaiseFundingForm";

export function RaiseFundingButton() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    // Desktop: Use Dialog
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="my-2 flex items-center justify-center">
            <Button className="w-[170px] text-[#423F3F] bg-[#AFAB9A] border-transparent text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-black hover:text-navbarTitle hover:border-transparent shadow-md hover:shadow-lg">
              Raise Funding
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Raise Funding</DialogTitle>
            <DialogDescription>
              Provide the necessary details to raise funding.
            </DialogDescription>
          </DialogHeader>
          <RaiseFundingForm />
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile: Use Drawer
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="my-2 flex items-center justify-center">
          <Button className="w-[170px] text-[#423F3F] bg-[#AFAB9A] border-transparent text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-black hover:text-navbarTitle hover:border-transparent shadow-md hover:shadow-lg">
            Raise Funding
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Raise Funding</DrawerTitle>
          <DrawerDescription>
            Provide the necessary details to raise funding.
          </DrawerDescription>
        </DrawerHeader>
        <RaiseFundingForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
