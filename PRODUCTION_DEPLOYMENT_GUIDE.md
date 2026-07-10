# Production Deployment Guide

## API Connection Issues - FIXED

This guide explains how to properly deploy the Venus Global Tech application to avoid localhost connection errors like `net::ERR_CONNECTION_REFUSED`.

### The Problem
The application was trying to connect to hardcoded `localhost:5000/5050` in production, causing connection refused errors:
```
Failed to load resource: net::ERR_CONNECTION_REFUSED
Error fetching content: TypeError: Failed to fetch
localhost:5000/api/content/home
```

### The Solution

We've updated the application to use **environment-based configuration** instead of hardcoded localhost references:

#### 1. **Frontend API Configuration** (`client/src/config/api.js`)
The frontend now uses this priority:
1. If `REACT_APP_USE_CLOUD_FUNCTION=true` → Use Google Cloud Function
2. If `REACT_APP_API_URL` is set → Use that backend URL
3. **Default (production-safe)** → Use same-origin (`/api`)

#### 2. **Development Setup** (`setupProxy.js`)
- `setupProxy.js` is **ONLY used during development** (`npm start`)
- It respects `REACT_APP_DEV_BACKEND` or `REACT_APP_API_URL` environment variables
- **NOT included in production builds**

#### 3. **Removed Hardcoded Proxies**
- Removed `"proxy": "http://localhost:5050"` from `package.json`
- These were development-only settings that shouldn't affect production

---

## Deployment Scenarios

### Scenario A: Frontend and Backend on Same Host (RECOMMENDED)

**Best for**: Cloud deployments (Railway, Heroku, etc.)

**Setup**:
1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Backend serves everything:
   ```bash
   cd server
   npm start
   ```
   - Backend automatically serves static React files
   - API requests work via same-origin (`/api/content`, etc.)

**Environment Variables**: None needed for API connection

**Why it works**: Frontend requests `/api/content/home` → Browser resolves to `https://yourdomain.com/api/content/home` → Backend handles it

---

### Scenario B: Separate Frontend and Backend Hosts

**Setup for Frontend Build**:
```bash
cd client
REACT_APP_API_URL=https://backend-api.example.com npm run build
npm run build
```

**Environment Variables**:
```
REACT_APP_API_URL=https://backend-api.example.com
```

**Backend**: Deploy to a different host/service

**CORS Requirements**: Backend must have proper CORS headers:
```javascript
app.use(cors()); // Already configured in server/server.js
```

---

### Scenario C: Using Google Cloud Functions

**Setup**:
```bash
cd client
REACT_APP_USE_CLOUD_FUNCTION=true \
REACT_APP_CLOUD_FUNCTION_URL=https://your-function-url.run.app \
npm run build
```

**Backend**: Deploy Google Cloud Function or keep backend running separately

---

## Railway Deployment Example

### For Venus Global Tech (Full Stack on Same Host)

**Railway Dashboard Environment Variables** (see [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for the full list):
```
NODE_ENV=production
JWT_SECRET=<random secret>
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=<used once to bootstrap the admin account>
```

**Build Command**:
```bash
npm install && cd client && npm run build && cd ..
```

**Start Command**:
```bash
npm start
```

The server starts on port 5000 and:
- Serves React build from `client/build`
- Handles `/api` requests
- Frontend requests `/api/content/...` → Same-origin works ✓

---

## Firebase Hosting (Separate Frontend)

If deploying frontend to Firebase Hosting and backend to Railway:

**1. Set Backend URL**:
```bash
cd client
REACT_APP_API_URL=https://venus-railway.up.railway.app npm run build
npm run build -- --prod
```

**2. Deploy to Firebase**:
```bash
npm run deploy:hosting
```

**3. Deploy Backend to Railway** with CORS enabled (already done in server.js)

---

## Testing the Connection

**Development** (with `npm start`):
```bash
# Starts on http://localhost:3000
# setupProxy forwards /api → http://localhost:5000 (or env var)
# Make sure backend is running: cd server && npm start
```

**Production** (after build):
```bash
# Frontend uses same-origin by default
curl https://yourdomain.com/api/content/home
# Should return content from /api endpoint
```

---

## Troubleshooting

### Error: `Failed to load resource: net::ERR_CONNECTION_REFUSED`

**Check**:
1. Is backend running? → `cd server && npm start`
2. Are frontend and backend on same host? → API calls use `/api`
3. Are they separate? → Set `REACT_APP_API_URL` during build
4. Is CORS enabled? → Backend has `app.use(cors())`

### Error: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Fix**: Backend must have CORS enabled (already configured in `server/server.js`)

### API works in development but fails in production

**Likely causes**:
- `setupProxy.js` hardcoded localhost (FIXED)
- `package.json` proxy setting hardcoded localhost (REMOVED)
- `REACT_APP_API_URL` not set during production build

**Solution**: Re-build with proper environment variables:
```bash
REACT_APP_API_URL=https://your-backend.com npm run build
```

---

## Summary of Changes

| File | Change | Why |
|------|--------|-----|
| `client/src/config/api.js` | Added fallback to same-origin | Production-safe defaults |
| `client/setupProxy.js` | Uses env vars instead of hardcoded localhost | Configurable for different environments |
| `client/package.json` | Removed `"proxy"` field | Was hardcoded to localhost:5050 |

---

## Best Practices

1. ✅ **Always build with `REACT_APP_API_URL`** if backend is separate
2. ✅ **Use same-origin deployment** when possible (simpler, more reliable)
3. ✅ **Set environment variables** during build, not runtime
4. ✅ **Test API connectivity** before deploying
5. ✅ **Ensure CORS is enabled** if using separate domains

---

For Railway deployment details, see [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
