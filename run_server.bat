@echo off
echo =========================================
echo    Starting CTI Canteen Server...
echo =========================================
cd frontend

:: Check if node_modules exists, if not, prompt or install
if not exist "node_modules\" (
    echo Installing dependencies first...
    npm install
)

echo Starting development server...
npm run dev -- --host
pause
