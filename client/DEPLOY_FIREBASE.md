# Firebase Hosting Deployment Guide

## Problem
Changes in `public/index.html` are visible locally but not in deployment because:
1. React builds from `public/index.html` → `build/index.html`
2. Firebase Hosting serves from the `build` folder
3. After making changes, you need to rebuild AND redeploy

## Solution: Deploy Updated Build

### Step 1: Rebuild the React App
```bash
cd client
npm run build
```

This creates/updates the `build` folder with latest changes from `public/index.html`.

### Step 2: Deploy to Firebase Hosting
```bash
cd client
npx firebase deploy --only hosting
```

Or if you have firebase-tools installed globally:
```bash
cd client
firebase deploy --only hosting
```

### Step 3: Verify Deployment
After deployment, Firebase will show you the deployed URL. Visit it and check:
- View page source (Ctrl+U)
- Check the `<title>` tag - should show "Tech Company"
- Check meta tags in `<head>`

## Quick Deploy Script

Run this from the `client` directory:
```bash
npm run build && npx firebase deploy --only hosting
```

## Troubleshooting

### Changes still not showing?
1. **Clear browser cache** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check build folder** - Verify `build/index.html` has your changes
3. **Check Firebase console** - Go to Firebase Console > Hosting to see deployment history
4. **Force redeploy** - Delete `.firebase` cache and redeploy

### Build folder not updating?
- Delete `build` folder: `rm -rf build` (or `rmdir /s build` on Windows)
- Rebuild: `npm run build`
- Verify: Check `build/index.html` has latest content

## Important Notes

- **Always rebuild** after changing `public/index.html`
- **Always redeploy** after rebuilding
- Firebase caches aggressively - may take a few minutes to see changes
- Use incognito/private browsing to test without cache

