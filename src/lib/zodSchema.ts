import * as z from "zod";

export const productsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  discount: z.coerce.number().min(0).optional(),
  status: z
    .string()
    .transform((val) => val === "on")
    .pipe(z.boolean()),

  // handle JSON string from hidden input
  images: z
    .string()
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    })
    .pipe(z.array(z.string()).min(1, "There must be at least one image")),

  // delivery as a single string
  delivery: z
    .string()
    .optional()
    .transform((val) => (val ? [val] : [])),

  stock: z.coerce.number().min(1, "Price must be at least 1"),
  category: z.enum([
    "PATE",
    "Seed",
    "ToiletSand",
    "Vitamin",
    "Toys",
    "Milk",
    "HygieneBeauty",
    "Other",
    "Discount",
  ]),
  brand: z.enum([
    "Moochie",
    "Vemedim",
    "AllCare",
    "Meowcat",
    "Orgo",
    "CATCHY",
    "BioPharmachemie",
    "Ecopets",
    "Ganador",
    "DrKyan",
    "Minino",
    "Wanpy",
    "Hanvet",
    "MODERNPETGEL",
    "oliveessence",
  ]),
  origin: z.string(),
  expired: z.string(),
});

// export const productsSchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   price: z.number().min(1),
//   status: z.boolean(),
//   delivery: z.array(z.string()).optional().default([]),
//   images: z.array(z.string()).min(1, "There must be at least one images."),
//   discount: z.number().optional(),
//   stock: z
//     .string()
//     .transform((val) => parseInt(val, 10))
//     .pipe(z.number().min(0, "Stock quantity must be 0 or more")),
//   category: z.enum([
//     "PATE",
//     "Seed",
//     "ToiletSand",
//     "Vitamin",
//     "Toys",
//     "Milk",
//     "HygieneBeauty",
//     "Other",
//     "Discount",
//   ]),
//   brand: z.enum([
//     "Moochie",
//     "Vemedim",
//     "AllCare",
//     "Meowcat",
//     "Orgo",
//     "CATCHY",
//     "BioPharmachemie",
//     "Ecopets",
//     "Ganador",
//     "DrKyan",
//     "Minino",
//     "Wanpy",
//     "Hanvet",
//     "MODERNPETGEL",
//     "oliveessence",
//   ]),
//   origin: z.string(),
//   expired: z.string(),
// });
