#!/bin/bash

# Matura Master - Complete System Startup Script
# For Linux/Mac users

echo ""
echo "╔═════════════════════════════════════════════════════════════╗"
echo "║     Matura Master - Complete System Initialization          ║"
echo "║     Data-Driven AI + Firestore Integration                  ║"
echo "╚═════════════════════════════════════════════════════════════╝"
echo ""

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    echo "Please install Python 3.8+ from https://www.python.org/"
    exit 1
fi

echo "✓ Python $(python3 --version) installed"

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js not found (optional)"
else
    echo "✓ Node.js $(node --version) installed"
fi

echo ""

# Step 1: Install Python dependencies
echo "📦 Installing Python dependencies..."
cd python
pip install -q -r requirements.txt
if [ $? -eq 0 ]; then
    echo "✓ Python dependencies installed"
else
    echo "❌ Failed to install Python dependencies"
    exit 1
fi
cd ..
echo ""

# Step 2: Install Node.js dependencies
if [ -f "server/package.json" ]; then
    echo "📦 Installing Node.js dependencies..."
    cd server
    npm install --silent 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✓ Node.js dependencies installed"
    else
        echo "⚠️  Node.js dependencies installation skipped"
    fi
    cd ..
    echo ""
fi

# Display instructions
echo "╔═════════════════════════════════════════════════════════════╗"
echo "║                 STARTUP INSTRUCTIONS                        ║"
echo "╚═════════════════════════════════════════════════════════════╝"
echo ""

echo "🚀 START SERVICES (in separate terminal windows):"
echo ""
echo "1️⃣  START AI SERVER (Python)"
echo "    Command: cd python && python3 ai_training_server.py"
echo "    Port: http://localhost:5001"
echo "    Purpose: Trainable AI that learns from lesson data"
echo ""

echo "2️⃣  START BACKEND SERVER (Node.js)"
echo "    Command: cd server && npm start"
echo "    Port: http://localhost:5000"
echo "    Purpose: Firestore API + AI proxy"
echo ""

echo "3️⃣  START FRONTEND:"
echo "    Open: http://localhost:3000/courses-firestore.html"
echo "    Or: http://localhost:3000/baiganio-enhanced.html"
echo ""

echo "╔═════════════════════════════════════════════════════════════╗"
echo "║                   QUICK TEST                                ║"
echo "╚═════════════════════════════════════════════════════════════╝"
echo ""
echo "After starting AI Server, test with:"
echo "  curl -X POST http://localhost:5001/api/ai/init"
echo ""

echo "📚 FOR DETAILED INFORMATION:"
echo "   - Read: DATA_DRIVEN_AI_GUIDE.md"
echo "   - Read: FIRESTORE_AI_GUIDE.md"
echo ""

echo "✅ Setup complete! Follow the instructions above to start services."
echo ""
