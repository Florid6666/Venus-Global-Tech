# PowerShell script to start both client and server in development mode

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Venus Tech Development" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; Write-Host 'BACKEND SERVER - Port 5000' -ForegroundColor Green; npm start" -WindowStyle Normal

Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host "Starting Frontend Server (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; Write-Host 'FRONTEND SERVER - Port 3000' -ForegroundColor Green; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting in separate windows." -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Admin:    http://localhost:3000/admin" -ForegroundColor Cyan
Write-Host ""

