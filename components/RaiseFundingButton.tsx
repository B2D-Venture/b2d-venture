"use client";

import React from "react";
import { IoWarning } from "react-icons/io5";
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
import { RaiseFundingForm } from "@/components/RaiseFundingForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RaiseFundingButton({
  canRaiseFunding,
  companyId,
}: {
  canRaiseFunding: boolean;
  companyId: number;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const buttonClasses =
    "w-[170px] text-[#423F3F] bg-[#AFAB9A] border-transparent text-center py-5 px-6 font-semibold rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-black hover:text-navbarTitle hover:border-transparent shadow-md hover:shadow-lg";

  if (isDesktop) {
    // Desktop: Use Dialog
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {canRaiseFunding ? (
          <DialogTrigger asChild>
            <div className="my-2 flex items-center justify-center">
              <Button className={buttonClasses}>Raise Funding</Button>
            </div>
          </DialogTrigger>
        ) : (
          <div className="my-2 flex items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className={`${buttonClasses} cursor-not-allowed`}>
                    Raise Funding
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex flex-col items-center p-2 border border-red-500 bg-red-50 text-red-700 rounded-lg shadow-md">
                    <div className="flex items-center">
                      <IoWarning className="text-xl mr-2" />
                      <p className="font-semibold">
                        You cannot raise funding at this time.
                      </p>
                    </div>
                    <p className="text-sm text-center">
                      The deadline has not passed, or your funding goal has not
                      been fully reached.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Raise Funding</DialogTitle>
            <DialogDescription>
              Provide the necessary details to raise funding.
            </DialogDescription>
          </DialogHeader>
          <RaiseFundingForm companyId={companyId} />
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile: Use Drawer
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {canRaiseFunding ? (
        <DialogTrigger asChild>
          <div className="my-2 flex items-center justify-center">
            <Button className={buttonClasses}>Raise Funding</Button>
          </div>
        </DialogTrigger>
      ) : (
        <div className="my-2 flex items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className={`${buttonClasses} cursor-not-allowed`}>
                  Raise Funding
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col items-center p-2 border border-red-500 bg-red-50 text-red-700 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <IoWarning className="text-xl mr-2" />
                    <p className="font-semibold">
                      You cannot raise funding at this time.
                    </p>
                  </div>
                  <p className="text-sm text-center">
                    The deadline has not passed, or your funding goal has not
                    been fully reached.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Raise Funding</DrawerTitle>
          <DrawerDescription>
            Provide the necessary details to raise funding.
          </DrawerDescription>
        </DrawerHeader>
        <RaiseFundingForm className="px-4" companyId={companyId} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
