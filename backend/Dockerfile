# syntax=docker/dockerfile:1

FROM node:20-slim AS base

WORKDIR /app

FROM base AS deps
ENV PNPM_FETCH_RETRIES=15
ENV PNPM_FETCH_TIMEOUT=600000
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run prisma:generate
RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/.env .env
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

CMD ["sh", "-c", "echo 'Running database migrations...' && npx prisma migrate deploy || (echo 'ERROR: Migrations failed!' && exit 1) && echo 'Migrations completed successfully' && echo 'Starting application...' && node dist/main.js"]
