#!/bin/bash

echo "🚀 Installing Custom Log Monitor..."

sudo apt update
sudo apt install -y python3 python3-pip git curl

# Setup backend
cd backend
pip3 install --user -r requirements.txt
nohup uvicorn main:app --host 0.0.0.0 --port 8000 &
cd ..

# Setup frontend
cd frontend
if ! command -v npm &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
fi

npm install
npm run build

echo "✅ Done! Visit http://localhost:8000/logs for raw logs and frontend at http://localhost:3000"
