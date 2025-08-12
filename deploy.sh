#!/bin/bash

echo "🚀 Starting FoodCupons deployment..."

# 1. Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# 2. Check if the database exists
echo "🔍 Checking database..."
if [ ! -f "backend/database.sqlite" ]; then
    echo "⚠️ Database not found, creating..."
    cd backend
    npm run init-db
    cd ..
fi

# 3. Prepare for Vercel deployment
echo "🎯 Preparing for Vercel deployment..."

# 4. Deploy
echo "🚀 Deploying..."
npx vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Access: https://foodcupons.vercel.app"