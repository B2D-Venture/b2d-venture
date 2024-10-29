"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarForm } from "@/components/CalendarForm";
import { addRaiseFunding, addRaiseFundingRequest } from "@/lib/db/index";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RaiseFundingFormProps extends React.ComponentProps<"form"> {
  companyId: number;
}

// Combine schemas
const formSchema = z.object({
  valuation: z
    .number({
      required_error: "Valuation is required.",
    })
    .min(0, { message: "Valuation cannot be negative" }),
  fundingTarget: z
    .number({
      required_error: "Funding Target is required.",
    })
    .min(0, { message: "Funding Target cannot be negative" }),
  priceShare: z
    .number({
      required_error: "Price Per Share is required.",
    })
    .min(0, { message: "Price Per Share cannot be negative" }),
  minInvest: z
    .number({
      required_error: "Minimum Investment is required.",
    })
    .min(0, { message: "Minimum Investment cannot be negative" }),
  maxInvest: z
    .number({
      required_error: "Maximum Investment is required.",
    })
    .min(0, { message: "Maximum Investment cannot be negative" }),
  deadline: z.date({ required_error: "Investment Deadline is required." }),
});

export function RaiseFundingForm({
  className,
  companyId,
}: RaiseFundingFormProps) {
  console.log("Company Id Raise:", companyId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valuation: undefined,
      fundingTarget: undefined,
      priceShare: undefined,
      minInvest: undefined,
      maxInvest: undefined,
      deadline: undefined,
    },
  });

  function onSubmit(values: any) {
    console.log("RaiseFunding Value:", values);
    if (values.deadline) {
      values.deadline = new Date(values.deadline).toISOString();
    }

    addRaiseFunding(values, companyId)
      .then((raiseFundingId) => {
        addRaiseFundingRequest({ raiseFundingId });
      })
      .catch((err) => console.error("Error Raise Funding:", err));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`grid gap-4 ${className}`}
      >
        <div className="grid gap-4">
          {/* Valuation */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="valuation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">Valuation</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf] text-black"
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
          {/* Funding Target */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="fundingTarget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">Funding Target</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf] text-black"
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
          {/* Price per Share */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="priceShare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">Price per Share</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf] text-black"
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
          {/* Investment Deadline (using CalendarForm) */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <CalendarForm
                  label={"Investment Deadline"}
                  canSetMoreThanToday={true}
                  field={field}
                />
              )}
            />
          </div>
          {/* Minimum Investment */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="minInvest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">
                    Minimum Investment
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf] text-black"
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
          {/* Maximum Investment */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="maxInvest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">
                    Maximum Investment
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf] text-black"
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
          <div className="grid gap-2">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
