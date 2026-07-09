# Admin API Cloud Function

This directory contains the Google Cloud Function for handling all admin operations.

## What's Included

- **index.js**: Full version with Cloud Storage support
- **index-simple.js**: Simplified version with in-memory storage (easier to test)
- **package.json**: Dependencies for the cloud function
- **README.md**: Detailed documentation
- **DEPLOYMENT.md**: Step-by-step deployment guide
- **deploy.sh**: Deployment script

## Quick Start

### 1. Deploy to Google Cloud

```bash
cd server/cloud-functions/admin-api

# Use simple version (easier to start)
mv index.js index-full.js
mv index-simple.js index.js

# Deploy
gcloud functions deploy adminApi \
  --gen2 \
  --runtime=nodejs18 \
  --region=us-central1 \
  --source=. \
  --entry-point=adminApi \
  --trigger=http \
  --allow-unauthenticated \
  --set-env-vars ADMIN_PASSWORD=admin123,ADMIN_TOKEN=admin-token-123
```

### 2. Update Client Configuration

Edit `client/src/config/api.js`:

```javascript
const USE_CLOUD_FUNCTION = true; // Change to true
const CLOUD_FUNCTION_URL = 'https://YOUR-FUNCTION-URL'; // Update with your URL
```

### 3. Test

1. Start your frontend: `cd client && npm start`
2. Go to: `http://localhost:3000/admin`
3. Login with password: `admin123`

## API Endpoints

All endpoints are available at your cloud function URL:

- `POST /api/admin/login` - Admin login
- `GET /api/content` - Get all content
- `GET /api/content/:section` - Get specific section
- `PUT /api/content/:section` - Update section (requires auth)
- `PUT /api/content/:section/:subsection` - Update subsection (requires auth)

## Files Structure

```
server/cloud-functions/admin-api/
├── index.js              # Full version with Cloud Storage
├── index-simple.js       # Simple version (in-memory)
├── package.json          # Dependencies
├── README.md             # Full documentation
├── DEPLOYMENT.md         # Deployment guide
├── deploy.sh            # Deployment script
└── .gcloudignore        # Files to ignore when deploying
```

## Next Steps

1. Deploy the function to Google Cloud
2. Update the client config to use the cloud function
3. Test the admin panel
4. (Optional) Add Cloud Storage for persistent storage

For detailed instructions, see `DEPLOYMENT.md`.

