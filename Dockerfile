# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
# Используем install, так как для генерации и пуша Prisma 7 
# могут понадобиться зависимости из devDependencies (typescript, ts-node)
RUN npm install

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Генерируем клиент (подтягивает схему и конфиг)
RUN npx prisma generate
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Копируем только необходимое
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/prisma ./prisma
# Копируем конфиг (обязательно для Prisma 7 CLI)
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

# Для Prisma 7 важно, чтобы в окружении был способ запустить .ts конфиг.
# Если npx prisma db push ругается на отсутствие ts-node, 
# можно использовать команду: 
# CMD npx prisma db push --config prisma.config.ts && npm start
CMD npx prisma db push && npx tsx prisma/seed.ts && npm start