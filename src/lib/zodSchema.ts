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
    "ProductsForCat",
    "Insects",
    "Mushroom",
    "VitaminNutrition",
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
    "Empty"
  ]),
  origin: z.string(),
  expired: z.string(),
});

export const bannerSchema = z.object({
  title: z.enum([
    "ProductsForCat",
    "Insects",
    "Mushroom",
    "VitaminNutrition",
    "Toys",
    "Milk",
    "HygieneBeauty",
    "Other",
    "Discount",
  ]),
  imageString: z.string(),
});
