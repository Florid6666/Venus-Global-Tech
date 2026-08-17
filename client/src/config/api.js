// API Configuration
// Production-safe configuration that avoids hardcoded localhost references.
//
// Priority order:
// 1. REACT_APP_USE_CLOUD_FUNCTION=true → use Google Cloud Function
// 2. Production build (npm run build / NODE_ENV=production) → always use
//    same-origin relative paths (/api/*). This is the Railway deployment
//    case: the built React app and the Express API are served from the
//    same service/domain, so the frontend should never call out to a
//    different host.
// 3. Non-production (e.g. `react-scripts start` for local development) with
//    REACT_APP_API_URL set → use that backend URL. This is only relevant
//    locally, where the backend typically runs on a different port
//    (e.g. http://localhost:5000) than the CRA dev server.
// 4. Default (local dev, no REACT_APP_API_URL) → same-origin relative
//    paths; local development normally relies on setupProxy.js to forward
//    /api requests to the backend instead.
//
// IMPORTANT: Never hardcode localhost here. Local development should set
// REACT_APP_API_URL (or rely on the CRA dev proxy) instead.

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const USE_CLOUD_FUNCTION = process.env.REACT_APP_USE_CLOUD_FUNCTION === 'true';
const CLOUD_FUNCTION_URL = process.env.REACT_APP_CLOUD_FUNCTION_URL || 'https://venusglobal-server-841304788329.asia-south1.run.app';

// Respect REACT_APP_API_URL if set (e.g. on Vercel/Netlify pointing to deployed Express backend).
// Otherwise, default to relative path '/' in production for single-domain hosts like Railway,
// or setupProxy in development.
const API_URL = (process.env.REACT_APP_API_URL || '').trim();

export const API_BASE_URL = API_URL || (USE_CLOUD_FUNCTION ? CLOUD_FUNCTION_URL : '/');

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

  if (API_URL) {
    const normalizedBaseUrl = API_URL.replace(/\/$/, '');
    return `${normalizedBaseUrl}/${cleanEndpoint}`;
  }

  if (USE_CLOUD_FUNCTION) {
    return `${CLOUD_FUNCTION_URL}/${cleanEndpoint}`;
  }

  // Relative path default for Railway (same origin) or local setupProxy
  return `/${cleanEndpoint}`;
};

