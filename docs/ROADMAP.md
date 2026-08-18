# Linkwell Roadmap

## Milestone 0 — Foundation and decisions

- Audit the repository and local toolchain.
- Create architecture, roadmap, coding standards, environment template, and CI baseline.
- Confirm a PostgreSQL provider, email provider, image-storage account, production domain, and Vercel project ownership.

**Exit criteria:** reproducible local setup, documented decisions, and a green baseline build.

## Milestone 1 — Application foundation

- Initialize Next.js with TypeScript, Tailwind CSS, ESLint, Prettier, strict configuration, and accessible primitives.
- Build the public information architecture and original responsive design system.
- Add public landing, about, dating, advertise, advertisements, safety, contact, terms, and privacy pages; add SEO foundations.

**Exit criteria:** lint, type check, tests, and production build pass.

## Milestone 2 — Data and identity

- Configure Prisma/PostgreSQL, migrations, seed data, and environment validation.
- Implement Auth.js credentials authentication, email verification, password reset, session revocation, and account deletion.
- Add global rate limiting, security headers, audit logging, and role-based server authorization.

**Exit criteria:** identity and authorization tests cover authentication, age gating, session protection, and role boundaries.

## Milestone 3 — Profiles and privacy

- Build professional dating profiles, photos, interests, preferences, and privacy controls.
- Integrate validated image upload storage.
- Enforce profile visibility and private-field protections at query level.

**Exit criteria:** profile and privacy tests pass; private date-of-birth information is not exposed.

## Milestone 4 — Dating and safety

- Deliver discovery, explainable compatibility scoring, filters, like/pass, mutual matching, unmatching, blocking, and reporting.
- Ensure blocks are enforced across discovery, matching, and messaging.

**Exit criteria:** transactional match tests and authorization/security tests pass.

## Milestone 5 — Messaging and notifications

- Add match-gated conversations, cursor-paginated messages, unread state, notifications, and rate limits.
- Verify every conversation request enforces participant authorization.

**Exit criteria:** end-to-end matched-user messaging flow passes; IDOR and block enforcement tests pass.

## Milestone 6 — Advertising

- Deliver advertiser profiles, advertisement CRUD, image uploads, submission workflow, public search/filter/sort/pagination, favorites, and owner analytics.
- Design promotion fields and event boundaries for a future payment integration without enabling payments.

**Exit criteria:** only published ads appear publicly and analytics are owner/staff-only.

## Milestone 7 — Moderation and administration

- Build protected administration sections for users, advertisements, reports, moderation, analytics, and settings.
- Implement audited approve/reject/suspend/restore transitions.

**Exit criteria:** comprehensive RBAC tests pass; every moderation action has an audit record.

## Milestone 8 — Quality, launch, and operations

- Complete accessibility, responsive, performance, security, error-state, and observability reviews.
- Add Playwright critical-flow coverage and GitHub Actions.
- Configure production database, storage, email, monitoring, Vercel variables, preview deployments, and production smoke tests.

**Exit criteria:** all CI checks pass, production variables are configured, deployment is verified, and launch owner signs off.

## Required external configuration before a production launch

- Managed PostgreSQL credentials (recommended: Neon).
- Vercel project and deployment authorization.
- Email provider and verified sending domain (recommended: Resend).
- Vercel Blob store or equivalent image-storage credentials.
- Production `AUTH_SECRET`, application URL, and optional Sentry DSN.
- Moderation policy, retention policy, support contact, terms, privacy policy, and age requirement jurisdictional review.
