# Cloud Development Environment

## Runtime

Node.js 22

## Package Manager

pnpm

## Services

Frontend:
Next.js

API:
Node.js

Database:
PostgreSQL

## Environment Variables

DATABASE_URL
AUTH_SECRET
API_URL

Never commit secrets.

## Local Development

pnpm install
pnpm dev

## Testing

pnpm test
pnpm test:e2e

## Database

pnpm db:migrate
pnpm db:seed

## Docker

docker compose up -d

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
