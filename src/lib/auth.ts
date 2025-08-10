import { prisma } from "./prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { normailizeName, validGmail } from "./utils";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // first step to verify by email to login
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const gmail = email.split("@")[1];
        const valid = validGmail();
        if (!valid.includes(gmail)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid gmail. Please use a valid gmail.",
          });
        }

        const name = normailizeName(ctx.body.name);
        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60 * 12,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [nextCookies()], // store info from sign-in support for login
});
