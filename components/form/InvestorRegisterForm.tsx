"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileImageForm } from "@/components/form/elements/ProfileImageForm";
import { CalendarForm } from "@/components/form/elements/CalendarForm";
import { useFormState } from "../FormContext";
import {
  addInvestor,
  addInvestorRequest,
  changeToInvestorRole,
} from "@/lib/db/index";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Combine schemas
const formSchema = z.object({
  profileImage: z.string().min(1, "Profile image is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name is too long"),
  nationalId: z
    .string()
    .regex(/^\d+$/, "National ID card must be numeric")
    .max(15, "National ID Card is too long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  nationality: z
    .string()
    .min(1, "Nationality is required")
    .max(60, "Nationality is too long"),
  networth: z
    .number({
      required_error: "Net worth is required.",
    })
    .min(0, { message: "Net worth cannot be negative" }),
  birthDate: z.date({ required_error: "Birth date is required." }),
});

export function InvestorRegisterForm({ onRoleChange }: { onRoleChange: () => void }) {
  const { handleStepChange } = useFormState();
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImage: "",
      firstName: "",
      lastName: "",
      nationalId: "",
      email: userEmail,
      nationality: "",
      networth: undefined,
      birthDate: undefined,
    },
  });

  const onSubmit = (values: any) => {
    if (values.birthDate) {
      values.birthDate = new Date(values.birthDate).toISOString();
    }

    addInvestor(values)
      .then((investorId) => {
        changeToInvestorRole({ email: values.email, investor_id: investorId });
        addInvestorRequest({ investorId });
        onRoleChange();
        handleStepChange(2);
      })
      .catch((err) => console.error("Error adding investor:", err));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 flex flex-col items-center">
            <div>
              <ProfileImageForm
                setProfileImage={(file) => form.setValue("profileImage", file)}
              />
            </div>
            <FormField
              control={form.control}
              name="profileImage"
              render={() => <FormMessage />}
            />
            <div className="text-sm bg-[#c4c4c3d2] text-gray-600 mt-4 text-center px-4 rounded-md">
              <p className="font-medium leading-relaxed">
                Please upload a profile image of a real person. Non-compliant
                uploads, including images of cartoons, animals, or objects, may
                be rejected.
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
                      <Input
                        data-id="firstname-input"
                        className="bg-[#bfbfbf]"
                        {...field}
                      />
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
                      <Input
                        data-id="lastname-input"
                        className="bg-[#bfbfbf]"
                        {...field}
                      />
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
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">
                      National ID Card
                    </FormLabel>
                    <FormControl>
                      <Input
                        data-id="nid-input"
                        className="bg-[#bfbfbf]"
                        {...field}
                      />
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
                name="birthDate"
                render={({ field }) => (
                  <CalendarForm label={"Birthdate"} field={field} />
                )}
              />
            </div>
            {/* Email Address */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        data-id="email-input"
                        className="bg-[#bfbfbf] cursor-not-allowed"
                        {...field}
                        disabled
                      />
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
                      <Input
                        data-id="national-input"
                        className="bg-[#bfbfbf]"
                        {...field}
                      />
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
                name="networth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[20px]">Net Worth</FormLabel>
                    <FormControl>
                      <Input
                        data-id="net-input"
                        className="bg-[#bfbfbf]"
                        placeholder="$"
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          field.onChange(value ? parseFloat(value) : 0);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between items-center col-span-4 mt-4">
              <Button
                onClick={() => {
                  const confirmBack = window.confirm(
                    "⚠ The information will be lost when you go back. Are you sure?",
                  );
                  if (confirmBack) {
                    handleStepChange(-1);
                  }
                }}
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
