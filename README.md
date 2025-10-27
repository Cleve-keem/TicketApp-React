# TicketApp — React (Single-framework) README

Project: React implementation of the Multi‑Framework Ticket Web App challenge.  
This repository contains the complete React version: landing page, authentication (simulated), dashboard, and full ticket CRUD with validation and UX feedback.

## Features

- Hero landing with wavy SVG, decorative circles, responsive hero layout
- Login & Signup with inline validation and toast notifications
- Protected routes (Dashboard, Tickets) using a simulated session token (localStorage)
- Dashboard: aggregated ticket stats (total, open, in_progress, closed)
- Ticket Management: Create / Read / Update / Delete with validation, confirmations and toast feedback
- Local persistence using localStorage (seeded demo data)
- Accessible semantic HTML, visible focus, responsive layout (mobile → desktop)
- Consistent visual rules: max-width 1440px, card-style boxes, status color mapping

## Tech / Libraries

- React (JSX)
- react-router-dom (routing, protected routes)
- react-hook-form (forms & validation)
- Plain CSS (project styles)
- No real backend — services simulate API via localStorage and latency

## Quick start (React)

1. Clone repository and change to the React app folder (root for this implementation).
2. Install dependencies:
   - npm install
3. Start dev server:
   - npm start
   - or if the project uses Vite: npm run dev
4. Open: http://localhost:3000 (or the address printed by the dev server)

Build for production:

- npm run build

## Key scripts

- npm start / npm run dev — run dev server
- npm run build — production build
- npm test — (if tests exist)

## Project structure (important files)

- src/
  - App.jsx — routes, ProtectedRoute usage
  - pages/
    - Landing.jsx — hero + features
    - Dashboard.jsx — stats + quick actions
    - Tickets.jsx — ticket management UI (list, create/edit form, delete confirmation)
    - auth/Login.jsx, auth/Signup.jsx — auth forms
  - components/
    - Hero.jsx — hero section (wave SVG & decorative circles)
    - NavBar.jsx — navigation + logout
    - ProtectedRoute.jsx — route guard
    - Toasts.jsx — toast system
    - ConfirmModal.jsx — delete confirmation
  - services/
    - storageService.js — localStorage helpers, seedInitialData, simulated latency
    - authService.js — login / signup / logout (session stored at key: ticketapp_session)
    - ticketService.js — ticket validations + CRUD wrappers
  - utils/
    - validators.js — client-side validation helpers

## Authentication & session

- Session key: ticketapp_session (localStorage)
- ProtectedRoute redirects to /auth/login when session is missing or expired
- logout() clears session and navigates back to the landing page
- Signup auto-logs in and creates a new localStorage user

## Data & persistence

- Demo users and tickets seeded via seedInitialData() in storageService.js (call at app bootstrap or first run)
- Tickets persisted at localStorage key ticketapp_tickets
- Users persisted at localStorage key ticketapp_users

## UI components and state overview

- NavBar: reads session (getSession) to show auth actions or logout
- Toasts: global toast dispatcher using CustomEvent "ticketapp:toast"
- Tickets page state (typical):
  - tickets: array
  - loading: boolean
  - formOpen: boolean (create/edit)
  - editing: ticket or null
  - formState: { title, description, status, priority }
  - errors: validation map
  - deleting: { open, id }
- Services handle business validation (title/status constraints) and throw descriptive Errors for UI to surface

## Validation & error handling

- Title: required, min length (client: 3+, server: not empty)
- Status: required, only "open", "in_progress", "closed"
- Description/priority: optional, but length-validated
- All service errors surface as toast messages; form fields show inline errors
- Common messages: “Invalid credentials”, “Failed to load tickets. Please retry.”, “Your session has expired — please log in again.”

## Status color mapping

- open → Green tone
- in_progress → Amber tone
- closed → Gray tone

## Accessibility notes

- Semantic HTML elements (nav, header, main, footer, form)
- aria-labels, aria-live for toasts, role attributes for modals/dialogs
- Visible focus states (CSS) and adequate contrast for status tags
- Keyboard accessible controls (forms, buttons, modal actions)

## Known issues / limitations

- Authentication is simulated and stored client-side — not suitable for production.
- Single‑user / demo environment — no multi-user concurrency.
- Network errors are simulated; replace services with a real API for production behavior.
- Seeded demo data may not auto-run unless seedInitialData() is invoked during bootstrap.

## Example test credentials

- Username: demo
- Password: demo123
  (Seeded by storageService.seedInitialData())

## Notes for multi-framework deliverable

- This README covers the React implementation only. Other framework implementations (Vue.js, Twig) should follow the same layout, assets (wave SVG & decorative shapes), validation rules, and routing/session behavior. Place each implementation in a separate folder and include a root README linking to each version.

If anything in the React implementation needs clarification (commands, environment, or component mapping), consult the listed files above for exact behavior and APIs.
