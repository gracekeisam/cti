@echo off
echo =========================================
echo    Stopping Canteen System...
echo =========================================
echo.

:: Kill processes by window title
echo [!] Closing Backend...
taskkill /FI "WINDOWTITLE eq CTI_BACKEND*" /F /T >nul 2>&1

echo [!] Closing Frontend...
taskkill /FI "WINDOWTITLE eq CTI_FRONTEND*" /F /T >nul 2>&1

:: Also kill node if any orphaned processes remain
echo [!] Cleaning up Node processes...
taskkill /IM node.exe /F /T >nul 2>&1

echo.
echo =========================================
echo    SYSTEM OFFLINE
echo =========================================
echo.
pause
