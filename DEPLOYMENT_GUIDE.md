# 🚀 Complete Deployment Guide

This guide covers the complete deployment process for the Notes Manager application.

## 📋 Prerequisites

### Required Tools
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **AWS CLI** (configured with credentials)
- **AWS CDK** (for infrastructure)
- **Git** (for version control)

### AWS Setup
```bash
# Install AWS CLI
# macOS: brew install awscli
# Windows: Download from AWS website
# Linux: sudo apt-get install awscli

# Configure AWS credentials
aws configure
# Enter your AWS Access Key ID, Secret Access Key, and region

# Install AWS CDK
npm install -g aws-cdk

# Verify installations
aws --version
cdk --version
```

## 🏗️ Infrastructure Deployment

### 1. Deploy Frontend Infrastructure

```bash
# Navigate to infrastructure directory
cd infrastructure

# Install dependencies
npm install

# Bootstrap CDK (first time only)
cdk bootstrap

# Deploy frontend infrastructure
cdk deploy NotesManagerFrontend
```

### 2. Get Infrastructure Outputs

After deployment, note these outputs:
- **S3 Bucket Name**: `notes-manager-frontend-677020945452-ap-south-1`
- **CloudFront Distribution ID**: `E1CJLXTY4W3HUT`
- **CloudFront URL**: `https://d2ozkl6n5yflvt.cloudfront.net`

## 🔄 Complete Deployment Workflow

### Step 1: Deploy Backend to Render

#### 1.1 Prepare Backend
```bash
cd backend

# Build the application
npm run build

# Test production build locally
npm run start:prod
```

#### 1.2 Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure service:
   ```
   Name: notes-manager-backend
   Environment: Node
   Region: Oregon
   Branch: main
   Root Directory: notes_manager/backend
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   ```
5. Set environment variables:
   ```
   NODE_ENV=production
   PORT=10000
   CORS_ORIGIN=https://d2ozkl6n5yflvt.cloudfront.net
   LOG_LEVEL=info
   HEALTH_CHECK_PATH=/api/health
   ```

### Step 2: Deploy Frontend to AWS

#### 2.1 Deploy Infrastructure (First Time)
```bash
cd infrastructure
cdk deploy NotesManagerFrontend
```

#### 2.2 Build and Deploy Frontend
```bash
cd frontend

# Build for production
npm run build

# Deploy to S3
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E1CJLXTY4W3HUT --paths "/*"
```

#### 2.3 Update Frontend Environment
```bash
# Update .env.production with your backend URL
echo "VITE_API_BASE_URL=https://notes-manager-smw4.onrender.com" > .env.production
echo "VITE_NODE_ENV=production" >> .env.production
echo "VITE_ENABLE_LOGGING=false" >> .env.production

# Rebuild and redeploy
npm run build
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete
aws cloudfront create-invalidation --distribution-id E1CJLXTY4W3HUT --paths "/*"
```

## 🔄 Automated Deployment Scripts

### Quick Deploy Script
```bash
# Make script executable
chmod +x scripts/deploy-frontend.sh

# Run deployment
./scripts/deploy-frontend.sh
```

### Manual Deployment Commands
```bash
# Build and deploy frontend
cd frontend
npm run build
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete
aws cloudfront create-invalidation --distribution-id E1CJLXTY4W3HUT --paths "/*"
```

## 🧪 Testing Deployment

### Test Backend
```bash
# Health check
curl https://notes-manager-smw4.onrender.com/api/health

# Test API
curl https://notes-manager-smw4.onrender.com/api/notes
```

### Test Frontend
1. Visit: https://d2ozkl6n5yflvt.cloudfront.net
2. Check browser console for errors
3. Test creating, reading, updating, and deleting notes
4. Verify API calls are going to your backend

## 🔧 Troubleshooting

### Common Issues

#### AWS CLI Issues
```bash
# Check credentials
aws sts get-caller-identity

# Reconfigure if needed
aws configure
```

#### CDK Issues
```bash
# Bootstrap CDK
cdk bootstrap

# Check CDK version
cdk --version

# List stacks
cdk list
```

#### S3 Sync Issues
```bash
# Check bucket exists
aws s3 ls s3://notes-manager-frontend-677020945452-ap-south-1

# Force sync
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete --force
```

#### CloudFront Issues
```bash
# Check distribution
aws cloudfront get-distribution --id E1CJLXTY4W3HUT

# Create invalidation
aws cloudfront create-invalidation --distribution-id E1CJLXTY4W3HUT --paths "/*"
```

### Useful Commands

```bash
# Check AWS identity
aws sts get-caller-identity

# List S3 buckets
aws s3 ls

# Check CloudFront distributions
aws cloudfront list-distributions

# View CDK stacks
cdk list

# Check application logs (Render)
# Go to Render dashboard → Logs tab
```

## 📊 Production URLs

- **Frontend**: https://d2ozkl6n5yflvt.cloudfront.net
- **Backend**: https://notes-manager-smw4.onrender.com
- **Backend Health**: https://notes-manager-smw4.onrender.com/api/health

## 🔄 Update Workflow

### For Backend Updates
```bash
# Make changes to backend code
cd backend
npm run build
git add .
git commit -m "Update backend"
git push origin main
# Render will auto-deploy
```

### For Frontend Updates
```bash
# Make changes to frontend code
cd frontend
npm run build
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete
aws cloudfront create-invalidation --distribution-id E1CJLXTY4W3HUT --paths "/*"
```

### For Infrastructure Updates
```bash
# Make changes to CDK code
cd infrastructure
cdk deploy NotesManagerFrontend
```

## 🧹 Cleanup

### Remove All Resources
```bash
# Destroy CDK infrastructure
cd infrastructure
cdk destroy NotesManagerFrontend

# Delete Render service
# Go to Render dashboard and delete the service
```

## 📚 Additional Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [Render Documentation](https://render.com/docs)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)

---

**🎉 Your Notes Manager application is now fully deployed and ready to use!**
