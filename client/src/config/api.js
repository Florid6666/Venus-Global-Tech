// API Configuration
// Use REACT_APP_API_URL to point the frontend at a separate backend service.
// When unset, requests fall back to the current origin so the frontend can work
// with a same-host API in production without hardcoding localhost.

const USE_CLOUD_FUNCTION = process.env.REACT_APP_USE_CLOUD_FUNCTION === 'true';

// Cloud Function URL (update with your deployed function URL if needed)
const CLOUD_FUNCTION_URL = process.env.REACT_APP_CLOUD_FUNCTION_URL || 'https://venusglobal-server-841304788329.asia-south1.run.app';

// Backend URL for Railway or any other deployment
const API_URL = (process.env.REACT_APP_API_URL || '').trim();

export const API_BASE_URL = USE_CLOUD_FUNCTION ? CLOUD_FUNCTION_URL : API_URL;

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

  return `/${cleanEndpoint}`;
};

