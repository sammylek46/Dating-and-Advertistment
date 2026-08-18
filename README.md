# Linkwell

Linkwell is an adults-only platform for professional dating and moderated local advertising. It is currently in foundation development.

## Stack

Next.js, TypeScript, Tailwind CSS, Prisma/PostgreSQL, Auth.js, Zod, Vercel Blob, Vitest, Playwright, and Vercel.

## Local development

1. Copy `.env.example` to `.env.local` and fill in required values.
2. Install dependencies: `pnpm install`.
3. Start the app: `pnpm dev`.

Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before opening a pull request.

See `docs/ARCHITECTURE.md` and `docs/ROADMAP.md` for design, security, deployment, and milestone details.

## Required production configuration

PostgreSQL, Auth.js secret and URL, a verified Resend sender, Vercel Blob, and optional Sentry DSN. Never commit `.env` files or deployment secrets.
