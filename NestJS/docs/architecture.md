# Cinema Booking Platform Architecture

## Goals
- Deliver a production-ready full-stack web application for cinema ticket discovery, seat selection, and secure checkout.
- Ensure maintainability, automated testing, horizontal scalability, and observability from the outset.
- Provide developer experience optimised for local iteration, CI/CD pipelines, and cloud-native deployment.

## High-Level Overview
- **Frontend (React 19 + Vite)**: SPA with React Router, TanStack Query for data fetching, Zustand for client state, Tailwind CSS for styling, and component-driven architecture.
- **Backend (NestJS 10)**: Modular domain layers (movies, screenings, theatres, reservations, payments) using Prisma ORM with PostgreSQL.
- **API Contract**: REST + WebSocket updates for seat availability; future GraphQL gateway optional.
- **Database (PostgreSQL 16)**: Hosted (e.g., Neon, RDS); schema managed by Prisma migrations.
- **Authentication**: JWT access/refresh tokens backed by Redis cache; OAuth providers via NextAuth alternative (custom Nest module) or Auth0 integration.
- **Payments**: Stripe integration handled server-side with webhook verification.
- **Infra**: Containerised services with Docker Compose for local dev; deployable to platforms like Render, Railway, or AWS ECS.
- **CI/CD**: GitHub Actions using Turbo caching; automated linting, type-check, tests, and preview deployments.

## Backend Modules
1. **Users**: Registration, roles (customer, admin, operator), profile management.
2. **Movies**: CRUD, metadata from third-party API ingestion jobs.
3. **Halls/Theatres**: Seat maps, amenities, location data.
4. **Screenings**: Schedules linking movies, halls, pricing tiers.
5. **Reservations**: Seat selection, hold windows, booking confirmation, QR ticket issuance.
6. **Payments**: Stripe checkout session creation, webhook reconciliation, refunds.
7. **Notifications**: Email/SMS confirmations via provider (Resend, Twilio).
8. **Admin**: Dashboard metrics, schedule management.

### Cross-Cutting Concerns
- Global validation pipe + exception filters.
- Request logging (Pino) with correlation IDs.
- Config abstraction with `.env` schema validation.
- Caching (Redis) for seat maps and movie listings.
- Background jobs via BullMQ for ingestion and notification.

## Frontend Structure
- **App Shell**: React Router lazy routes, code-splitting via Vite.
- **State/Data**:
  - TanStack Query for server cache sync (`/api`).
  - Zustand for UI state (seat selection wizard).
- **Components**:
  - `components/ui`: design system wrappers.
  - `modules/movies`, `modules/checkout`, `modules/admin`.
- **Auth**: React Query + axios interceptors; refresh token rotation; persisted session storage.
- **Accessibility**: Headless UI primitives, semantic HTML, keyboard seat map interactions.
- **Testing**: Vitest + Testing Library + Playwright E2E.

## API Endpoints (initial)
- `GET /movies` – list, filter.
- `GET /movies/:id` – details, upcoming screenings.
- `GET /screenings/:id/seats` – seat map, pricing tiers.
- `POST /reservations` – create hold.
- `POST /payments/checkout` – start payment.
- `POST /payments/webhook` – Stripe webhook.
- `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`.
- `GET /me` – current user profile & active reservations.

## Local Development Workflow
1. `npm install`
2. `npm run db:up` (Docker Compose Postgres + Redis)
3. `npm run dev` (concurrently runs Nest + Vite with shared env)
4. `npm run test`, `npm run lint`, `npm run e2e`

## Observability & Quality
- Backend: Pino structured logs, OpenTelemetry traces via `@opentelemetry/sdk-node`.
- Frontend: Sentry or Vercel Web Analytics integration.
- Testing pyramid: unit (Vitest/Jest), integration (Supertest), E2E (Playwright).

## Roadmap
1. Scaffold monorepo, shared tooling, CI pipeline.
2. Implement auth + basic movie listing.
3. Add seat map rendering + reservation hold logic.
4. Integrate Stripe + ticket issuance.
5. Admin dashboards, notifications, performance tuning.
