# Simple Commands to Kill Ports

## Quick Commands

### Kill Specific Ports (PowerShell)

**Kill ports 5000 and 3000:**
```powershell
.\kill-ports.ps1 5000 3000
```

**Kill any ports:**
```powershell
.\kill-ports.ps1 8080 3000 5000
```

### Kill All Node.js Processes

```powershell
.\kill-all-node.ps1
```

Or one-liner:
```powershell
taskkill /F /IM node.exe
```

### One-Line Commands

**Kill port 5000:**
```powershell
netstat -ano | findstr ":5000.*LISTENING" | ForEach-Object { $pid = ($_ -split '\s+')[-1]; if ($pid -match '^\d+$') { Stop-Process -Id $pid -Force } }
```

**Kill port 3000:**
```powershell
netstat -ano | findstr ":3000.*LISTENING" | ForEach-Object { $pid = ($_ -split '\s+')[-1]; if ($pid -match '^\d+$') { Stop-Process -Id $pid -Force } }
```

**Kill both ports 5000 and 3000:**
```powershell
5000,3000 | ForEach-Object { $port = $_; netstat -ano | findstr ":$port.*LISTENING" | ForEach-Object { $pid = ($_ -split '\s+')[-1]; if ($pid -match '^\d+$') { Stop-Process -Id $pid -Force } } }
```

**Kill ALL Node processes:**
```powershell
taskkill /F /IM node.exe
```

## Check Port Status

**Check if port is in use:**
```powershell
netstat -ano | findstr ":5000.*LISTENING"
```

**Check multiple ports:**
```powershell
5000,3000 | ForEach-Object { Write-Host "Port $_:"; netstat -ano | findstr ":$_.*LISTENING" }
```

## Most Simple Command

**The simplest way to kill all Node processes (which usually use ports 5000 and 3000):**
```powershell
taskkill /F /IM node.exe
```

This kills ALL Node.js processes, which will free up ports 5000 and 3000 if they were being used by Node.

