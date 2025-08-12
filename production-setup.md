# Complete Deployment Guide - FoodCupons

## 📋 Project Summary
- **Frontend**: Static HTML/CSS/JavaScript
- **Backend**: Node.js/Express with PostgreSQL
- **Database**: PostgreSQL configured via `DATABASE_URL`
- **Deployment**: Vercel (serverless)

## 🚀 Deployment Options

### Option 1: Deploy on Vercel (RECOMMENDED)

#### Prerequisites:
1. Account on [Vercel](https://vercel.com)
2. Node.js installed
3. Git installed

#### Quick Steps:
```bash
# 1. Clone or prepare the project
cd restaurant-coupons

# 2. Make the script executable
chmod +x deploy.sh

# 3. Run the deployment
./deploy.sh
```

#### Manual via Vercel CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Log in
vercel login

# Deploy
vercel --prod
```

### Option 2: Manual Deployment via Web Interface

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
```

### API Endpoints:
- **Base**: `https://your-domain.vercel.app/api`
- **Auth**: `/api/auth/*`
- **Restaurants**: `/api/restaurants/*`
- **Coupons**: `/api/coupons/*`
- **Payment**: `/api/payment/*`

## 📊 Monitoring

### Logs:
- Vercel Dashboard → Functions → Logs
- Command: `vercel logs --follow`

### Performance:
- Vercel Analytics (optional)
- Google Analytics (already included)

## 🔄 Future Updates

### To update the site:
```bash
# After pushing to Git
git add .
git commit -m "Update"
git push origin main

# Deployment is automatic via Git
```

### To update manually:
```bash
# Re-run the deployment
./deploy.sh
```

## 🐛 Troubleshooting

### Common error: "Cannot find module"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Error with Database on Vercel:
- Make sure the `DATABASE_URL` environment variable is correctly configured on Vercel with your PostgreSQL database connection string.

## 📞 Support

If you encounter problems:
1. Check the logs in the Vercel Dashboard
2. Test locally: `npm run dev` in the backend
3. Check the environment variables

## ✅ Final Checklist

- [ ] Backend is working locally
- [ ] Database is populated
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] API endpoints tested
- [ ] Frontend functionalities tested
- [ ] SSL activated (automatic on Vercel)
- [ ] Custom domain (optional)

## 🎯 Single Command for Deployment

Execute everything at once:
```bash
# Linux/Mac
chmod +x deploy.sh && ./deploy.sh

# Windows (Git Bash)
bash deploy.sh

# Or manual:
vercel --prod
```

## 📱 Final URL
After deployment, your site will be available at:
`https://foodcupons.vercel.app`