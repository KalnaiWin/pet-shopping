import * as z from "zod";

export const productsSchema = z.object({
  name: z.string(),
  detail: z.string(),
  description: z.string(),
  price: z.number().min(1),
  status: z.boolean(),
  delivery: z.array(
    z.coerce
      .date()
      .min(new Date(), { message: "Delivery time must be in the future" })
  ),
  images: z.array(z.string().min(1, "There must be at least one images.")),
  discount: z.number(),
  stock: z.enum(["OutOfStock", "Available"]),
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
});
