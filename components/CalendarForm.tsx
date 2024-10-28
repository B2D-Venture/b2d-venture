"use client";

import {
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useState } from "react";
import { useEffect } from "react";

export const CalendarFormSchema = z.object({
  dob: z.date({
    required_error: "A date is required.",
  }),
});

interface CalendarFormProps {
  label: string;
  field: {
    onChange: (date: Date | undefined) => void;
    value: Date | undefined;
  };
  canSetMoreThanToday?: boolean;
}


export function CalendarForm({ label, field, canSetMoreThanToday = false }: CalendarFormProps) {
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (
      selectedDay !== undefined &&
      selectedMonth !== undefined &&
      selectedYear !== undefined
    ) {
      const newDate = new Date(Date.UTC(selectedYear, selectedMonth - 1, selectedDay, 0, 0, 0, 0));

      if (canSetMoreThanToday && newDate.getTime() <= today.getTime()) {
        setError("(Deadline cannot be today or earlier.)");
        field.onChange(undefined);
      } else if (newDate.getTime() !== (field.value?.getTime() || 0)) {
        field.onChange(newDate);
        setError("");
      }
    } else {
      field.onChange(undefined);
      console.log("Date cleared");
    }
  }, [selectedDay, selectedMonth, selectedYear, canSetMoreThanToday, field, today]);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedDay(value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedMonth(value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedYear(value);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  let years: number[] = [];
  if (!canSetMoreThanToday) {
    years = Array.from({ length: 100 }, (_, i) => today.getFullYear() - 18 - i);
  } else {
    years = Array.from({ length: 5 }, (_, i) => today.getFullYear() + i);
  }

  return (
    <FormItem className="flex flex-col">
      <FormLabel className="text-[20px]">{label}</FormLabel>
      <div className="flex gap-4 mb-2">
        <select
          value={selectedDay || ""}
          onChange={handleDayChange}
          className="border border-gray-700 rounded p-2 text-black bg-gray-300"
        >
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth || ""}
          onChange={handleMonthChange}
          className="border border-gray-700 rounded p-2 text-black bg-gray-300"
        >
          <option value="">Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedYear || ""}
          onChange={handleYearChange}
          className="border border-gray-700 rounded p-2 text-black bg-gray-300"
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}  
            </option>
          ))}
        </select>
      </div>
      <FormMessage />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </FormItem>
  );
}
