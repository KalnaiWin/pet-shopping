- remove files from `public/*`
- clear `globals.css`
- clear `page.tsx`
- install shadcn `npx shadcn@latest init`
- install components `npx shadcn@latest add button label input sonner tabs dropdown-menu avatar table select dialog skeleton badge`
- show button and test `dev` server

== PART 1 ==

- install Better Auth `npm install better-auth`
- create `.env` and set Environment Variables
- create `lib/auth.ts`
- setup `postgres` database with `neon.tech`
- install prisma `npm install prisma --save-dev`
- initialize prisma `npx prisma init`
- create **Post** Model
- push database changes `npx prisma db push`
- add `generated` to `.gitignore`
- adjust **scripts** in `package.json`

- create single Prisma Client in `lib/prisma.ts`
- setup prisma adapter with better-auth
- generate auth tables `npx @better-auth/cli generate --output=auth.schema.prisma`
- make tweaks to `schema.prisma`
- quick walkthrough the models:
  - `User`
  - `Session`
  - `Account`
  - `Verification`
- push database changes `npx prisma db push`
- create Mount Handler in `app/api/auth/[...all]/route.ts`
- adjust `eslint.config.mjs` to ignore `/src/generated/**/**`
- create Client instance in `lib/auth-client.ts`

- Enable Email & Password Authentication
- Create Sign Up Page PT1
  - Create Form `components/register-form.tsx`
  - Log Form Values
- Setup Sonner
- Create Sign Up Page PT2
  - Add Form Validation
  - Destructure SignUp Function
  - Showcase `onError`
- OPTIONS - **minPasswordLength**
- Create Sign Up Page PT3
  - Sign Up _default automatically signs in the user_
- Show Session on Profile Page
- Show Data in Neon Dashboard
- Sign Out User
  - Destructure SignOut Function
  - Show Removed Cookies
- Create Sign In Page PT1
  - Create Form `components/login-form.tsx`
  - Log Form Values
  - Destructure SignIn Function
- Show Unauthorized on Profile Page
- Create Sign In Page PT2

  - Showcase `onError`
  - Sign In User

- Install theme: `npm i next-themes`
  

- FINISH PART 1

== PART 2 ==

- Showcase `onRequest` and `onResponse`
- Showcase Full Cycle Again
- Add Convenience Links for Auth Pages
- OPTIONS - **autoSignIn**
  - Showcase
- OPTIONS - **advanced.database.generateId**
  - Table IDs (change `schema.prisma` and push)
  - Showcase
  - Truncate Tables
- OPTIONS - **emailAndPassword.password**
  - Create User
  - Argon2 `npm install @node-rs/argon2`
  - Add to `next.config.ts`
  - Create Utilities `lib/argon2.ts`
  - Add to `lib/auth.ts`
  - Showcase
  - Truncate Tables
- Create User

- Sign Up User via SERVER ACTIONS
  - Create Action
  - Log Form Values
  - Sign Up User on Server
- Sign In User via SERVER ACTIONS
  - Create Action
  - Log Form Values
  - Sign In User on Server
  - Showcase - No Cookies
  - Manually Set Cookies
  - Showcase - Cookies
  - Passing Headers to Sign In
- PLUGINS - **nextCookies()**
- FINISH PART 2

== PART 3 ==

- Get Session on Client
  - Create Get Started Button
  - Destructure useSession
  - Showcase
- OPTIONS - **session.expiresIn**
  - Change to 15 seconds
  - Showcase
  - Change to 30 days
- Middleware
  - check for existence of a session cookie
  - showcase on auth routes
- Error Handling
- Hooks
  - Validate Email
  - Transform Name

== PART 4 ==

- Roles (Custom Method)
- Prisma
  - Add UserRole Enum
  - Push changes `npx prisma db push`
- User
  - Show field is added beacuse of `@default`
  - Truncate Tables
  - Create new User
- Profile PT1
  - Show role is not typed in `session.user`
- OPTIONS - **user.additionalFields**
  - Showcase `input` option
- Profile PT2
  - Show role is now typed and added to `session.user`
- ISSUE: Client Session has no Context of the Role
  - Cute circle on `get-started-button.tsx`
  - InferAdditionalFields plugin on Client
- Admin Panel
  - Create Page / Link
  - Manually Change Role
  - Update Middleware
  - Guard `/admin/dashboard`
  - List Users With Prisma Query
  - Delete User With Prisma Query
- Database Hooks

- Roles (Admin Plugin)
  - generate auth tables `npx @better-auth/cli generate --output=roles.schema.prisma`
  - compare and contrast (look at Schema section)
  - Push changes `npx prisma db push`
  - Create Permissions (No Posts)
  - Add to `lib/auth.ts` and `lib/auth-client.ts`
  - List Users With Admin Plugin
  - EXERCISE: Delete User With Admin Plugin
  - Change Permissions (With Posts)
- Create Dropdown to Change Role for Admins
- FINISH PART 4

== PART 5 ==

- Google OAuth
  - Create Buttons
- GitHub OAuth
- Account Linking
- Error Handling

  - `/auth/login/error`

- FINISH PART 5

== PART 6 ==

- Nodemailer
  - Create Template: `npm install nodemailer`, `npm install @types/nodemailer --save-dev`
- Verify Email
  - `emailAndPassword.requireEmailVerification`
  - `emailVerification`
  - Handle Error / Expired `/auth/verify`
  - Destructure sendVerificationEmail
  - Handle Login Page Not Verified
- Create Post Sign Up Page
  - Showcase
- Forgot Password
  - Page / Form / Success
- Reset Password
  - Page / Form / Success
  - Showcase
- FINISH PART 6

== PART 7 ==

- Show the image
- Updating User
  - change name / image
  - update hook
  - updating password
- Custom Sessions
  - type inference for plugins workaround
- PLUGINS - **Magic Link**
  - add to client instance
  - Create UI
  - adjust hooks
- Cookie Cache
- FINISH PART 7

THANK YOU FOR WATCHING
