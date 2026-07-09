# Admin API Cloud Function - Deployment Guide

## Quick Start

### Option 1: Deploy to Google Cloud Functions (Recommended)

1. **Install Google Cloud CLI:**
   ```bash
   # Download from https://cloud.google.com/sdk/docs/install
   ```

2. **Authenticate:**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Deploy the function:**
   ```bash
   cd server/cloud-functions/admin-api
   
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

4. **Get the function URL:**
   After deployment, you'll see the function URL. Update it in `client/src/config/api.js`:
   ```javascript
   const CLOUD_FUNCTION_URL = 'https://YOUR-FUNCTION-URL';
   const USE_CLOUD_FUNCTION = true;
   ```

**Note:** The previous "simple" in-memory prototype (`index-simple.js`) has been removed — it had no blogs support and lost all data on restart. `index.js` (Firestore + Firebase Storage) is the only supported entry point now.

### Option 3: Local Testing

1. **Install dependencies:**
   ```bash
   cd server/cloud-functions/admin-api
   npm install
   ```

2. **Run locally:**
   ```bash
   npm start
   ```

3. **Test:**
   ```bash
   # Login
   curl -X POST http://localhost:8080/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"password":"admin123"}'
   
   # Get content
   curl http://localhost:8080/api/content
   ```

## Updating Client to Use Cloud Function

1. **Edit `client/src/config/api.js`:**
   ```javascript
   const USE_CLOUD_FUNCTION = true; // Change to true
   const CLOUD_FUNCTION_URL = 'https://YOUR-FUNCTION-URL';
   ```

2. **Restart your frontend:**
   ```bash
   cd client
   npm start
   ```

## Adding Persistent Storage

### Using Cloud Storage

1. **Create a bucket:**
   ```bash
   gsutil mb gs://venus-tech-content
   ```

2. **Update `index.js` to use Cloud Storage:**
   - Uncomment Cloud Storage code
   - Set `CONTENT_BUCKET` environment variable

3. **Upload initial content:**
   ```bash
   gsutil cp ../../data/content.json gs://venus-tech-content/content.json
   ```

### Using Firestore

1. **Enable Firestore in your project**
2. **Update `index.js` to use Firestore**
3. **Set up Firebase Admin SDK credentials**

## Environment Variables

Set these when deploying:

- `ADMIN_PASSWORD`: Admin login password
- `ADMIN_TOKEN`: Bearer token for authenticated requests
- `CONTENT_BUCKET`: (Optional) Cloud Storage bucket name

## Security Recommendations

1. **Use Secret Manager for sensitive values:**
   ```bash
   gcloud secrets create admin-password --data-file=-
   gcloud functions deploy adminApi --update-secrets ADMIN_PASSWORD=admin-password:latest
   ```

2. **Enable authentication:**
   Remove `--allow-unauthenticated` and use IAM for access control

3. **Use HTTPS only:**
   Cloud Functions automatically use HTTPS

4. **Change default passwords:**
   Never use default passwords in production

## Troubleshooting

**Function not responding:**
- Check Cloud Functions logs: `gcloud functions logs read adminApi`
- Verify environment variables are set correctly

**CORS errors:**
- The function includes CORS handling
- Make sure your frontend URL is allowed

**Authentication failing:**
- Verify `ADMIN_TOKEN` matches in both function and client
- Check Authorization header format: `Bearer YOUR_TOKEN`

