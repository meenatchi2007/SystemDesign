# Online Library Management System

A ready-to-run college system-design project with a React + Vite frontend and an Express REST API starter.

## Quick start (fastest: frontend demo)
Requirements: Node.js 18+ and npm.

1. Extract this ZIP.
2. Open the `online-library-system` folder in VS Code / Antigravity / Amazon Q.
3. Open a terminal in this folder and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the URL shown by Vite (usually http://localhost:5173).

The frontend works in demo mode using browser localStorage. You can search books, check branch availability, borrow and return books, view borrowing history, manage inventory, and explore the design/API pages. Refreshing the page preserves demo data in that browser.

## Backend (optional for your 1-hour demo)
In a second terminal:
```bash
cd backend
npm install
npm run dev
```
The API runs on http://localhost:5000 and has in-memory sample data (no database setup required). It is a teaching/demo API; data resets when the server restarts. See `backend/README.md`.

To connect the frontend to the backend later, update the frontend data service. For the fastest demonstration, use the working frontend demo mode.

## Suggested 1-hour plan
- 0–10 min: extract, install, run, and inspect dashboard.
- 10–25 min: demonstrate search, branch availability, borrow, and return.
- 25–40 min: explain API Explorer and HTTP status codes.
- 40–50 min: explain architecture, collections, cache, and notification queue.
- 50–60 min: rehearse the workflow and take screenshots.

## Important
This project demonstrates a library workflow. The frontend's demo data is local to the browser, not a shared production database. The optional backend is in-memory. Do not describe either as a production-ready distributed system.
