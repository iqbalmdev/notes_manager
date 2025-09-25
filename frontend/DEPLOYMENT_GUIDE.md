# 🚀 Frontend Deployment Guide

This guide will help you deploy the Notes Manager frontend to AWS S3 + CloudFront with the correct backend URL.

## 🔗 Backend URL Configuration

Your backend is deployed at: **https://notes-manager-smw4.onrender.com**

## 📋 Environment Variables for Production

### **Production Environment (.env.production):**
```bash
# Production API Configuration
VITE_API_BASE_URL=https://notes-manager-smw4.onrender.com

# App Configuration
VITE_APP_NAME=Notes Manager
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=production

# Features
VITE_ENABLE_LOGGING=false
VITE_ENABLE_ANALYTICS=true

# AWS Configuration
VITE_AWS_REGION=ap-south-1
VITE_CLOUDFRONT_URL=https://d2ozkl6n5yflvt.cloudfront.net
```

## 🚀 Deployment Steps

### **1. Build for Production:**
```bash
cd frontend
npm run build
```

### **2. Deploy to S3:**
```bash
# Deploy to your S3 bucket
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete
```

### **3. Update CloudFront:**
The CloudFront distribution will automatically serve the updated content.

## 🧪 Testing Your Deployment

### **Test Backend Connection:**
```bash
# Test backend health
curl https://notes-manager-smw4.onrender.com/api/health

# Test backend API
curl https://notes-manager-smw4.onrender.com/api/notes
```

### **Test Frontend:**
Visit your CloudFront URL: **https://d2ozkl6n5yflvt.cloudfront.net**

## 🔧 Environment Configuration

### **Development (.env.local):**
```bash
VITE_API_BASE_URL=http://localhost:3001
VITE_NODE_ENV=development
VITE_ENABLE_LOGGING=true
```

### **Production (.env.production):**
```bash
VITE_API_BASE_URL=https://notes-manager-smw4.onrender.com
VITE_NODE_ENV=production
VITE_ENABLE_LOGGING=false
```

## 📊 API Endpoints

Your frontend will connect to these backend endpoints:

- **Health Check:** `https://notes-manager-smw4.onrender.com/api/health`
- **Get Notes:** `https://notes-manager-smw4.onrender.com/api/notes`
- **Create Note:** `POST https://notes-manager-smw4.onrender.com/api/notes`
- **Update Note:** `PUT https://notes-manager-smw4.onrender.com/api/notes/:id`
- **Delete Note:** `DELETE https://notes-manager-smw4.onrender.com/api/notes/:id`

## 🔄 Complete Deployment Workflow

### **1. Update Frontend:**
```bash
cd frontend
npm run build
```

### **2. Deploy to S3:**
```bash
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete
```

### **3. Verify Deployment:**
- Check CloudFront URL: https://d2ozkl6n5yflvt.cloudfront.net
- Test API connection in browser console
- Verify notes can be created, read, updated, and deleted

## 🐛 Troubleshooting

### **CORS Issues:**
If you encounter CORS errors, ensure your backend has the correct CORS_ORIGIN:
```bash
CORS_ORIGIN=https://d2ozkl6n5yflvt.cloudfront.net
```

### **API Connection Issues:**
1. Check if backend is running: https://notes-manager-smw4.onrender.com/api/health
2. Verify environment variables are set correctly
3. Check browser console for errors

### **Build Issues:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## ✅ Success Indicators

After successful deployment:
- ✅ Frontend loads at CloudFront URL
- ✅ Backend API responds at Render URL
- ✅ Notes can be created, read, updated, deleted
- ✅ No CORS errors in browser console
- ✅ Environment variables are correctly loaded

---

**Your Notes Manager application is now ready with the correct backend URL!**
