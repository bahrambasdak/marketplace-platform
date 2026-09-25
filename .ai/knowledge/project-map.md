# Project Connection Map

This is the canonical map for understanding how the marketplace repository fits together. Verify implementation details in source files when this map and code disagree.

## Runtime Flow

```text
Browser
  -> Next.js App Router in src/app
  -> route page or server/API route
  -> feature code in src/features when used
  -> shared services, validation, and types
  -> Prisma client in src/shared/lib/prisma.ts
  -> PostgreSQL
```

The repository currently contains a Next.js application with local API routes. Authentication also calls an external identity service through `NEXT_PUBLIC_CLASSBON_URL`.

## Directory Responsibilities

- `src/app/`: App Router entry points, route groups, pages, layouts, server actions, and API routes.
- `src/app/(auth)/`: sign-in, sign-up, and password-recovery flows.
- `src/app/(platform)/`: authenticated platform pages such as search, listings, profile, and notifications.
- `src/app/(dashboard)/`: dashboard routes.
- `src/app/admin/`: admin routes and admin layout.
- `src/app/api/`: Next.js HTTP endpoints. These are the application's server/API boundary.
- `src/features/`: feature-oriented UI, hooks, schemas, API helpers, and shared feature code.
- `src/entities/`: domain-oriented types and models.
- `src/shared/`: reusable providers, services, hooks, types, configuration, and UI.
- `src/components/`: application-level reusable components.
- `components/`: shared shadcn-style primitives configured by `components.json`; check imports before adding another primitive.
- `src/proxy.ts` and `src/proxy/`: request interception and authentication redirects/refresh behavior.
- `prisma/schema.prisma`: database schema and Prisma model definitions.
- `src/shared/lib/prisma.ts`: shared Prisma client instance.
- `docs/`: architecture, rendering, and decision documentation.
- `.ai/`: agent roles, rules, learning notes, ADRs, and feature specifications.

## Authentication Flow

```text
/signin
  -> src/app/(auth)/signin/page.tsx
  -> signin form and validation
  -> src/app/(auth)/signin/actions.ts
  -> external `${NEXT_PUBLIC_CLASSBON_URL}/identity/signin`
  -> encrypted httpOnly `session` cookie
  -> src/proxy.ts
  -> src/proxy/auth.proxy.ts
  -> allow public route, redirect protected route, or refresh token
```

The proxy currently protects `/dashboard`, `/profile`, and `/settings`. Treat that list as implementation truth, not as a complete product authorization model.

## Product Search Flow

```text
/platform search page
  -> src/app/(platform)/search/page.tsx
  -> GET /api/products?query=&page=&limit=
  -> src/app/api/products/route.ts
  -> Zod query validation and page-size limit
  -> Prisma product.findMany + product.count transaction
  -> PostgreSQL products table
  -> JSON data + pagination
  -> ProductGrid / ProductCard
```

The current Prisma schema defines `Product` in `prisma/schema.prisma`. It maps `categoryId` to `category_id`, but there is not currently a `Category` model or declared Prisma relation in that schema.

## State And UI Boundaries

- Server-rendered pages and server actions belong in `src/app` unless a feature-specific abstraction is already established.
- Browser interactivity and client state live in client components and Zustand stores such as `src/app/stores/auth.store.ts`.
- External input is validated at the boundary with Zod before business or database work.
- Shared UI primitives should be reused from the existing component locations rather than importing database or infrastructure code into UI components.

## Documentation And Decision Flow

```text
Feature request
  -> .ai/specs/
  -> architecture/risk decision in .ai/skills/engineering/ADR/ when needed
  -> implementation in src/
  -> focused validation
  -> graphify update after source changes
```

Use `AGENTS.md` for learning and engineering principles, `CLAUDE.md` for runtime and graphify workflow, `.github/copilot-instructions.md` for Copilot-specific repository guidance, and this file for the concrete connection map.

## Important Source Of Truth Rules

- Prefer actual paths under `src/` over older documentation that describes root-level `app/`, `features/`, `entities/`, or `shared/` directories.
- Prefer route and schema source files over feature specs when describing current behavior.
- Do not assume a backend service, test runner, database migration command, or route exists just because it is mentioned in documentation; verify `package.json` and the relevant source directory first.
