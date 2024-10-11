"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileImageForm } from "@/components/ProfileImageForm";
import { CalendarForm } from "@/components/CalendarForm";
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
import Pitch from "./Pitch";

// Combine schemas
const formSchema = z.object({
  logo: z.string().min(1, "Logo is required"),
  banner: z.string().min(1, "Banner is required"),
  name: z.string().min(1, "Company name is required"),
  abbr: z.string().min(1, "Abbreviation is required"),
  description: z.string().min(1, "Description is required"),
  fundingTarget: z.number().min(0, "Funding target cannot be negative"),
  minInvest: z.number().min(0, "Minimum investment cannot be negative"),
  maxInvest: z.number().min(0, "Maximum investment cannot be negative"),
  deadline: z.date({ required_error: "Deadline is required." }),
  securityType: z.string().min(1, "Security type is required"),
  priceShare: z.number().min(0, "Price per share cannot be negative"),
  // pitch: z.string().min(1, "Pitch is required"),
  status: z.boolean().default(false),
}).refine((data) => data.minInvest <= data.maxInvest, {
  message: "Minimum investment cannot be greater than maximum investment.",
  path: ["minInvest"],
})
  .refine((data) => data.minInvest <= data.fundingTarget, {
    message: "Minimum investment cannot be greater than the funding target.",
    path: ["minInvest"],
  })
  .refine((data) => data.maxInvest <= data.fundingTarget, {
    message: "Maximum investment cannot be greater than the funding target.",
    path: ["maxInvest"],
  })
  .refine((data) => data.priceShare <= data.fundingTarget, {
    message: "Price per share cannot be more than the funding target",
    path: ["priceShare"]
  });

export function CompanyRegisterForm() {
  const { handleStepChange } = useFormState();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: "",
      banner: "",
      name: "",
      abbr: "",
      description: "",
      fundingTarget: 0,
      minInvest: 0,
      maxInvest: 0,
      deadline: undefined,
      securityType: "",
      priceShare: 0,
      // pitch: "",
    },
  });

  const setBannerImage = (fileName: string) => {
    form.setValue("banner", fileName);
    form.trigger("banner");
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitting form with values:", values);
    handleStepChange(1);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 flex flex-col items-center">
            <div>
              <ProfileImageForm setProfileImage={(file) => form.setValue("logo", file)} />
            </div>
            <div className="mt-3">
              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormMessage />
                )}
              />
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
              <BannerImageForm setBannerImage={setBannerImage} />
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="banner"
                  render={() => (
                    <FormMessage />
                  )}
                />
              </div>
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        data-id="company-input"
                        className="bg-[#bfbfbf]"
                        placeholder="companyName"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* abbreviation */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="abbr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Company Abbreviation</FormLabel>
                    <FormControl>
                      <Input
                        data-id="abbr-input"
                        className="bg-[#bfbfbf]"
                        placeholder="XXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Funding Goal */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="fundingTarget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Funding Goal</FormLabel>
                    <FormControl>
                      <Input
                        data-id="funding-input"
                        className="bg-[#bfbfbf]"
                        placeholder="$"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          field.onChange(value ? parseFloat(value) : 0);
                        }}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Minimum Investment */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="minInvest"
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          field.onChange(value ? parseFloat(value) : 0);
                        }}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Maximum Investment */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="maxInvest"
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          field.onChange(value ? parseFloat(value) : 0);
                        }}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Date (using CalendarForm) */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <CalendarForm label={"Deadline"} field={field} canSetMoreThanToday={true} />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Price per Share */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="priceShare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">
                      Price per Share
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-id="share-input"
                        type="number"
                        className="bg-[#bfbfbf]"
                        placeholder="$"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          field.onChange(value ? parseFloat(value) : 0);
                        }}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
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
            <div className="col-start-1">
              <Button
                onClick={() => handleStepChange(-2)}
                className="
                  w-[211px] h-[45px] 
                  bg-gray-200 text-gray-700 
                  rounded-lg shadow-md 
                  hover:bg-gray-300 hover:text-gray-900 
                  font-bold text-base 
                  transition duration-200 ease-in-out
                "
              >
                Back
              </Button>
            </div>
            <div className="col-start-3">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
