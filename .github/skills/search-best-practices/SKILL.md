---
name: search-best-practices
user-invocable: true
description: "Use when you want a focused review or recommendations for page routes, app sections, and UI patterns in this marketplace platform repository."
---

# Search Best Practices

## What this skill does

- Reviews the current page, route, or section you are working on.
- Searches repository conventions, existing patterns, and architecture decisions.
- Suggests best practices for layout, routing, component structure, forms, data fetching, and styling.
- Flags inconsistencies and provides alignment recommendations with this repo's conventions.

## When to use

- Working on `app/(auth)`, `app/(marketing)`, `app/(platform)`, or any other page route.
- Adding or updating UI sections, shared components, or page-level logic.
- Needing a quick repo-specific checklist for routing, server/client boundaries, or feature structure.
- Verifying that a new page or section follows the repository's current architecture and shared conventions.

## How to use

Ask for one of these:

- `Review the best practices for this page and the section I am working on.`
- `Search repository patterns and recommend best practices for this route.`
- `Identify the conventions for pages, layout, and components in this repo.`
- `Check if this page follows the marketplace platform's page structure and UI patterns.`

## Review workflow

1. Identify the current file or route mentioned by the user.
2. Search the repo for matching page, layout, component, and feature patterns.
3. Compare against existing conventions in `app/`, `shared/`, `features/`, and `components/`.
4. Produce a concise recommendation list:
   - page or route structure
   - component reuse
   - data fetching strategy
   - client/server boundaries
   - styling and shared UI primitives
   - accessibility and UX best practices

## Quality criteria

- Recommendations must reference repository-specific files or patterns.
- Prefer existing shared components and hooks over introducing new ad hoc implementations.
- Encourage consistent use of Next.js App Router conventions and the repo's feature layering.
- Keep suggestions actionable and tied to the user's current page/section.
