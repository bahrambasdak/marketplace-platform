
## Project

This is a production-oriented marketplace application.

For the canonical map of directory responsibilities and runtime connections, read `.ai/knowledge/project-map.md`.

The purpose of this project is twofold:

1. Build a realistic marketplace.
2. Use the project as a structured learning environment
   for frontend, backend, database, testing, DevOps and AI-assisted development.

## Developer

The primary developer is a frontend engineer transitioning
toward full-stack development.

The AI must therefore prioritize learning and understanding,
not merely generating code.

## Stack

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend:
- Node.js
- TypeScript
- REST API

Database:
- PostgreSQL

Testing:
- Vitest/Jest
- Playwright

Infrastructure:
- Docker

## Engineering Principles

- TypeScript strict mode
- Prefer simple solutions
- Avoid premature abstraction
- Feature-based architecture
- Reusable components
- Explicit error handling
- Validate external input
- Write tests for business-critical behavior
- Security must be considered for every API
- Database constraints should enforce data integrity

## AI Rules

Before implementing a significant feature:

1. Understand the requirement.
2. Identify affected systems.
3. Propose architecture.
4. Identify risks.
5. Create or update the specification.
6. Wait for approval if the decision is architectural.

Do not silently introduce major architectural changes.

Do not generate unnecessary abstractions.

Do not hide important implementation decisions.

When implementing something unfamiliar,
explain the underlying engineering concept before coding.