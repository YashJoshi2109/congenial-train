# Build stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --only=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/routes ./routes
COPY --from=builder /usr/src/app/models ./models
COPY --from=builder /usr/src/app/client ./client

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Expose the port
EXPOSE 80

# Start the application
CMD ["npm", "start"]
