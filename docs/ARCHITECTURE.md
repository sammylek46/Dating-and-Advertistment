# Linkwell Architecture

## Purpose

Linkwell is an adults-only professional connection and local advertising platform. It combines privacy-aware dating discovery with a moderated marketplace for professional and business advertising. The system is designed for Vercel deployment, PostgreSQL, and future paid promotion without coupling payment logic to advertising workflows.

## System architecture

The application is a Next.js App Router monolith deployed on Vercel. Server Components render public and authenticated pages; Route Handlers and Server Actions implement application APIs. PostgreSQL is the system of record, accessed only through Prisma on the server. Object storage holds user and advertisement images. An email provider delivers transactional messages. Optional Redis-compatible storage provides distributed rate limiting when deployed across Vercel functions.

```text
Browser -> Next.js (Vercel) -> Auth / authorization -> Prisma -> PostgreSQL
                                  |                 -> Object storage
                                  |                 -> Email provider
                                  |                 -> Rate-limit store
                                  -> Monitoring
```

## Frontend architecture

- Next.js App Router separates public, authenticated dashboard, and admin route groups.
- TypeScript is strict; Zod schemas are shared by forms and server endpoints.
- Tailwind CSS supplies the design tokens and responsive layout primitives. Accessible, composable UI components live in `components/ui`; domain components live beside their feature.
- Forms use progressive enhancement with server-side validation. Client components are used only for interactivity such as filters, image selection, and messaging.
- Public pages include metadata, canonical URLs, Open Graph data, sitemap, and robots directives. Private profiles, discovery, dashboards, and messages are `noindex`.

## Backend architecture

- Route Handlers provide carefully scoped HTTP APIs for uploads, analytics events, and future integrations. Server Actions handle authenticated form mutations.
- Every mutation validates untrusted input with Zod, gets the authenticated server session, authorizes against the persisted role and resource ownership, then writes through Prisma transactions where atomicity is needed.
- A service layer owns business rules: matching, compatibility, moderation transitions, blocking, notifications, and analytics aggregation.
- Errors expose safe user messages and send structured context to monitoring without secrets or message bodies.

## Database architecture

PostgreSQL is the production database; Neon is the default managed provider because it integrates with Vercel and Prisma. Prisma migrations are committed and applied with `prisma migrate deploy` in production. No destructive migration is run automatically without review and backup planning.

Core normalized entities:

- `User`, `Account`, `Session`, `VerificationToken`, and `PasswordResetToken` support identity and authentication.
- `Profile`, `ProfilePhoto`, `DatingPreference`, `Interest`, `UserInterest`, and `PrivacySetting` keep public, preference, and sensitive data separate.
- `Like`, `Pass`, `Match`, `Block`, and `Report` implement dating interactions and safety.
- `Conversation`, `ConversationParticipant`, and `Message` implement match-gated messaging.
- `Advertisement`, `AdvertisementImage`, `AdvertisementCategory`, `FavoriteAdvertisement`, `AdvertisementView`, and `AdvertisementClick` implement marketplace functionality.
- `ModerationAction`, `Notification`, and `AuditLog` preserve operational records.

Key constraints and indexes include unique email, one profile per user, unique `(actorId, targetId)` interaction pairs, unique `(userAId, userBId)` canonical match pairs, unique advertisement favorites, and indexed visibility/status/location/category/created timestamps. Soft deletion is used for accounts and user-generated resources that require audit retention.

## Authentication architecture

Auth.js is the selected mature Next.js-compatible authentication solution. Credentials use Argon2id password hashes; verification and reset tokens are hashed at rest, single-use, short-lived, and non-enumerating. Sessions use secure, HTTP-only, same-site cookies with rotation and server-side revocation. Production configuration requires HTTPS and an `AUTH_SECRET`.

Email verification is required before dating discovery, messaging, or submitting advertisements. Account deletion revokes sessions and schedules privacy-preserving deletion according to the retention policy.

## Authorization architecture

Roles are persisted server-side: `USER`, `ADVERTISER`, `MODERATOR`, and `ADMIN`. Role checks never accept client-provided values. Resource policies enforce ownership and membership: only match participants may access a conversation; only advertisement owners or privileged staff may edit or view private analytics; moderators act only through audited state transitions. Blocks override discovery, matching, and messaging permissions.

## Dating architecture

Discovery queries apply visibility, age, stated preferences, prior pass/like decisions, and bilateral block exclusions in SQL. Date of birth stays private; server-side age validation enforces the configured minimum age. The initial compatibility score is explainable and limited to volunteered non-sensitive factors: overlapping interests, relationship goals, industry/profession affinity, and coarse location proximity. It is never used to infer or rank protected characteristics.

Mutual likes create a canonical match in a transaction, protected by unique database constraints. Unmatching or blocking removes messaging eligibility immediately.

## Messaging architecture

Messaging is available only to current match participants who are not blocked. Conversation lookup always filters by the requesting participant, preventing insecure direct object reference. Messages have bounded length, server-side rate limiting, cursor pagination, read timestamps, and notification fan-out. Future real-time delivery can use a managed pub/sub provider without changing persistence or authorization rules.

## Advertisement architecture

Advertisements begin as `DRAFT`, move to `PENDING_REVIEW` on submission, and only moderators can transition them to `PUBLISHED`, `REJECTED`, or `SUSPENDED`. Expiration is evaluated server-side. Search is paginated at the database and filters only published inventory for visitors. Analytics event endpoints use rate limiting, deduplication signals, and privacy-aware aggregation; owners and staff see their own private metrics only.

Images are uploaded directly to Vercel Blob using short-lived server-authorized upload tokens. The server validates MIME type, extension, byte size, and decoded image dimensions before a media record is accepted. Filenames are generated UUIDs; original filenames are never used as paths. A future Cloudinary adapter may add transformations without changing domain records.

## Moderation and safety architecture

Reports can target profiles, messages, and advertisements. They enter a moderation queue with least-privilege access, status history, and audit logs. Suspension and blocking take effect in server-side queries immediately. The product displays safety guidance and rejects prohibited content and illegal transactions through policy, reporting, and human moderation workflows.

## Deployment architecture

Vercel hosts the Next.js app, with preview deployments for pull requests and production deployments from the protected default branch. GitHub Actions runs formatting/linting, type checks, unit tests, integration tests, and the production build. Required production variables are documented in `.env.example`; no secret is committed. Scheduled jobs, if introduced, use Vercel Cron with authenticated endpoints.

## Security architecture

- Strict validation and parameterized Prisma queries protect against injection.
- React escaping plus a restrictive Content Security Policy reduce XSS risk.
- Same-site cookies, origin checks for mutations, and CSRF protections appropriate to the Auth.js session strategy protect state-changing requests.
- Rate limiting protects credentials, messaging, reporting, uploads, and analytics endpoints.
- Security headers include CSP, HSTS in production, `X-Content-Type-Options`, `Referrer-Policy`, and frame protection.
- Uploads are allow-listed and stored outside the application filesystem.
- Audit logs record security-relevant actions without credentials, tokens, or sensitive message content.
- Least-privilege database and storage credentials are separate per environment.

## Observability and operations

Sentry is optional but supported through `SENTRY_DSN` for server and browser error monitoring. Structured logs contain request correlation IDs and safe metadata. Backups, migration review, incident response, and retention schedules are operational prerequisites for launch.
