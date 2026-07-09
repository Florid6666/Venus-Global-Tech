# Firebase Functions Deployment Guide

## Prerequisites

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select existing one
   - Enable Firestore Database

## Setup

### 1. Initialize Firebase in the Function Directory

```bash
cd server/cloud-functions/admin-api
firebase init functions
```

When prompted:
- Select your Firebase project
- Choose JavaScript
- Install dependencies: Yes

### 2. Update .firebaserc

Edit `.firebaserc` and set your project ID:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 3. Set Configuration

Set admin credentials using Firebase config:

```bash
firebase functions:config:set admin.password="admin123" admin.token="admin-token-123"
```

Or use environment variables in `.env` file (for local development).

### 4. Initialize Firestore

1. Go to Firebase Console
2. Navigate to Firestore Database
3. Create database (start in test mode for now)
4. The function will automatically create the `cms/content` document on first use

## Deployment

### Deploy the Function

```bash
cd server/cloud-functions/admin-api
firebase deploy --only functions:adminApi
```

### Get Function URL

After deployment, you'll see the function URL. It will look like:
```
https://us-central1-your-project.cloudfunctions.net/adminApi
```

## Update Client Configuration

Edit `client/src/config/api.js`:

```javascript
const USE_CLOUD_FUNCTION = true;
const CLOUD_FUNCTION_URL = 'https://us-central1-your-project.cloudfunctions.net/adminApi';
```

## Local Testing

### 1. Start Firebase Emulators

```bash
cd server/cloud-functions/admin-api
firebase emulators:start --only functions,firestore
```

### 2. Test Locally

The function will be available at:
```
http://localhost:5001/your-project/us-central1/adminApi
```

Update your client config for local testing:
```javascript
const CLOUD_FUNCTION_URL = 'http://localhost:5001/your-project/us-central1/adminApi';
```

### 3. Import Initial Content

To import your existing content.json:

```bash
# Install firebase-tools if not already installed
npm install -g firebase-tools

# Import content to Firestore
firebase firestore:import --project your-project-id server/data/content.json
```

Or manually:
1. Open Firebase Console
2. Go to Firestore Database
3. Create collection: `cms`
4. Create document: `content`
5. Paste your content.json data

## Environment Variables

### Using Firebase Config (Recommended for Production)

```bash
firebase functions:config:set admin.password="your-password" admin.token="your-token"
```

### Using .env File (For Local Development)

Create `.env` file:
```
ADMIN_PASSWORD=admin123
ADMIN_TOKEN=admin-token-123
```

## API Endpoints

All endpoints are available at your Firebase function URL:

- `POST /api/admin/login` - Admin login
- `GET /api/content` - Get all content
- `GET /api/content/:section` - Get specific section
- `PUT /api/content/:section` - Update section (requires auth)
- `PUT /api/content/:section/:subsection` - Update subsection (requires auth)

## Security

### 1. Set Strong Credentials

```bash
firebase functions:config:set admin.password="strong-password-here" admin.token="secure-token-here"
```

### 2. Enable Authentication (Optional)

To require Firebase Authentication:

1. Update function to check Firebase Auth token
2. Deploy with authentication required

### 3. Firestore Security Rules

Update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cms/{document=**} {
      // Allow read for authenticated users
      allow read: if request.auth != null;
      // Allow write only for admins
      allow write: if request.auth != null && 
                     request.auth.token.admin == true;
    }
  }
}
```

## Troubleshooting

### Function not deploying

- Check Firebase CLI is logged in: `firebase login`
- Verify project ID in `.firebaserc`
- Check Node.js version (should be 18)

### CORS errors

- The function includes CORS handling
- Make sure your frontend URL is in allowed origins

### Firestore errors

- Make sure Firestore is enabled in Firebase Console
- Check database rules allow access
- Verify collection name is `cms` and document is `content`

### Authentication failing

- Verify `ADMIN_TOKEN` matches in function config and client
- Check Authorization header format: `Bearer YOUR_TOKEN`

## View Logs

```bash
firebase functions:log
```

Or view in Firebase Console under Functions > Logs.

## Update Function

After making changes:

```bash
firebase deploy --only functions:adminApi
```

## Rollback

To rollback to previous version:

```bash
firebase functions:delete adminApi
firebase deploy --only functions:adminApi@previous-version
```

