# Admin API Firebase Function

Firebase Cloud Function that handles all admin operations for the Venus Tech CMS.

## Features

- ✅ **Admin Login**: Authenticate and get access token
- ✅ **Get Content**: Retrieve all content or specific sections from Firestore
- ✅ **Update Content**: Update sections or subsections (requires authentication)
- ✅ **Persistent Storage**: Uses Firestore for reliable data storage
- ✅ **CORS Enabled**: Works with frontend from any domain

## Quick Start

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Initialize Firebase

```bash
cd server/cloud-functions/admin-api
firebase init functions
```

### 3. Set Configuration

```bash
firebase functions:config:set admin.password="admin123" admin.token="admin-token-123"
```

### 4. Deploy

```bash
firebase deploy --only functions:adminApi
```

### 5. Update Client

Edit `client/src/config/api.js`:
```javascript
const USE_CLOUD_FUNCTION = true;
const CLOUD_FUNCTION_URL = 'https://us-central1-your-project.cloudfunctions.net/adminApi';
```

## Project Structure

```
admin-api/
├── index.js                 # Main Firebase function
├── package.json             # Dependencies
├── firebase.json            # Firebase configuration
├── .firebaserc             # Firebase project config
├── FIREBASE_DEPLOYMENT.md  # Detailed deployment guide
├── import-content.js       # Script to import existing content
└── .gitignore             # Git ignore rules
```

## API Endpoints

All endpoints are available at your Firebase function URL:

### POST /api/admin/login
Login endpoint for admin authentication.

**Request:**
```json
{
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "admin-token-123",
  "message": "Login successful"
}
```

### GET /api/content
Get all content from Firestore.

**Response:**
```json
{
  "home": { ... },
  "about": { ... },
  "contact": { ... },
  "navbar": { ... },
  "footer": { ... }
}
```

### GET /api/content/:section
Get specific content section.

**Example:** `GET /api/content/home`

### PUT /api/content/:section
Update entire section. Requires Bearer token.

**Headers:**
```
Authorization: Bearer admin-token-123
Content-Type: application/json
```

### PUT /api/content/:section/:subsection
Update nested subsection. Requires Bearer token.

**Example:** `PUT /api/content/home/hero`

## Local Development

### 1. Start Emulators

```bash
firebase emulators:start --only functions,firestore
```

### 2. Test Locally

Function will be available at:
```
http://localhost:5001/your-project/us-central1/adminApi
```

### 3. Import Content

To import existing content.json to Firestore:

1. Download service account key from Firebase Console
2. Save as `serviceAccountKey.json` in this directory
3. Run: `node import-content.js`

## Configuration

### Environment Variables

Set using Firebase config:
```bash
firebase functions:config:set admin.password="your-password" admin.token="your-token"
```

Or use `.env` file for local development.

### Firestore Structure

The function stores content in:
- **Collection**: `cms`
- **Document**: `content`
- **Data**: Your content.json structure

## Security

1. **Change Default Passwords**: Never use default values in production
2. **Use Firebase Config**: Store secrets in Firebase config, not in code
3. **Firestore Rules**: Set up security rules to protect your data
4. **HTTPS Only**: Firebase Functions automatically use HTTPS

## Troubleshooting

See `FIREBASE_DEPLOYMENT.md` for detailed troubleshooting guide.

## Documentation

- **Deployment Guide**: `FIREBASE_DEPLOYMENT.md`
- **Firebase Docs**: https://firebase.google.com/docs/functions
- **Firestore Docs**: https://firebase.google.com/docs/firestore
