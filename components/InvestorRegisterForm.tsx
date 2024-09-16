"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileImageForm } from "@/components/ProfileImageForm";
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
  firstName: z.string(),
  lastName: z.string(),
  nationalIdCard: z.string(),
  emailAddress: z.string(),
  nationality: z.string(),
  netWorth: z.string(),
});

export function InvestorRegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalIdCard: "",
      emailAddress: "",
      nationality: "",
      netWorth: "",
      dob: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-5 gap-4">
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
          <div className="grid grid-cols-4 gap-4 col-span-4">
            {/* First Name */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">First Name</FormLabel>
                    <FormControl>
                      <Input className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Last Name */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Last Name</FormLabel>
                    <FormControl>
                      <Input className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* National ID Card */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="nationalIdCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">
                      National ID Card
                    </FormLabel>
                    <FormControl>
                      <Input className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Birthdate (using CalendarForm) */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <CalendarForm label={"Birthdate"} field={field} />
                )}
              />
            </div>
            {/* Email Address */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Email Address</FormLabel>
                    <FormControl>
                      <Input className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Nationality Type */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Nationality</FormLabel>
                    <FormControl>
                      <Input className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Net Worth Investment */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="netWorth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Net Worth</FormLabel>
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
            <div className="flex justify-end items-end col-span-1 col-start-4">
              <Button type="submit" className="w-full">Create Profile</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
