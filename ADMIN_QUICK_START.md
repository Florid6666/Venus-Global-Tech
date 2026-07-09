# Admin Panel Quick Start Guide

## Getting Started

1. **Start your server**:
   ```bash
   npm run server
   ```

2. **Access the admin panel**:
   - Open your browser and go to: `http://localhost:5000/admin`
   - Default password: `admin123`

3. **Edit content**:
   - Select a section from the sidebar (Home Page, About Page, etc.)
   - Edit any field you want to change
   - Click the "Save" button for that section
   - Refresh your website to see changes

## Default Login Credentials

- **Password**: `admin123`

To change the password, add to your `.env` file:
```
ADMIN_PASSWORD=your-new-password
ADMIN_TOKEN=your-secure-token
```

## What Can You Edit?

### Home Page
- Hero section (badge, titles, description, button text, image)
- About section (title, description, stats, phone numbers)
- Services (all service items with titles, descriptions, links, images)
- Working process steps
- Office locations and contact information

### About Page
- Hero section
- Content section with features

### Contact Page
- Hero section
- Form section

### Navigation Bar
- Logo path
- Phone number
- Call text
- WhatsApp link

### Footer
- Brand name and description
- Contact information
- Copyright text

## Important Notes

- All changes are saved to `data/content.json`
- Changes take effect immediately after saving
- You may need to refresh the page to see updates
- The admin panel is protected by password authentication

## Troubleshooting

**Can't log in?**
- Make sure the server is running
- Check that you're using the correct password
- Default password is `admin123` if not set in `.env`

**Changes not showing?**
- Make sure you clicked "Save" after editing
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for any errors

**Content not loading?**
- Verify `data/content.json` exists
- Check server console for errors
- Ensure the server has read/write permissions

## Security Reminder

⚠️ For production use, please:
- Change the default password
- Use environment variables for sensitive data
- Consider implementing stronger authentication
- Use HTTPS


