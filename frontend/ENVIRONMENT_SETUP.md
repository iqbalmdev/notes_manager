# 🌍 Frontend Environment Variables Setup

This guide explains how to configure environment variables for the Notes Manager frontend application.

## 📁 Environment Files

### `.env` (Default)
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001

# App Configuration
VITE_APP_NAME=Notes Manager
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development

# Features
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=false
```

### `.env.local` (Local Development)
```bash
# Local Development API Configuration
VITE_API_BASE_URL=http://localhost:3001

# App Configuration
VITE_APP_NAME=Notes Manager (Local)
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development

# Features
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=false
```

### `.env.production` (Production)
```bash
# Production API Configuration
VITE_API_BASE_URL=https://your-backend-api-url.com

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

## 🚀 Deployment Scenarios

### 1. Local Development
```bash
# Uses .env.local or .env
npm run dev
```

### 2. Production Build
```bash
# Uses .env.production
npm run build
```

### 3. Preview Production Build
```bash
# Uses .env.production
npm run preview
```

## 🔧 Environment Variables Reference

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3001` | `https://api.notesmanager.com` |
| `VITE_APP_NAME` | Application name | `Notes Manager` | `My Notes App` |
| `VITE_APP_VERSION` | Application version | `1.0.0` | `2.1.0` |
| `VITE_NODE_ENV` | Environment mode | `development` | `production` |
| `VITE_ENABLE_LOGGING` | Enable console logging | `true` | `false` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` | `true` |
| `VITE_AWS_REGION` | AWS region | `us-east-1` | `ap-south-1` |
| `VITE_CLOUDFRONT_URL` | CloudFront URL | `` | `https://d2ozkl6n5yflvt.cloudfront.net` |

## 📝 Usage in Code

```typescript
import config from './config/env';

// Access environment variables
console.log('API URL:', config.apiBaseUrl);
console.log('App Name:', config.appName);
console.log('Is Development:', config.isDevelopment);
```

## 🚀 Deployment Commands

### For AWS S3 + CloudFront Deployment:
```bash
# Set production environment variables
export VITE_API_BASE_URL=https://your-backend-api-url.com
export VITE_NODE_ENV=production
export VITE_ENABLE_LOGGING=false

# Build for production
npm run build

# Deploy to S3
aws s3 sync dist s3://your-bucket-name --delete
```

### For Vercel Deployment:
```bash
# Set environment variables in Vercel dashboard
# Then deploy
vercel --prod
```

### For Netlify Deployment:
```bash
# Set environment variables in Netlify dashboard
# Then deploy
netlify deploy --prod
```

## 🔍 Debugging

To check which environment variables are loaded:

```typescript
// In your React component
import config from './config/env';

console.log('Current config:', config);
```

## ⚠️ Important Notes

1. **Vite Prefix**: All environment variables must start with `VITE_`
2. **Build Time**: Environment variables are embedded at build time
3. **Security**: Don't put sensitive data in frontend environment variables
4. **Case Sensitivity**: Environment variable names are case-sensitive
5. **File Priority**: `.env.local` > `.env.production` > `.env`

## 🧪 Testing Environment Variables

```bash
# Test local development
npm run dev

# Test production build
npm run build && npm run preview
```

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [AWS S3 Deployment](https://docs.aws.amazon.com/s3/)
- [CloudFront Configuration](https://docs.aws.amazon.com/cloudfront/)
