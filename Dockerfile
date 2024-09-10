# * Through multi stage build I was able to reduce image size from 2.6Gb to 158Mb ❤️😊

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# This is done for security purposes so that the application doesn’t run as the root user inside the container.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public

# copies the standalone production build files generated by Next.js
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

# application will listen on all network interfaces.
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]