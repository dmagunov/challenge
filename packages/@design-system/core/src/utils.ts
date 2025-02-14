import { twMerge, type ClassNameValue } from "tailwind-merge";
import { clsx } from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
function cn(...inputs: ClassNameValue[]): string {
  return twMerge(clsx(inputs));
}

export { cn, cva, type VariantProps };
