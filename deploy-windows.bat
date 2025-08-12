@echo off
echo 🚀 Starting FoodCupons deployment on Windows...

REM 1. Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install --production
cd ..

REM 2. Check if the database exists
echo 🔍 Checking database...
if not exist "backend\database.sqlite" (
    echo ⚠️ Database not found, creating...
    cd backend
    call npm run init-db
    cd ..
)

REM 3. Prepare for Vercel deployment
echo 🎯 Preparing for Vercel deployment...

REM 4. Deploy
echo 🚀 Deploying...
call npx vercel --prod

echo ✅ Deployment complete!
echo 🔗 Access: https://foodcupons.vercel.app
pause