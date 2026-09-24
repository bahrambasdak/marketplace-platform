# ADR-001: PostgreSQL

## Status

Accepted

## Context

The marketplace requires:

- relational data
- transactions
- product/category relationships
- orders
- payments
- inventory

## Options

1. PostgreSQL
2. MongoDB

## Decision

Use PostgreSQL.

## Reasoning

The domain contains strongly related entities
and transactional workflows.

## Consequences

Positive:

- strong constraints
- transactions
- relational queries

Negative:

- more schema management
- migrations required