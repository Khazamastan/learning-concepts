# Cinema Booking Platform

Production-ready full stack cinema ticketing application powered by React 19 and NestJS 10.

## Tech Stack
- React 19 + Vite + TypeScript + Tailwind CSS
- NestJS 10 + Prisma + PostgreSQL + Redis
- Stripe for payments, BullMQ for background jobs

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Spin up databases:
   ```bash
   npm run db:up
   ```
3. Create environment files by copying `.env.example` to `.env` inside each workspace and adjust values.
4. Run development servers:
   ```bash
   npm run dev
   ```

## Workspace Scripts
- `npm run lint` – Runs linting for all workspaces.
- `npm run build` – Builds backend and frontend.
- `npm run db:reset` – Drops and recreates local Postgres/Redis containers.

## Project Structure
```
apps/
  backend/      NestJS API & services
  frontend/     React application
docs/           Architecture, ADRs, product docs
```

## Next Steps
- Implement authentication module.
- Add movie ingestion and public catalog pages.
- Connect seat reservation flow end-to-end.
- Harden observability and CI/CD pipelines.
