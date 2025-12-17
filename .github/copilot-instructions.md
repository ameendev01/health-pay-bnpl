# Health Pay - AI Coding Instructions

You are an expert AI coding assistant for "Health Pay", a healthcare BNPL (Buy Now, Pay Later) platform.

## Tech Stack & Architecture
- **Framework:** Next.js 15 (App Router) with TypeScript.
- **Styling:** Tailwind CSS v4, Shadcn UI, HeroUI, Framer Motion.
- **Auth:** Clerk (Frontend/Middleware) synced to Supabase (Backend) via Webhooks.
- **Database:** Supabase (PostgreSQL).
- **State/Data:** React Query (`@tanstack/react-query`), React Hook Form + Zod.
- **Utilities:** `date-fns`, `dayjs`, `clsx`, `tailwind-merge`.

## Project Structure
- **`src/app`**: Routes, Layouts, and Providers only. Keep logic minimal here.
- **`src/features/<feature>`**: Business logic, hooks, types, and state (e.g., `src/features/patients/hooks/usePatients.ts`).
- **`src/components/<feature>`**: Feature-specific UI components (e.g., `src/components/patients/PatientCard.tsx`).
- **`src/components/ui`**: Reusable Shadcn UI primitives.
- **`src/server`**: Backend domain logic and integrations (e.g., Plaid).
- **`supabase/`**: Database migrations and type generation.

## Key Conventions

### 1. Authentication & User Data
- **Clerk is the Source of Truth for Auth:** Use `useAuth()` or `auth()` for session management.
- **Supabase is the Source of Truth for Data:** Users are synced to the `users` table in Supabase via Clerk Webhooks (`src/app/api/webhooks/route.ts`).
- **Do NOT use Supabase Auth UI:** Always use Clerk components (`<SignIn />`, `<UserButton />`).

### 2. Data Fetching & State
- **React Query:** Use `useQuery` and `useMutation` for server state.
- **Mock Data:** Be aware that some hooks (e.g., `usePatients.ts`) currently use mock data. When implementing real features, replace mocks with Supabase client calls.
- **Supabase Client:** Use `createClient` from `@supabase/ssr` in server components/actions.

### 3. Styling & UI
- **Tailwind v4:** Use the new v4 engine.
- **Utility Class Merging:** ALWAYS use the `cn()` utility from `src/lib/utils.ts` when merging classes.
  ```tsx
  <div className={cn("bg-white p-4", className)}>...</div>
  ```
- **Components:** Prefer Shadcn UI components for consistency.

### 4. Forms
- Use `react-hook-form` with `zod` resolvers.
- Define schemas in the same file or a dedicated `schemas.ts` within the feature folder.

### 5. Security
- **Middleware:** Routes are protected in `src/middleware.ts`.
- **Redirects:** Validate all redirects using `isAllowedRedirect` from `src/constants/redirectAllowlist.ts`.
- **Environment Variables:** Never hardcode secrets. Use `process.env.NEXT_PUBLIC_...` for client and `process.env...` for server.

## Developer Workflow
- **Lint & Build:** Run `npm run lint-and-build` to verify changes.
- **Type Check:** Run `npm run type-check` to ensure type safety.
- **Migrations:** Check `supabase/migrations` for DB schema changes.
