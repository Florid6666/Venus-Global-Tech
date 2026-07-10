FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
ARG REACT_APP_API_URL=
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ARG REACT_APP_USE_CLOUD_FUNCTION=false
ENV REACT_APP_USE_CLOUD_FUNCTION=$REACT_APP_USE_CLOUD_FUNCTION
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/server.js ./server.js

ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
