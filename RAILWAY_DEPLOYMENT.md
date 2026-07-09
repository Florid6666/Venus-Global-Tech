# Railway deployment guide

This project is set up to deploy as two Railway services:

- Backend API service from the server folder
- Frontend static site service from the client folder

## 1. Create the backend service

1. In Railway, create a new project and add a service from the server folder.
2. Railway will detect the Node app automatically.
3. Set the following environment variables if needed:
   - PORT (Railway provides this automatically)
   - ADMIN_PASSWORD
   - ADMIN_TOKEN
   - EMAIL_USER
   - EMAIL_PASS
   - RECIPIENT_EMAIL

## 2. Create the frontend service

1. Add a second service from the client folder.
2. Set the frontend environment variable:
   - REACT_APP_API_URL: the public URL of the backend service
3. Optionally set:
   - REACT_APP_USE_CLOUD_FUNCTION=false

## 3. Deploy

Railway will build and start both services automatically using the provided railway.toml files.

## 4. Verify

- Backend health: open the backend URL and check the API routes
- Frontend: open the frontend URL and confirm the site loads
