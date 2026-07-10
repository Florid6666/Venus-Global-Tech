// Creates or rotates the single admin account stored in server/data/admin.json.
//
// Usage (run from the server/ directory):
//   npm run set-admin -- <email> <password>
//
// This overwrites any existing admin account. There's currently only ever
// one admin — see server.js's readAdmin/authenticateAdmin.

const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

const ADMIN_FILE = path.join(__dirname, '..', 'data', 'admin.json');

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    console.error('Usage: npm run set-admin -- <email> <password>');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await fs.mkdir(path.dirname(ADMIN_FILE), { recursive: true });
  await fs.writeFile(
    ADMIN_FILE,
    JSON.stringify({ email: email.toLowerCase().trim(), passwordHash }, null, 2),
    'utf8'
  );
  console.log(`Admin account set for ${email}.`);
}

main().catch((error) => {
  console.error('Failed to set admin account:', error);
  process.exit(1);
});
