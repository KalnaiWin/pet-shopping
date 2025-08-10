import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validGmail() {
  const gmails = ["gmail.com"];

  if (process.env.NODE_ENV === "development") {
    gmails.push("example.com");
  }

  return gmails;
}

export function normailizeName(name: string) {
  return name       
        .trim()
        .replace(/\s+/g, " ") // delete space
        .replace(/[^a-zA-Z\s;-]/g, "") // delete keys are not word
        .replace(/\b\w/g, (char) => char.toUpperCase()); // uppercase each first letter of word
}
