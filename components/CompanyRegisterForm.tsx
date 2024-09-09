"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ImageForm } from "@/components/UploadImageForm";

const formSchema = z.object({
  CompanyName: z.string(),
  Abbreviation: z.string(),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CompanyName: "",
      Abbreviation: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="flex gap-4">
          <ImageForm/>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
