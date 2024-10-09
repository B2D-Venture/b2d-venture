"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileImageForm } from "@/components/ProfileImageForm";
import { CalendarForm, CalendarFormSchema } from "@/components/CalendarForm";
import { useFormState } from "./FormContext"

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
  firstName: z.string().min(1, "First name is required").max(255, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(255, "Last name is too long"),
  nationalIdCard: z.string().regex(/^\d+$/, "National ID card must be numeric").max(15, "National ID Card is too long"),
  emailAddress: z.string().email("Invalid email address").min(1, "Email is required"),
  nationality: z.string().min(1, "Nationality is required").max(60, "Nationality is too long"),
  netWorth: z.string().regex(/^\d+$/, "Net worth must be a valid number").min(1, "Net worth is required"),
});

export function InvestorRegisterForm() {
  const { handleStepChange } = useFormState();
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
    handleStepChange(2)
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
                      <Input data-id="firstname-input" className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input data-id="lastname-input" className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input data-id="nid-input" className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input data-id="email-input" className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Nationality */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Nationality</FormLabel>
                    <FormControl>
                      <Input data-id="national-input" className="bg-[#bfbfbf]" {...field} />
                    </FormControl>
                    <FormMessage />
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
                        data-id="net-input"
                        className="bg-[#bfbfbf]"
                        placeholder="$"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between items-center col-span-4 mt-4">
              <Button
                onClick={() => handleStepChange(-1)}
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

              <Button
                type="submit"
                className="w-[211px] h-[45px] bg-black text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-200 ease-in-out font-bold"
              >
                Create Profile
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
