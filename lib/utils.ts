import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateIntegerId(id: any): boolean {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 && parsedId <= 2147483647;
}
