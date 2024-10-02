"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileImageForm } from "@/components/ProfileImageForm";
import { CalendarForm, CalendarFormSchema } from "@/components/CalendarForm";
import { BannerImageForm } from "@/components/BannerImageForm";
import { useFormState } from "./FormContext"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Description } from "@radix-ui/react-dialog";
import data from '../node_modules/ansi-escapes/node_modules/type-fest/source/readonly-deep.d';

// Combine schemas
const formSchema = CalendarFormSchema.extend({
  companyName: z.string(),
  abbreviation: z.string(),
  description: z.string(),
  fundingGoal: z.string(),
  minimumInvestment: z.string(),
  maximumInvestment: z.string(),
  pricePerShare: z.string(),
  securityType: z.string(),
});

export function CompanyRegisterForm() {
  const { handleStepChange } = useFormState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      abbreviation: "",
      description: "",
      fundingGoal: "",
      minimumInvestment: "",
      maximumInvestment: "",
      dob: undefined,
      pricePerShare: "",
      securityType: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 flex flex-col items-center">
            <div>
              <ProfileImageForm />
            </div>
            <div className="text-[12px] text-[#949191] mt-5">
              <p>
                Please upload only a profile image of a real person. Do not
                upload images of cartoons, animals, objects, or any other type
                of image. Non-compliant uploads may be rejected.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-3">
          <div className="col-span-3">
              <BannerImageForm />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Name</FormLabel>
                    <FormControl>
                      <Input
                        data-id="company-input"
                        className="bg-[#bfbfbf]"
                        placeholder="companyName"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* abbreviation */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="abbreviation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Abbreviation</FormLabel>
                    <FormControl>
                      <Input
                        data-id="abbr-input"
                        className="bg-[#bfbfbf]"
                        placeholder="XXXX"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* description */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Description</FormLabel>
                    <FormControl>
                      <Input data-id="desc-input" className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Funding Goal */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="fundingGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Funding Goal</FormLabel>
                    <FormControl>
                      <Input
                        data-id="funding-input"
                        className="bg-[#bfbfbf]"
                        placeholder="$"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Minimum Investment */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="minimumInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">
                      Minimum Investment
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-id="min-input"
                        className="bg-[#bfbfbf]"
                        placeholder="$"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Maximum Investment */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="maximumInvestment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">
                      Maximum Investment
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-id="max-input"
                        className="bg-[#bfbfbf]"
                        placeholder="$"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Date (using CalendarForm) */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <CalendarForm label={"Deadline"} field={field} />
                )}
              />
            </div>
            {/* Security Type */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="securityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Security Type</FormLabel>
                    <FormControl>
                      <Input
                        data-id="sec-input"
                        className="bg-[#bfbfbf]"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Price per Share */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="pricePerShare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">
                      Price per Share
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-id="share-input"
                        className="bg-[#bfbfbf]"
                        placeholder="$"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3 flex items-center">
              <h2 className="text-3xl text-gray-700">Documentations</h2>
              <p className="text-[12px] text-gray-500 ml-2">(optional)</p>
            </div>
            <div className="col-span-1">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="Documentations"></Label>
                <Input
                  className="bg-[#bfbfbf]"
                  id="Documentations"
                  type="file"
                  accept="application/pdf"
                />
                <FormDescription>Please upload PDF files only.</FormDescription>
              </div>
            </div>
            <div className="col-span-2">
            </div>
            <div className="col-start-3">
              <Button onClick={() => handleStepChange(1)} type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
