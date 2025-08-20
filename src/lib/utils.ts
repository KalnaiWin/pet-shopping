import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validGmail() {
  const gmails = [
    "gmail.com",
    "vhs8f78wh.com",
    "vsudgh8w833.com",
    "sjgnks9787.com",
  ];

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

export function maskAfterAt(input: string) {
  const atIndex = input.indexOf("@");

  if (atIndex === -1) return input;

  const beforeAt = input.slice(0, atIndex + 1);
  const afterAt = input.slice(atIndex + 1).replace(/./g, "*");

  return beforeAt + afterAt;
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const slug = (label: string) => {
  return label.toLocaleLowerCase().replace(/\s+/g, "-");
};

export const badges = (name: string) => {
  if(name === "Moochie" ) return "bg-[#fff700]";
  else if(name === "Vemedim") return "bg-[#59ff00]";
  else if(name === "AllCare") return "bg-[#ff0000]";
  else if(name === "Meowcat") return "bg-[#d4d4d4] ";
  else if(name === "Orgo") return "bg-[#456789]";
  else if(name === "CATCHY") return "bg-[#9b0000]";
  else if(name === "BioPharmachemie") return "bg-[#00bbff]";
  else if(name === "Ecopets") return "bg-[#00ff2a]";
  else if(name === "Ganador") return "bg-[#e1c300]";
  else if(name === "DrKyan") return "bg-[#fbff00]";
  else if(name === "Minino") return "bg-[#d78100]";
  else if(name === "Wanpy") return "bg-[#ff4800]";
  else if(name === "Hanvet") return "bg-[#ff91f0]";
  else if(name === "MODERNPETGEL") return "bg-[#00ffae]";
  else if(name === "oliveessence") return "bg-[#00801a]";
  else return "";
}

export const badgesCategory = (name: string) => {
  if(name === "ProductsForCat" ) return "bg-[#ffdca6]";
  else if(name === "Insects") return "bg-[#5bae23]";
  else if(name === "Mushroom") return "bg-[#ff6a00]";
  else if(name === "VitaminNutrition") return "bg-[#00f2ff]";
  // else if(name === "Toys") return "bg-#ffb8f8]";
  else if(name === "Milk") return "bg-[#d2e9ff] ";
  else if(name === "HygieneBeauty") return "bg-[#001aff]";
  else if(name === "Other") return "bg-[#464646]";
  else if(name === "Discount") return "bg-[#c40000]";
  else return "bg-[#917343]"
}

