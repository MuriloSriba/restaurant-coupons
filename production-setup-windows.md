# Complete Deployment Guide - FoodCupons (Windows)

## 📋 Project Summary
- **Frontend**: Static HTML/CSS/JavaScript
- **Backend**: Node.js/Express with PostgreSQL
- **Database**: PostgreSQL configured via `DATABASE_URL`
- **Deployment**: Vercel (serverless)

## 🚀 Deploy on Windows

### Option 1: Automatic Deployment (RECOMMENDED)
```cmd
# Execute the batch file
deploy-windows.bat
```

### Option 2: Manual via Vercel CLI
```cmd
# Install Vercel CLI
npm install -g vercel

# Log in
vercel login

# Deploy
vercel --prod
```

### Option 3: Web Interface
1. **Go to**: [vercel.com](https://vercel.com)
2. **Import**: Your Git repository or upload the files
3. **Configure**:
   - Framework: Node.js
   - Root Directory: `.`
   - Build Command: `npm run build` (if any)
   - Output Directory: `.`
4. **Deploy**: Click "Deploy"

## 🔧 Production Settings

### Environment Variables (Vercel Dashboard):
```
PORT=3001
NODE_ENV=production
JWT_SECRET=your_super_secret_key
DATABASE_URL=your_postgresql_connection_string
```

## 🎯 Single Command for Deployment
```cmd
deploy-windows.bat
```

## 📱 Final URL
After deployment, your site will be available at:
`https://foodcupons.vercel.app`