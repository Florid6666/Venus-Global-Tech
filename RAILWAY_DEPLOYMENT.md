# Railway deployment guide

This project deploys to Railway as **one service**. The root [`Dockerfile`](Dockerfile)
builds the React app and copies it into the Express backend's image; the
backend (`server/server.js`) serves both the built frontend and the `/api/*`
routes from the same domain. There is no CORS configuration or
`REACT_APP_API_URL` to set — the frontend always calls same-origin `/api/...`
paths (see `client/src/config/api.js`).

## 1. Create the service

1. In Railway, create a new project and add a service from this GitHub repo.
2. Root Directory: leave it as `/` (the repo root, not `client` or `server`).
3. Railway will detect the root `Dockerfile` and build with it automatically.

## 2. Environment variables

Set these on the service:

- `ADMIN_PASSWORD` — admin panel login password
- `ADMIN_TOKEN` — admin panel auth token
- `EMAIL_USER` / `EMAIL_PASS` — Gmail credentials used to send contact-form emails
- `RECIPIENT_EMAIL` — optional, where contact form emails are sent (defaults to `EMAIL_USER`)

Don't set `PORT` — Railway injects it automatically and the server reads
`process.env.PORT`.

## 3. Deploy

Push to `main`; Railway builds and deploys automatically.

## 4. Data persistence

`server/data/*.json` (content/blog edits) and `server/uploads/` (admin-uploaded
images) are written to local disk. Railway's filesystem is not persisted across
deploys by default — add Railway Volumes mounted at `/app/server/data` and
`/app/server/uploads` if you need admin edits to survive redeploys.

## 5. Verify

Open the service's Railway URL and confirm the site loads, then check
`https://<your-domain>/api/content/home` returns JSON.
