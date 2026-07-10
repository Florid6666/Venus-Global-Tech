# Build the React frontend and prepare the Express backend in one container

FROM node:20-alpine AS builder
WORKDIR /app

# Install only frontend dependencies for the build stage
COPY client/package*.json ./client/
RUN cd client && npm install --no-audit --no-fund

# Copy the client source and build the static site
COPY client ./client
ARG REACT_APP_API_URL=http://localhost:5000
ARG REACT_APP_USE_CLOUD_FUNCTION=false
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_USE_CLOUD_FUNCTION=${REACT_APP_USE_CLOUD_FUNCTION}
RUN cd client && npm run build

# Final production image with backend and built frontend
FROM node:20-alpine AS runner
WORKDIR /app

# Install backend dependencies only
COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev --no-audit --no-fund

# Copy backend source and built frontend artifacts
COPY server ./server
COPY --from=builder /app/client/build ./client/build

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server/server.js"]
