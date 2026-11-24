# AIAS Education Portal

A production-oriented, centralized institutional web portal and administrative management system for **Asansol Institute of Allied Sciences (AIAS)** and its 3 sister institutions:

1. **Asansol Institute of Allied Sciences (AIAS)** (Paramedical, Agriculture, Veterinary)
2. **Bijoy Pal Memorial B.Ed College** (Teacher Education - B.Ed)
3. **Pramoth Nath Das Academy of Nursing** (G.N.M & B.Sc Nursing)
4. **P.N. Das Academy** (Teacher Education - D.El.Ed)

---

## Architecture Overview

The repository is decoupled into a modular **Frontend** and **Backend** structure:

``
├── frontend/                     # Next.js 14 App Router, React 18, Tailwind CSS
│   ├── public/                   # Static assets, institutional logos, badges
│   ├── src/
│   │   ├── app/
│   │   │   ├── (website)/        # 14 Public institutional routes & landing pages
│   │   │   ├── admin/            # Centralized administrative dashboard & CRM
│   │   │   ├── globals.css       # Tailwind academic design system
│   │   │   └── layout.tsx        # Root HTML layout shell
│   │   ├── components/
│   │   │   ├── layout/           # WebsiteHeader & WebsiteFooter
│   │   │   └── website/          # AdmissionEnquiryForm
│   │   ├── lib/                  # Institutional catalogue & utility helpers
│   │   └── types/                # Frontend TypeScript contracts
│   ├── next.config.mjs           # Next.js config with backend API proxy rewrites
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                      # Node.js TypeScript API Engine & Database Layer
│   ├── prisma/
│   │   ├── schema.prisma         # PostgreSQL schema definition
│   │   └── seed.ts               # Database seeder script
│   ├── src/
│   │   ├── lib/                  # Prisma client singleton & Zod validations
│   │   ├── routes/               # API endpoint route handlers
│   │   │   ├── auth.ts           # POST  /api/auth/login
│   │   │   ├── courses.ts        # GET   /api/courses
│   │   │   ├── enquiries.ts      # GET, POST, PATCH /api/enquiries
│   │   │   ├── health.ts         # GET   /api/health
│   │   │   ├── institutions.ts   # GET   /api/institutions
│   │   │   └── notices.ts        # GET, POST /api/notices
│   │   ├── services/             # Enquiry repository & portal data services
│   │   ├── types/                # Backend TypeScript types
│   │   └── server.ts             # Dedicated Node.js HTTP server (Port 5000)
│   ├── package.json
│   └── tsconfig.json
│
├── scripts/
│   └── dev.js                    # Concurrent dev runner for frontend + backend
└── package.json                  # Root npm workspace configuration
``

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Mode

Run both frontend and backend concurrently:

```bash
npm run dev
# or
npm run dev:all
```

Or run each service individually:

```bash
# Frontend only (Next.js on http://localhost:3000)
npm run dev:frontend

# Backend only (Node.js on http://localhost:5000)
npm run dev:backend
```

### 3. Production Build & Quality Checks

```bash
# Typecheck both frontend and backend
npm run typecheck

# Lint frontend code
npm run lint

# Build both applications
npm run build
```

---

## Database Management (Prisma + PostgreSQL)

The backend is migrating from Prisma 7 to Prisma 8 incrementally. The enquiry
repository uses Prisma 8; seeding and schema migrations remain on Prisma 7.

```bash
# Validate Prisma schema
npm run db:validate

# Generate the Prisma 7 client used by legacy backend code
npm run db:generate

# Emit the Prisma 8 contract and types
npm run db:emit

# Push schema to database
npm run db:push

# Run seed data
npm run db:seed
```

---

## Backend API Endpoints (Port 5000)

- `GET  /api/health` — System status and telemetry
- `POST /api/auth/login` — Administrator credential authentication
- `GET  /api/institutions` — List all 4 partner institutions
- `GET  /api/courses` — List all 7 degree & diploma programs
- `GET  /api/notices` — Institutional notices and circulars
- `POST /api/notices` — Publish a new circular
- `GET  /api/enquiries` — Fetch admission enquiries with status filters & stats
- `POST /api/enquiries` — Register new candidate admission enquiry
- `PATCH /api/enquiries/:id` — Update enquiry status & counseling notes
