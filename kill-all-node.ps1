# Simple script to kill ALL Node.js processes
# Usage: .\kill-all-node.ps1

Write-Host "Killing all Node.js processes..." -ForegroundColor Yellow

$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    $nodeProcesses | ForEach-Object {
        Write-Host "Killing Node process: PID $($_.Id)" -ForegroundColor Red
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
    Write-Host "`nAll Node.js processes killed!" -ForegroundColor Green
} else {
    Write-Host "No Node.js processes found." -ForegroundColor Green
}

