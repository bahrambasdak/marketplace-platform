# Frontend Rules

## React

- Prefer functional components.
- Keep components focused.
- Avoid unnecessary useEffect.
- Prefer server-side data fetching when appropriate.
- Keep business logic out of presentation components.

## TypeScript

- Never use `any` unless explicitly justified.
- Prefer discriminated unions for complex states.
- Validate external data.

## Components

Components should generally follow:

UI
↓
Feature
↓
Application
↓
API

Avoid importing database or infrastructure concerns
directly into UI components.