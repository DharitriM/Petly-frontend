import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const petTypes = ['Dog', 'Cat', 'Fish', 'Bird', 'Other'];
export const productCategories = ['Food', 'Toys', 'Accessories', 'Medicines', 'Grooming', 'Training', 'Other'];