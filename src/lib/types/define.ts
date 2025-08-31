import { Category, Prisma } from "@/generated/prisma";

export const CATEGORIES = [
  { value: "ProductsForCat", label: "Products for cat" },
  { value: "Insects", label: "Insects" },
  { value: "Mushroom", label: "Mushroom" },
  { value: "VitaminNutrition", label: "Vitamin & Nutrition" },
  { value: "Toys", label: "Toys" },
  { value: "Milk", label: "Milk" },
  { value: "HygieneBeauty", label: "Hygiene & Beauty" },
  { value: "Other", label: "Others" },
  { value: "Discount", label: "Discount" },
] as const;

export const categoryMap: Record<string, Category> = {
  ProductsForCat: Category.ProductsForCat,
  Insects: Category.Insects,
  Mushroom: Category.Mushroom,
  VitaminNutrition: Category.VitaminNutrition,
  Toys: Category.Toys,
  Milk: Category.Milk,
  HygieneBeauty: Category.HygieneBeauty,
  Other: Category.Other,
  Discount: Category.Discount,
};

export type PostWithCounts = Prisma.PostGetPayload<{
  include: {
    user: true;
    comments: { include: { user: true } };
    reactions: { include: { user: true } };
    _count: {
      select: {
        comments: true;
        reactions: true;
      };
    };
  };
}>;

export type PostCounts = Prisma.PostGetPayload<{
  include: {
    _count: {
      select: {
        comments: true;
        reactions: true;
      };
    };
  };
}>;

export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    user: true;
    comments: {
      include: { user: true };
    };
    reactions: { include: { user: true } };
    _count: {
      select: { comments: true; reactions: true };
    };
  };
}>;

export type PostWithInformation = Prisma.PostGetPayload<{
  select: {
    images: true;
    user: true;
    title: true;
    content: true;
    status: true;
    topic: true;
    comments: {
      include: {
        user: true;
      };
    };
    reactions: {
      include: {
        user: true;
      };
    };
    createdAt: true;
  };
}>;

export type ProductsCommentInfo = Prisma.ProductsGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    category: true;
    brand: true;
    price: true;
    maxPrice: true;
    images: true;
    expired: true;
    discount: true;
    delivery: true;
    stock: true;
    origin: true;
    comments: {
      select: {
        id: true;
        content: true;
        createdAt: true;
        user: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
      };
    };
  };
}>;
