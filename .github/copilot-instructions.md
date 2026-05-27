# Copilot instructions for marketplace-platform

Purpose: give Copilot sessions concise, actionable repository context so suggestions are accurate and consistent.

---

## Build / run / lint / test

- Install dependencies (root workspace):
  - pnpm install
- Development server (root):
  - pnpm dev (alias for `next dev`)
- Production build / run (root):
  - pnpm build
  - pnpm start
- Lint (root):
  - pnpm lint (runs `eslint` configured by `eslint.config.mjs`)
- Tests:
  - There is no `test` script in package.json right now. Note: .husky/pre-commit runs `pnpm test` by default — add a `test` script to avoid pre-commit failures.
  - If Playwright is used (lockfile indicates presence), run a single Playwright test locally with:
    - npx playwright test path/to/test.spec.ts
    - npx playwright test -g "test name" (run a single test by name)
  - For Jest / Vitest (not currently configured): use the runner's `-t`/`-g` name-filter flags to run a single test file or pattern.

---

## High-level architecture (big picture)

- Frontend: Next.js (App Router) at the repository root `app/` directory. Routes are defined under `app/` (e.g., `app/admin`, `app/platform`, feature subfolders). Server and client components follow Next.js app-router conventions.
- Feature layer: `features/` contains domain-specific UI/logic organized per feature.
- Domain models / data: `entities/` holds canonical domain types and shapes.
- Shared platform libraries: `shared/` is the single-source library for:
  - api clients and interceptors (shared/api)
  - UI primitives and shadcn components (shared/ui)
  - types (shared/types)
  - hooks, providers and utility helpers
- Core services: `core/` provides platform-level services (business logic used across features).
- Widgets / components: `widgets/` and `components/` contain reusable UI modules and shadcn component config (see components.json).
- Data fetching & validation:
  - TanStack Query (React Query) for server-state
  - Axios wrapper(s) in shared/api for HTTP clients
  - Zod for schema validation
- Client UI state: Zustand for ephemeral UI state (modals, sidebars, themes).
- Docs & decisions: see `docs/architecture.md`, `docs/decisions.md`, and `docs/rendering-strategy.md` for rationale and deeper architecture notes.

---

## Key conventions and repo-specific patterns

- TypeScript paths: tsconfig maps `@/*` to project root. components.json also defines custom aliases (e.g., `components: @/components`, `ui: @/components/ui`, `lib: @/lib`). Use these aliases consistently.
- UI stack: TailwindCSS + shadcn/ui + Radix primitives + lucide icons. Components often use shadcn patterns; prefer existing shadcn components and variants where present.
- Project layout: prefer feature-sliced organization — put UI + hooks + tests close to feature implementations (see `features/`). Reusable primitives live in `shared/`.
- Server vs client components: follow Next.js app-router defaults. If a component uses browser-only APIs or hooks (useEffect, Zustand client state), mark it as "use client".
- Forms: React Hook Form + Zod are the expected pattern for form handling and validation.
- API clients & interceptors: shared/api contains request clients and interceptor patterns — reuse them instead of creating ad-hoc fetch wrappers.
- Husky & pre-commit: Husky is present. Current `.husky/pre-commit` invokes `pnpm test` — add or update `test` script in package.json to match chosen test runner to avoid broken pre-commit hooks.
- Linting: ESLint is configured via `eslint.config.mjs` that extends Next.js defaults; run `pnpm lint` at repo root.
- Environment: local secrets and runtime values live in `.env.local` (do not commit). shared/config/env.ts centralizes usage of env values.

---

## Where to look first

- app/ — entrypoints and routes
- shared/ — primitives: api, ui, types, hooks
- features/ — feature implementations
- docs/architecture.md — authoritative summary of architectural goals

---

Notes for Copilot sessions

- Prefer changes only inside feature or shared primitives when suggesting edits; avoid cross-cutting changes without touching tests/docs.
- When adding scripts or tooling (tests, Playwright), update `.husky/pre-commit` and package.json scripts together.
- Preserve path aliases and shadcn component patterns — propose refactors that keep aliases intact or update tsconfig/components.json accordingly.

---

(Generated/updated by repository assistant)
