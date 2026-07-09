# Quick Start Guide

## First Time Setup

### 1. Install Dependencies

**Client (React Frontend):**
```bash
cd client
npm install
```

**Server (Express Backend):**
```bash
cd server
npm install
```

## Running the Application

### Option 1: Use the Startup Script (Windows)
```powershell
.\start-dev.ps1
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

## Access Points

- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **API Server:** http://localhost:5000
- **Default Admin Password:** `admin123`

## Project Structure

```
venus-tech/
├── client/              # React frontend
│   ├── src/            # React source code
│   ├── public/         # Public assets
│   └── package.json    # Client dependencies
│
├── server/              # Express backend
│   ├── data/           # Content data
│   ├── server.js       # Main server file
│   └── package.json    # Server dependencies
│
└── README.md           # Full documentation
```

## Environment Variables

Create `.env` file in `server/` directory:
```
PORT=5000
ADMIN_PASSWORD=admin123
ADMIN_TOKEN=admin-token-123
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Troubleshooting

**Port already in use?**
- Kill processes: `taskkill /F /IM node.exe` (Windows)
- Or change ports in `.env` file

**Dependencies missing?**
- Run `npm install` in both `client/` and `server/` directories

**Admin panel not loading?**
- Make sure both servers are running
- Check browser console for errors
- Verify backend is on port 5000

