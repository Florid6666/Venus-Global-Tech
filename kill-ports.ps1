# Simple PowerShell script to kill all processes on specific ports
# Usage: .\kill-ports.ps1 5000 3000

param(
    [Parameter(Mandatory=$false)]
    [int[]]$Ports = @(5000, 3000)
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Killing Processes on Ports" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($port in $Ports) {
    Write-Host "Checking port $port..." -ForegroundColor Yellow
    
    # Find processes using the port
    $connections = netstat -ano | findstr ":$port.*LISTENING"
    
    if ($connections) {
        $connections | ForEach-Object {
            $parts = $_ -split '\s+'
            $pid = $parts[-1]
            
            if ($pid -and $pid -match '^\d+$') {
                try {
                    $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                    if ($process) {
                        Write-Host "  Killing PID $pid ($($process.ProcessName)) on port $port" -ForegroundColor Red
                        Stop-Process -Id $pid -Force -ErrorAction Stop
                    }
                } catch {
                    Write-Host "  Could not kill PID $pid: $_" -ForegroundColor Yellow
                }
            }
        }
    } else {
        Write-Host "  Port $port is already free" -ForegroundColor Green
    }
}

# Also kill all Node.js processes
Write-Host "`nKilling all Node.js processes..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "  Killing Node process: PID $($_.Id)" -ForegroundColor Red
    Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
}

Start-Sleep -Seconds 2

Write-Host "`n=== Final Status ===" -ForegroundColor Cyan
foreach ($port in $Ports) {
    $inUse = netstat -ano | findstr ":$port.*LISTENING"
    Write-Host "Port $port : " -NoNewline
    if ($inUse) {
        Write-Host "STILL IN USE ✗" -ForegroundColor Red
    } else {
        Write-Host "FREE ✓" -ForegroundColor Green
    }
}

Write-Host "`nDone!" -ForegroundColor Green

