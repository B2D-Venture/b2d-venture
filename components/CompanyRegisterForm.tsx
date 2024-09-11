"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageForm } from "@/components/UploadImageForm";
import { CalendarForm, CalendarFormSchema } from "@/components/CalendarForm";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
              <ImageForm />
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
            {/* Company Name */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>Abbreviation</FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input className="bg-[#bfbfbf]" {...field} />
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
                    <FormLabel>Funding Goal</FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>Minimum Investment</FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>Maximum Investment</FormLabel>
                    <FormControl>
                      <Input
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
                render={({ field }) => <CalendarForm field={field} />}
              />
            </div>
            {/* Security Type */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="securityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Type</FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>Price per Share</FormLabel>
                    <FormControl>
                      <Input
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
              <h2 className="text-2xl text-gray-700">Documentations</h2>
              <p className="text-sm text-gray-500 ml-2">(optional)</p>
            </div>
            <div className="col-span-1">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="Documentations"></Label>
                <Input
                  className="bg-[#bfbfbf]"
                  id="Documentations"
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
