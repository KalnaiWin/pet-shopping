import { Role } from "@/generated/prisma";
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  posts: [
    "create",
    "share",
    "read",
    "update",
    "delete",
    "update:own",
    "delete:own",
  ],
} as const;

export const ac = createAccessControl(statement); // action

export const roles = {
    [Role.USER]: ac.newRole({
        posts: ["create", "delete:own", "read", "update:own"]
    }),
    [Role.ADMIN]: ac.newRole({
        ...adminAc.statements,
        posts: ["create", "delete", "delete:own", "read", "update", "update:own"]
    })
}

// Plugins - Authorization - Admin - Permission
