export type AdminAdvisers = Prisma.UserGetPayload<{
  select: {
    id: string;
    name: string;
    email: string;
    image: string;
    
  };
}>;
