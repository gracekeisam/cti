@echo off
echo =========================================
echo    Starting Canteen System...
echo =========================================
echo.

:: Check for backend modules
if not exist "backend\node_modules\" (
    echo [1/2] Installing Backend Dependencies...
    cd backend && npm install && cd ..
)

:: Check for frontend modules
if not exist "frontend\node_modules\" (
    echo [2/2] Installing Frontend Dependencies...
    cd frontend && npm install && cd ..
)

echo.
echo [!] Launching Backend...
start "CTI_BACKEND" cmd /k "cd backend && node server.js"

echo [!] Launching Frontend...
start "CTI_FRONTEND" cmd /k "cd frontend && npm run dev -- --host"

echo.
echo =========================================
echo    SYSTEM ONLINE
echo    Frontend: http://localhost:5173
echo    Kitchen:  http://localhost:5173/kitchen
echo =========================================
echo.
echo You can now close this window.
timeout /t 5
exit
