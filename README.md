# PostUniJobFinder

A local job application tracker for recent graduates. Log every application, track status changes, and see your search progress — all stored on your own machine with no accounts, cloud services, or API keys required.

## Features

- **Application tracker** — log applications with company, role, URL, and notes
- **Inline status updates** — click to change status (Applied → Interview → Accepted/Rejected) without leaving the table
- **Dashboard overview** — stats cards showing totals per status, progress graph, recent activity
- **Onboarding wizard** — 4-step first-run profile setup
- **Auth** — local credential-based login (no OAuth, no email verification)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** SQLite via Prisma — single file on disk, zero setup
- **Auth:** NextAuth.js with CredentialsProvider (JWT sessions)
- **UI:** Tailwind CSS, shadcn/ui, Recharts
- **Forms:** React Hook Form + Zod
- **Data fetching:** TanStack Query with optimistic updates

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Setup

```bash
git clone <repo-url>
cd JobSearchingDashboard
pnpm install
cp .env.example .env.local
```

Open `.env.local` and set `NEXTAUTH_SECRET` to any random string (or generate one):

```bash
openssl rand -base64 32
```

Create the database:

```bash
pnpm db:migrate
```

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), register an account, and you're in.

## Project Structure

```
app/
├── (auth)/login, /register    Auth pages
├── (dashboard)/               Protected shell (sidebar + header)
│   ├── dashboard/             Stats + activity overview
│   ├── tracker/               Application tracker (main feature)
│   └── onboarding/            First-run wizard
└── api/
    ├── applications/          CRUD endpoints for job applications
    ├── user/                  Registration
    └── onboarding/            Profile save

components/
├── tracker/                   JobTrackerTable, ApplicationModal, StatusBadge
├── dashboard/                 StatsCards, ProgressGraph, RecentActivity
├── auth/                      LoginForm, RegisterForm
└── layout/                    Sidebar, Header

prisma/
├── schema.prisma              User, UserProfile, JobApplication models
└── dev.db                     SQLite database (auto-created)
```

## Usage

1. Register at `/register` and complete the onboarding steps
2. Go to **Tracker** — click **Log application** to add a new entry
3. Change status inline by clicking the status dropdown on any row
4. Edit or delete entries with the hover actions on each row
5. Check the **Dashboard** to see your progress over time
