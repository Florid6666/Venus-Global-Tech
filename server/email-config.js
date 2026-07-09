// Email Configuration
// Copy this file to .env and update with your email credentials

module.exports = {
  // For Gmail:
  // 1. Enable 2-Factor Authentication
  // 2. Generate App Password: Google Account → Security → 2-Step Verification → App passwords
  // 3. Use your Gmail address and the 16-character app password
  
  EMAIL_USER: 'your-email@gmail.com',        // Your email address
  EMAIL_PASS: 'your-16-character-app-password', // Your app password
  RECIPIENT_EMAIL: 'your-email@gmail.com',   // Where to receive contact form emails
  
  // For other email services, update the service in server.js:
  // - Outlook/Hotmail: service: 'hotmail'
  // - Yahoo: service: 'yahoo'
  // - Custom SMTP: configure with your SMTP settings
  
  PORT: 5000
};

// Instructions:
// 1. Create a .env file in your project root
// 2. Add these variables to .env:
//    EMAIL_USER=your-email@gmail.com
//    EMAIL_PASS=your-app-password
//    RECIPIENT_EMAIL=your-email@gmail.com
//    PORT=5000
// 3. Update server.js to use your email address in the 'to' field
// 4. Run: npm run server

