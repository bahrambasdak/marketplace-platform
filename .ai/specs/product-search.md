# Product Search

## Goal

Allow users to search marketplace products.

## User Story

As a customer,
I want to search products by name,
so that I can quickly find what I need.

## Functional Requirements

- Search by product name
- Case-insensitive search
- Pagination
- Empty state
- Loading state
- Error state

## API

GET /api/products?query=phone&page=1&limit=20

## Response

{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 0
  }
}

## Database

Products must have:

- id
- name
- description
- price
- category_id
- created_at
- updated_at

## Frontend

Components:

ProductSearch
ProductGrid
ProductCard
Pagination

## Performance

- Debounce search input
- Pagination
- Database index for searchable fields

## Security

- Validate query parameters
- Limit maximum page size

## Testing

Unit:
- search parsing
- pagination

Integration:
- API search

E2E:
- user searches product
- results appear