// API Configuration
// Set USE_CLOUD_FUNCTION to true to use cloud function, false for local server

const USE_CLOUD_FUNCTION = false; // Change to true to use cloud function

// Cloud Function URL (update with your deployed function URL)
const CLOUD_FUNCTION_URL = 'https://venusglobal-server-841304788329.asia-south1.run.app';

// Local server URL
const LOCAL_API_URL = '';

// Export the base URL

export const API_BASE_URL = USE_CLOUD_FUNCTION ? CLOUD_FUNCTION_URL : LOCAL_API_URL;

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return USE_CLOUD_FUNCTION 
    ? `${CLOUD_FUNCTION_URL}/${cleanEndpoint}`
    : `/${cleanEndpoint}`;
};

