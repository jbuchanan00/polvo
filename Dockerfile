# Dockerfile.prod
FROM node:alpine3.20 AS builder
WORKDIR /app

# Use ci for deterministic prod installs
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime stage ---
FROM node:alpine3.20
WORKDIR /app

# Only what runtime needs
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

EXPOSE 3000

# healthcheck: note the /profile base path from svelte.config.js
HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=6 \
  CMD wget -qO- http://127.0.0.1:3000/profile/health || exit 1

# Run the adapter-node output
CMD ["node", "build"]

