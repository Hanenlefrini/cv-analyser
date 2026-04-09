# CV Analyzer Monorepo

A production-ready CV analysis application built with Next.js and NestJS.

## Structure

- `backend/` - NestJS API server
- `frontend/` - Next.js web application

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `backend/.env.example` to `backend/.env`
- Copy `frontend/.env.example` to `frontend/.env.local`

3. Set up database:
```bash
cd backend
npx prisma migrate dev
```

4. Run development servers:
```bash
npm run dev
```

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Zustand
- **Backend**: NestJS, PostgreSQL, Prisma, Mastra AI, Tesseract.js




# cv-analyser
