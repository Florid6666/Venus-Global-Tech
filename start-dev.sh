#!/bin/bash
# Bash script to start both client and server in development mode

echo "========================================"
echo "  Starting Venus Tech Development"
echo "========================================"
echo ""

# Start Backend Server
echo "Starting Backend Server (Port 5000)..."
cd server
npm start &
BACKEND_PID=$!
cd ..

sleep 3

# Start Frontend Server
echo "Starting Frontend Server (Port 3000)..."
cd client
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "Both servers are starting..."
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "Admin:    http://localhost:3000/admin"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

