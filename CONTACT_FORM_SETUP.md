# Contact Form Setup Instructions

## Overview
The contact form is now set up to send emails to your specified email address when users submit the form.

## Setup Steps

### 1. Install Server Dependencies
```bash
npm install express nodemailer cors
npm install --save-dev nodemon
```

### 2. Email Configuration

#### For Gmail:
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Create a `.env` file in your project root:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
PORT=5000
```

#### For Other Email Services:
- **Outlook/Hotmail**: Use `service: 'hotmail'`
- **Yahoo**: Use `service: 'yahoo'`
- **Custom SMTP**: Configure with your SMTP settings

### 3. Update Email Address
In `server.js`, update the `to` field in the `mailOptions` object to your desired email address:
```javascript
to: 'your-email@gmail.com', // Change this to your email
```

### 4. Run the Server
```bash
# Development
npm run dev

# Production
npm start
```

### 5. Build and Deploy
```bash
# Build React app
npm run build

# Start server (serves both API and React app)
npm start
```

## Features

✅ **Form Validation**: All fields are required
✅ **Email Sending**: Sends formatted email with all form data
✅ **Success/Error Messages**: User feedback for form submission
✅ **Loading States**: Button shows "Sending..." during submission
✅ **Form Reset**: Clears form after successful submission

## Email Format
The email will include:
- Name
- Email
- Phone Number
- Budget
- Inquiry Message
- Timestamp (automatic)

## Troubleshooting

### Common Issues:
1. **"Invalid login"**: Check your email credentials and app password
2. **"Connection timeout"**: Verify your internet connection and email service settings
3. **Form not submitting**: Check browser console for errors

### Testing:
1. Fill out the contact form
2. Submit and check your email
3. Verify all information is received correctly

## Security Notes
- Never commit your `.env` file to version control
- Use environment variables for sensitive information
- Consider adding rate limiting for production use
- Validate and sanitize all form inputs

## Alternative Solutions
If you prefer not to run your own server, consider:
- **Netlify Forms**: For static hosting
- **Formspree**: Third-party form handling
- **EmailJS**: Client-side email sending
- **Zapier**: Automation platform
