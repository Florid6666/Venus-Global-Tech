# Admin Content Management System

## Overview
This admin system allows you to edit all website content without touching any code. Simply log in to the admin panel and update content through a user-friendly interface.

## Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Enter the admin password (default: `admin123`)
3. You'll be redirected to the content management dashboard

## Changing the Admin Password

To change the default password, add the following to your `.env` file:

```
ADMIN_PASSWORD=your-secure-password
ADMIN_TOKEN=your-secure-token
```

## Available Content Sections

### 1. Home Page
- **Hero Section**: Badge, title lines, description, CTA button, and image
- **About Section**: Badge, title, description, stats (numbers, descriptions, icons), phone number, WhatsApp link
- **Services Section**: Badge, title, description, and all service items (title, description, links, images)
- **Working Process**: Badge, title, and all process steps
- **Office Locations**: All office details including addresses and phone numbers

### 2. About Page
- **Hero Section**: Title and description
- **Content Section**: Title, description, and feature items

### 3. Contact Page
- **Hero Section**: Title and description
- **Form Section**: Badge and title

### 4. Navigation Bar
- Logo image path
- Call text
- Phone number
- WhatsApp link

### 5. Footer
- Brand name and description
- Contact information (address, phone, email)
- Copyright text

## How to Edit Content

1. **Log in** to the admin panel at `/admin`
2. **Select a section** from the sidebar (Home Page, About Page, etc.)
3. **Edit the fields** you want to change
4. **Click "Save"** button for that section
5. **Refresh your website** to see the changes

## Content Storage

All content is stored in `data/content.json`. This file is automatically updated when you save changes through the admin panel.

## API Endpoints

### Public Endpoints (No Authentication Required)
- `GET /api/content` - Get all content
- `GET /api/content/:section` - Get specific section (e.g., `/api/content/home`)

### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Login with password
- `PUT /api/content/:section` - Update entire section
- `PUT /api/content/:section/:subsection` - Update subsection (e.g., `/api/content/home/hero`)

## Using Dynamic Content in Pages

To make your pages use dynamic content from the API, you can use the `useContent` hook:

```javascript
import { useContent } from '../hooks/useContent';

const MyPage = () => {
  const { content, loading, error } = useContent('home');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content</div>;
  
  return (
    <div>
      <h1>{content?.hero?.titleLine1}</h1>
      <p>{content?.hero?.description}</p>
    </div>
  );
};
```

## Security Notes

⚠️ **Important**: The current authentication system is basic and suitable for development. For production:

1. Use proper JWT tokens with expiration
2. Implement rate limiting
3. Use HTTPS
4. Consider adding role-based access control
5. Store passwords securely (hashed, not plain text)
6. Add CSRF protection

## Troubleshooting

### Can't log in?
- Check that the server is running
- Verify the password matches `ADMIN_PASSWORD` in `.env` or default `admin123`
- Check browser console for errors

### Changes not appearing?
- Make sure you clicked "Save" after editing
- Refresh the page (hard refresh: Ctrl+F5 or Cmd+Shift+R)
- Check that the API is returning updated content

### Content not loading?
- Verify `data/content.json` exists
- Check server logs for errors
- Ensure the server has read/write permissions for the `data` directory

## File Structure

```
├── data/
│   └── content.json          # All website content
├── src/
│   ├── pages/
│   │   └── Admin.jsx        # Admin panel
│   └── hooks/
│       └── useContent.js    # Hook for fetching content
└── server.js                 # API endpoints
```

## Next Steps

To make all pages fully dynamic:

1. Import `useContent` hook in each page component
2. Replace hardcoded text with content from the API
3. Add loading states while content is being fetched
4. Handle errors gracefully

Example transformation:
```javascript
// Before (hardcoded)
<h1>Driving Growth Through</h1>

// After (dynamic)
<h1>{content?.hero?.titleLine1}</h1>
```

## Support

For issues or questions, check:
- Server console logs
- Browser developer console
- Network tab in browser DevTools






