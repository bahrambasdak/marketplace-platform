# BazaarHub Frontend Architecture

For the concrete repository paths and current request flows, see `.ai/knowledge/project-map.md`.

## Overview

BazaarHub is a production-oriented marketplace platform inspired by modern large-scale products such as Divar, Digikala Marketplace, and SaaS admin systems.

The goal of this project is not only feature implementation, but also practicing scalable frontend engineering patterns, production-grade architecture, performance optimization, and modern React/Next.js system design.

This project focuses on:

- scalable frontend architecture
- rendering strategy decisions
- server/client state separation
- performance engineering
- production workflows
- maintainability
- interview-level engineering communication

---

# Core Product Domains

The system contains 4 main domains:

1. Public Marketplace
2. Authentication
3. Seller Dashboard
4. Admin Panel

---

# Tech Stack

## Frontend Core

- Next.js 16 (App Router)
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui

---

## Data Layer

- TanStack Query
- Axios / Fetch Wrapper
- Zod

---

## Forms

- React Hook Form
- Zod Validation

---

## State Management

### Server State

Managed using React Query.

Examples:

- listings
- search results
- user profile
- dashboard analytics

---

### Client/UI State

Managed using Zustand.

Examples:

- modal state
- sidebar state
- theme state
- temporary UI preferences

---

# Architectural Goals

The architecture aims to achieve:

- scalability
- feature isolation
- low coupling
- high maintainability
- performance optimization
- predictable state management
- production readiness

---

# High-Level Architecture

```txt
User
  ↓
Next.js App Router (`src/app`)
  ↓
Route page, layout, server action, or API route
  ↓
Feature and shared layers (`src/features`, `src/shared`)
  ↓
Prisma client (`src/shared/lib/prisma.ts`)
  ↓
PostgreSQL (`prisma/schema.prisma`)
```

Authentication is a special cross-boundary flow: sign-in server actions call the external identity service configured by `NEXT_PUBLIC_CLASSBON_URL`, store an encrypted `session` cookie, and `src/proxy/auth.proxy.ts` validates, refreshes, or redirects requests before protected routes render.
