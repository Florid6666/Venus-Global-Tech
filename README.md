# Venus Global Technology

A modern web application with separate client and server architecture.

## Project Structur

```
venus-tech/
├── client/          # React frontend application
├── server/          # Express backend API server
└── README.md        # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Client Dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

### Running the Application

#### Development Mode

1. **Start the Backend Server:**
   ```bash
   cd server
   npm start
   # or for auto-reload:
   npm run dev
   ```
   Server runs on: `http://localhost:5000`

2. **Start the Frontend (in a new terminal):**
   ```bash
   cd client
   npm start
   ```
   Frontend runs on: `http://localhost:3000`

#### Production Mode

1. **Build the Client:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the Server:**
   ```bash
   cd server
   npm start
   ```
   The server will serve the built React app from `client/build`

## Admin Panel

- URL: `http://localhost:3000/admin`
- Login with the email/password set up below (there's no default — you create the account yourself).

The admin account (email + bcrypt-hashed password) is stored in `server/data/admin.json`,
never in an env var or in git. Create/rotate it by running, from `server/`:
```
npm run set-admin -- you@example.com your-password
```
Alternatively, set `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `server/.env` before the
*first* time you start the server — it bootstraps the account from those and
ignores them afterwards.

## Environment Variables

### Server (.env in server/ directory)

```
PORT=5000
JWT_SECRET=some-long-random-string
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=used-once-to-bootstrap-the-account
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=recipient@example.com
```

### Client

The client uses a proxy to connect to the backend. No environment variables needed for development.

## API Endpoints

- `GET /api/content` - Get all content
- `GET /api/content/:section` - Get specific section
- `PUT /api/content/:section` - Update section (requires auth)
- `PUT /api/content/:section/:subsection` - Update subsection (requires auth)
- `POST /api/admin/login` - Admin login
- `POST /api/contact` - Contact form submission

## Project Structure Details

### Client (`/client`)
- React application
- Source code in `src/`
- Public assets in `public/`
- Build output in `build/` (generated)

### Server (`/server`)
- Express API server
- Content data in `data/content.json`
- Server configuration in `server.js`

## Development

- Client development server: `http://localhost:3000`
- Backend API server: `http://localhost:5000`
- The client automatically proxies API requests to the backend

## Deployment

1. Build the client: `cd client && npm run build`
2. The server will serve the built files from `client/build`
3. Set environment variables in production
4. Start the server: `cd server && npm start`

## License

MIT
