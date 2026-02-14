@echo off
cd /d "%~dp0backend"
call npm install
npm run dev
pause
