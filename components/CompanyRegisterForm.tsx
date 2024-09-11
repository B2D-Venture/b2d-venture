"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  CompanyName: z.string(),
  Abbreviation: z.string(),
  Description: z.string(),
  Funding_Goal: z.string(),
  Minimum_Investment: z.string(),
  Maximum_Investment: z.string(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CompanyName: "",
      Abbreviation: "",
      Description: "",
      Funding_Goal: "",
      Minimum_Investment: "",
      Maximum_Investment: "",
      dob: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <ImageForm />
          </div>
          <div className="grid grid-cols-3 gap-4 col-span-3">
            {/* Company Name */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="CompanyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Fullname" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Abbreviation */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="Abbreviation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Abbreviation</FormLabel>
                    <FormControl>
                      <Input placeholder="GOOG" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Description */}
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Funding Goal */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="Funding_Goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="$" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Minimum Investment */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="Minimum_Investment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Investment</FormLabel>
                    <FormControl>
                      <Input placeholder="$" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Maximum Investment */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="Maximum_Investment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Investment</FormLabel>
                    <FormControl>
                      <Input placeholder="$" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* Date of Birth (using CalendarForm) */}
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <CalendarForm field={field} />
                )}
              />
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
