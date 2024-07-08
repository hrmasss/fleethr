# FleetHR

FleetHR is a multi-tenant HR SaaS built for small and mid-sized teams that needed one place to manage everyday people operations without building a heavyweight enterprise stack around it.

The product focused on the operational core of HR work: employee records, attendance, departments, leave handling, payroll workflows, notices, role management, and organization-specific setup. The repo is an older product build, but it still represents one of my first complete end-to-end SaaS systems rather than a narrow demo or UI exercise.

## What the product covered

- Organization-aware workspaces
- Employee records and department management
- Attendance and leave workflows
- Payroll-oriented admin surfaces
- Role and permission handling
- Notices and internal communication flows
- Auth, uploads, and email-based product plumbing

## Stack

- Next.js 14
- TypeScript
- Prisma
- tRPC
- NextAuth
- Tailwind CSS
- Mantine
- Zod
- UploadThing
- Resend
- PostgreSQL

## Architecture notes

FleetHR was built as a product-shaped codebase rather than a landing-page-first project. The app is split into:

- Public-facing pages under the marketing shell
- Auth flows for login/logout
- Protected app routes for HR operations
- API endpoints for auth, tRPC, and uploads
- Prisma-backed data modeling for tenant-aware entities

The product surface was organized around real operator workflows instead of isolated feature experiments, which is why the repo remains useful as historical reference material.

## Local development

1. Clone the repo.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

4. Start PostgreSQL and update `.env` with the correct connection values.
5. Push the schema:

   ```bash
   npm run db:push
   ```

6. Start the app:

   ```bash
   npm run dev
   ```

## Useful scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:e2e
npm run db:studio
```

## Notes

- The deployment target for this build was Vercel.
- The codebase includes automated tests and Playwright coverage.
- I keep this repo public as an older milestone project that shows how I approached full-product delivery early on.
