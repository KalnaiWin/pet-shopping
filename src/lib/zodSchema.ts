import * as z from "zod";

export const productsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .union([z.coerce.number().min(1, "Price must be at least 1"), z.null()])
    .optional(),
  maxPrice: z.coerce.number().min(1, "Price must be at least 1"),
  discount: z.coerce.number().min(0).optional(),
  status: z.boolean().default(false),

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
  delivery: z.string(),

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
    "Empty",
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

export const postSchema = z.object({
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
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  status: z.boolean().default(false),
  topic: z.enum(["New", "Issue", "Discuss", "Guide", "Empty"]),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  postId: z.string().uuid("Invalid post ID"),
});

export const reactionSchema = z.object({
  postId: z.string().uuid("Invalid post ID"),
  type: z.enum(["LIKE", "DISLIKE"]),
});
