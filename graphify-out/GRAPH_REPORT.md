# Graph Report - marketplace-platform  (2026-09-24)

## Corpus Check
- 186 files · ~69,028 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 3, .prisma 1, .ico 1)

## Summary
- 434 nodes · 476 edges · 152 communities (14 shown, 138 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- next.config.ts
- button.tsx
- eslint.config.mjs
- dependencies
- @hookform/resolvers
- components.json
- tsconfig.json
- devDependencies
- @prisma/adapter-pg
- user.types.ts
- page.tsx
- scripts
- analyze.sh script
- analyze.sh
- global-not-found.tsx
- postcss.config.mjs
- Accessibility patterns
- WCAG reference
- Accessibility skill
- Security reference
- Best practices skill
- CLS reference
- INP reference
- LCP reference
- Core Web Vitals skill
- Performance measurement
- Real user monitoring
- Performance skill
- Structured data reference
- SEO skill
- Web quality audit skill
- Architect agent
- Backend agent
- Database agent
- Frontend agent
- QA agent
- Learning log
- Frontend rules
- Learning protection
- ADR 001 PostgreSQL
- Product search specification
- Claude configuration
- Accessibility patterns
- WCAG reference
- Accessibility skill
- Security reference
- Best practices skill
- CLS reference
- INP reference
- LCP reference
- Core Web Vitals skill
- Graphify add watch reference
- Graphify exports reference
- Graphify extraction specification
- Graphify GitHub and merge
- Graphify hooks reference
- Graphify query reference
- Graphify transcription reference
- Graphify update reference
- Graphify skill
- Performance measurement
- Real user monitoring
- Performance skill
- Structured data reference
- SEO skill
- Web quality audit skill
- Copilot instructions
- Search best practices skill
- Accessibility patterns
- WCAG reference
- Accessibility skill
- Security reference
- Best practices skill
- CLS reference
- INP reference
- LCP reference
- Core Web Vitals skill
- Performance measurement
- Real user monitoring
- Performance skill
- Structured data reference
- SEO skill
- Web quality audit skill
- Agents guidance
- Cloud development environment
- Architecture documentation
- Architecture decisions
- Rendering strategy
- PNPM workspace configuration
- File icon
- Globe icon
- Next.js icon
- Vercel icon
- Window icon
- Marketplace README

## God Nodes (most connected - your core abstractions)
1. `cn()` - 43 edges
2. `react` - 17 edges
3. `compilerOptions` - 16 edges
4. `next` - 15 edges
5. `decryptSession()` - 8 edges
6. `UserSession` - 8 edges
7. `scripts` - 7 edges
8. `useSessionStore` - 7 edges
9. `tailwind` - 6 edges
10. `aliases` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → lib/utils.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → lib/utils.ts
- `CardHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → lib/utils.ts
- `CardTitle()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (152 total, 138 thin omitted)

### Community 0 - "next.config.ts"
Cohesion: 0.08
Nodes (31): nextConfig, jose, next, zustand, GET(), setAuthCookieAction(), signInAction(), signOutAction() (+23 more)

### Community 1 - "button.tsx"
Cohesion: 0.11
Nodes (33): Button(), buttonVariants, Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel() (+25 more)

### Community 2 - "eslint.config.mjs"
Cohesion: 0.06
Nodes (33): name, private, version, autoprefixer, axios, bcryptjs, clsx, dotenv (+25 more)

### Community 3 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, axios, bcryptjs, class-variance-authority, clsx, dotenv, @hookform/resolvers, jose (+19 more)

### Community 4 - "@hookform/resolvers"
Cohesion: 0.12
Nodes (17): @hookform/resolvers, lucide-react, react-hook-form, zod, SignInForm(), SignInModel, SignInSchema, Card() (+9 more)

### Community 5 - "components.json"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 6 - "tsconfig.json"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, eslint, eslint-config-next, husky, lint-staged, postcss, prettier (+8 more)

### Community 8 - "@prisma/adapter-pg"
Cohesion: 0.25
Nodes (6): @prisma/adapter-pg, @prisma/client, searchParamsSchema, adapter, globalForPrisma, prisma

### Community 9 - "user.types.ts"
Cohesion: 0.22
Nodes (8): Role, ADMIN, GUEST, MANAGER, STORE, USER, Store, User

### Community 10 - "page.tsx"
Cohesion: 0.25
Nodes (3): Product, ProductSearch(), SearchResponse

### Community 11 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, prepare, start, test

### Community 12 - "analyze.sh script"
Cohesion: 0.73
Nodes (5): analyze.sh script, analyze_html(), fail(), analyze.sh script, to_json_array()

### Community 13 - "analyze.sh"
Cohesion: 0.70
Nodes (4): analyze.sh script, analyze_html(), fail(), to_json_array()

## Knowledge Gaps
- **210 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+205 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 289 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **138 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next.config.ts` to `@prisma/adapter-pg`, `eslint.config.mjs`, `@hookform/resolvers`, `global-not-found.tsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `eslint.config.mjs`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `react` connect `button.tsx` to `next.config.ts`, `eslint.config.mjs`, `page.tsx`, `@hookform/resolvers`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _210 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next.config.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0824829931972789 - nodes in this community are weakly interconnected._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11416490486257928 - nodes in this community are weakly interconnected._
- **Should `eslint.config.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.05547652916073969 - nodes in this community are weakly interconnected._