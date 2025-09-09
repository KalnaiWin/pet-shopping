import { prisma } from "./prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { normailizeName, validGmail } from "./utils";
import { Role } from "@/generated/prisma";
import { admin } from "better-auth/plugins/admin";
import { ac, roles } from "@/lib/permission";
import { SendEmailAction } from "@/actions/auth/send-email.action";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    secret: process.env.BETTER_AUTH_SECRET!,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // first step to verify by email to login
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await SendEmailAction({
        to: user.email,
        subject: "Reset your password.",
        meta: {
          description: "Click this link to change your password.",
          link: url,
        },
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60, // 1 hour
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await SendEmailAction({
        to: user.email,
        subject: "Verify Your Email Address",
        meta: {
          description: "Please verify your email to allow logging in",
          link: String(link),
        },
      });
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
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const adminEmails =
            process.env.ADMIN_EMAILS?.split(";").map((email) =>
              email.toLowerCase()
            ) ?? []; // Convert admin emails to lowercase too

          if (adminEmails.includes(user.email.toLowerCase())) {
            return { data: { ...user, role: Role.ADMIN } };
          }
          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"] as Array<Role>,
        input: false, // dont store it in sign up.action
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60 * 12,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  account: {
    // not allow user sign in many ways just one way
    accountLinking: {
      enabled: false,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: Role.USER,
      adminRoles: [Role.ADMIN],
      ac,
      roles,
    }),
  ], // store info from sign-in support for login
});
