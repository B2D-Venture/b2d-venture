"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";


interface CalendarFormProps {
  label: string;
  field: {
    onChange: (date: Date | undefined) => void;
    value: Date | undefined;
  };
}

export function CalendarForm({ label, field }: CalendarFormProps) {
  const handleDateChange = (date: Date | undefined) => {
    field.onChange(date);
  };

  return (
    <FormItem className="flex flex-col">
      <FormLabel className="text-[20px]">{ label }</FormLabel>
      <Popover modal={true} >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              data-id="date"
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal bg-[#bfbfbf]",
                !field.value && "text-muted-foreground text-black"
              )}
            >
              {field.value ? format(field.value, "PPP") : "Pick a Date"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-100 text-black" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={handleDateChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
