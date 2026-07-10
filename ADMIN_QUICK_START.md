# Admin Panel Quick Start Guide

## Getting Started

1. **Start your server**:
   ```bash
   npm run server
   ```

2. **Access the admin panel**:
   - Open your browser and go to: `http://localhost:5000/admin`
   - Log in with the email/password from the account you created (see below)

3. **Edit content**:
   - Select a section from the sidebar (Home Page, About Page, etc.)
   - Edit any field you want to change
   - Click the "Save" button for that section
   - Refresh your website to see changes

## Login Credentials

There's no default account — create one yourself, from the `server/` directory:
```
npm run set-admin -- you@example.com your-password
```
This stores the email and a bcrypt hash of the password in `server/data/admin.json`
(gitignored, never committed). Run the same command again with a new password
to rotate credentials.

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
- Check that you're using the correct email and password
- If you haven't created an account yet, run `npm run set-admin -- you@example.com your-password` from `server/`

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
- Set a strong, unique `JWT_SECRET` env var so admin sessions survive restarts
- Use a strong password when running `npm run set-admin`
- Use HTTPS


