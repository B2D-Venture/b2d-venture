"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarForm, CalendarFormSchema } from "@/components/CalendarForm";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

// Combine schemas
const formSchema = CalendarFormSchema.extend({
  fundingGoal: z.string(),
  minimumInvestment: z.string(),
  maximumInvestment: z.string(),
  pricePerShare: z.string(),
});

export function RaiseFundingForm({ className }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fundingGoal: "",
      minimumInvestment: "",
      maximumInvestment: "",
      dob: undefined,
      pricePerShare: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`grid gap-4 ${className}`}
      >
        <div className="grid gap-4">
          {/* Funding Goal */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="fundingGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">Funding Goal</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf]"
                      placeholder="$"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* Minimum Investment */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="minimumInvestment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">
                    Minimum Investment
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf]"
                      placeholder="$"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* Maximum Investment */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="maximumInvestment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">
                    Maximum Investment
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf]"
                      placeholder="$"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* Date (using CalendarForm) */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <CalendarForm label={"Date"} field={field} />
              )}
            />
          </div>
          {/* Price per Share */}
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="pricePerShare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px]">Price per Share</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#bfbfbf]"
                      placeholder="$"
                      type="number"
                      {...field}
                    />
                  </FormControl>
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
