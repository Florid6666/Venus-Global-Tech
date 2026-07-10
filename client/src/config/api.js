// API Configuration
// Production-safe configuration that avoids hardcoded localhost references.
// 
// Priority order:
// 1. REACT_APP_USE_CLOUD_FUNCTION=true → use Google Cloud Function
// 2. REACT_APP_API_URL set → use that backend URL
// 3. Default → use same-origin (e.g., /api from frontend origin)
//
// IMPORTANT: Never use localhost in production deployments.
// For separate backends, always set REACT_APP_API_URL during build.

const USE_CLOUD_FUNCTION = process.env.REACT_APP_USE_CLOUD_FUNCTION === 'true';

// Cloud Function URL (update with your deployed function URL if needed)
const CLOUD_FUNCTION_URL = process.env.REACT_APP_CLOUD_FUNCTION_URL || 'https://venusglobal-server-841304788329.asia-south1.run.app';

// Backend URL for Railway or any other deployment
// In production, this should be set via environment variables
const API_URL = (process.env.REACT_APP_API_URL || '').trim();

export const API_BASE_URL = USE_CLOUD_FUNCTION ? CLOUD_FUNCTION_URL : (API_URL || '/');

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

  if (USE_CLOUD_FUNCTION) {
    return `${CLOUD_FUNCTION_URL}/${cleanEndpoint}`;
  }

  if (API_URL) {
    const normalizedBaseUrl = API_URL.replace(/\/$/, '');
    return `${normalizedBaseUrl}/${cleanEndpoint}`;
  }

  // Production safe: use same-origin by default (relative paths)
  return `/${cleanEndpoint}`;
};

