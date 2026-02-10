@echo off
REM Matura Master - Complete System Startup Script
REM This script initializes and starts all services

echo.
echo ╔═════════════════════════════════════════════════════════════╗
echo ║     Matura Master - Complete System Initialization         ║
echo ║     Data-Driven AI + Firestore Integration                 ║
echo ╚═════════════════════════════════════════════════════════════╝
echo.

REM Check Python installation
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check Node.js installation
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Node.js not found (optional)
)

echo ✓ Prerequisites check passed
echo.

REM Step 1: Install Python dependencies
echo 📦 Installing Python dependencies...
cd python
python -m pip install -q -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
echo ✓ Python dependencies installed
cd ..
echo.

REM Step 2: Install Node.js dependencies (optional)
if exist "server\package.json" (
    echo 📦 Installing Node.js dependencies...
    cd server
    npm install --quiet 2>nul
    if %errorlevel% equ 0 (
        echo ✓ Node.js dependencies installed
    ) else (
        echo ⚠️  Node.js dependencies installation skipped
    )
    cd ..
    echo.
)

REM Display instructions
echo ╔═════════════════════════════════════════════════════════════╗
echo ║                 STARTUP INSTRUCTIONS                        ║
echo ╚═════════════════════════════════════════════════════════════╝
echo.

echo 🚀 START SERVICES (in separate terminal windows):
echo.
echo 1️⃣  START AI SERVER (Python)
echo    Command: cd python; python ai_training_server.py
echo    Port: http://localhost:5001
echo    Purpose: Trainable AI that learns from lesson data
echo.

echo 2️⃣  START BACKEND SERVER (Node.js)
echo    Command: cd server; npm start
echo    Port: http://localhost:5000
echo    Purpose: Firestore API + AI proxy
echo.

echo 3️⃣  START FRONTEND:
echo    Open: http://localhost:3000/courses-firestore.html
echo    Or: http://localhost:3000/baiganio-enhanced.html
echo.

echo ║════════════════════════════════════════════════════════════║
echo ║                   QUICK TEST                               ║
echo ║════════════════════════════════════════════════════════════║
echo.
echo After starting AI Server, test with:
echo   curl -X POST http://localhost:5001/api/ai/init
echo.

echo 📚 FOR DETAILED INFORMATION:
echo   - Read: DATA_DRIVEN_AI_GUIDE.md
echo   - Read: FIRESTORE_AI_GUIDE.md
echo.

echo ✅ Setup complete! Follow the instructions above to start services.
echo.

pause
