const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Contact Form Email Configuration...\n');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envExample = `# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com

# Server Configuration
PORT=5000`;

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envExample);
  console.log('✅ Created .env file');
} else {
  console.log('ℹ️  .env file already exists');
}

console.log('\n📧 Email Setup Instructions:');
console.log('1. Open the .env file in your project root');
console.log('2. Update the following values:');
console.log('   - EMAIL_USER: Your Gmail address');
console.log('   - EMAIL_PASS: Your Gmail app password (not regular password)');
console.log('   - RECIPIENT_EMAIL: Where you want to receive contact form emails');
console.log('\n🔐 Gmail App Password Setup:');
console.log('1. Go to your Google Account settings');
console.log('2. Security → 2-Step Verification → App passwords');
console.log('3. Generate a new app password for "Mail"');
console.log('4. Use the 16-character password in EMAIL_PASS');
console.log('\n🚀 To start the server:');
console.log('   npm run server');
console.log('\n🌐 To test the contact form:');
console.log('1. Start the server: npm run server');
console.log('2. Open your website and fill out the contact form');
console.log('3. Check your email for the form submission');
console.log('\n✨ Setup complete! Update your .env file and start the server.');

