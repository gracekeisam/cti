@echo off
echo =========================================
echo    Starting Canteen System...
echo =========================================
echo.

:: Start backend server
echo [1/2] Starting Backend Server...
cd backend
if not exist "node_modules\" (
    echo Installing backend dependencies...
    npm install
)
start "CTI Backend" cmd /k "node server.js"
cd ..

:: Wait for backend to start
timeout /t 2 /nobreak > nul

:: Start frontend dev server
echo [2/2] Starting Frontend Server...
cd frontend
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    npm install
)
echo Starting frontend development server...
npm run dev -- --host

pause
