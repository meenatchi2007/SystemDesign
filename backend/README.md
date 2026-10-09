# Optional Express API

Run:
```bash
npm install
npm run dev
```
Server: http://localhost:5000

This is an in-memory learning API with sample books, branch availability, borrowing and returning. Data resets when restarted. It is not connected to the frontend automatically; the frontend demo uses localStorage so it works without backend configuration.

Endpoints:
- `GET /api/health`
- `GET /api/books`
- `GET /api/books/:id`
- `GET /api/books/:id/availability`
- `GET /api/branches`
- `POST /api/borrowings` body `{ "userId":"U101", "bookId":"B101", "branch":"Coimbatore" }`
- `GET /api/users/:userId/borrowings`
- `POST /api/returns` body `{ "loanId":"LN..." }`

Status codes: 200 success, 201 created, 400 invalid input, 404 not found, 409 conflict, 500 unexpected error.

Production follow-up: add a database, authentication, authorization, atomic inventory updates, transaction strategy, validation, rate limiting, and automated tests.
