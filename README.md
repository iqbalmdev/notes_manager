# 📝 Notes Manager - Full Stack Application

A modern, full-stack notes management application built with React, Node.js, and deployed on AWS with CloudFront and Render.

## 🌟 Features

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: In-memory storage (easily extensible to PostgreSQL/MongoDB)
- **Deployment**: AWS S3 + CloudFront (Frontend) + Render (Backend)
- **Infrastructure**: AWS CDK for infrastructure as code

## 🏗️ Project Structure

```
notes_manager/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Application pages
│   │   ├── api/            # API client
│   │   └── config/         # Environment configuration
│   └── dist/               # Production build output
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── services/       # Business logic
│   │   └── types/          # TypeScript types
│   └── dist/               # Compiled JavaScript
└── infrastructure/          # AWS CDK infrastructure
    ├── lib/                # CDK stack definitions
    └── scripts/            # Deployment scripts
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **AWS CLI** (for deployment)
- **AWS CDK** (for infrastructure)

### Installation

```bash
# Clone the repository
git clone https://github.com/iqbalmdev/notes_manager.git
cd notes_manager

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install infrastructure dependencies
cd ../infrastructure
npm install
```

## 🛠️ Local Development

### Backend Development

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# The backend will be available at http://localhost:3001
```

**Backend Endpoints:**
- `GET /api/health` - Health check
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a note
- `GET /api/notes/:id` - Get note by ID
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# The frontend will be available at http://localhost:5173
```

### Environment Variables

#### Backend (.env)
```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Logging Configuration
LOG_LEVEL=info
HEALTH_CHECK_PATH=/api/health
```

#### Frontend (.env.local)
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001

# App Configuration
VITE_APP_NAME=Notes Manager
VITE_NODE_ENV=development

# Features
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=false
```

## 🚀 Deployment

### Backend Deployment (Render)

#### 1. Prepare Backend for Production

```bash
cd backend

# Build the application
npm run build

# Test production build locally
npm run start:prod
```

#### 2. Deploy to Render

1. **Connect Repository:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service:**
   ```
   Name: notes-manager-backend
   Environment: Node
   Region: Oregon (or your preference)
   Branch: main
   Root Directory: notes_manager/backend
   ```

3. **Build & Deploy Settings:**
   ```
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   ```

4. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   CORS_ORIGIN=https://d2ozkl6n5yflvt.cloudfront.net
   LOG_LEVEL=info
   HEALTH_CHECK_PATH=/api/health
   ```

### Frontend Deployment (AWS S3 + CloudFront)

#### 1. Deploy Infrastructure

```bash
cd infrastructure

# Install AWS CDK globally (if not already installed)
npm install -g aws-cdk

# Bootstrap CDK (first time only)
cdk bootstrap

# Deploy frontend infrastructure
cdk deploy NotesManagerFrontend
```

#### 2. Build and Deploy Frontend

```bash
cd frontend

# Build for production
npm run build

# Deploy to S3
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E1CJLXTY4W3HUT --paths "/*"
```

#### 3. Update Frontend Environment

```bash
# Update .env.production with your backend URL
VITE_API_BASE_URL=https://notes-manager-smw4.onrender.com
VITE_NODE_ENV=production
VITE_ENABLE_LOGGING=false
```

## 🔄 Complete Deployment Workflow

### 1. Deploy Backend to Render

```bash
# Build backend
cd backend
npm run build

# Push to repository (Render will auto-deploy)
git add .
git commit -m "Deploy backend to Render"
git push origin main
```

### 2. Deploy Frontend to AWS

```bash
# Deploy infrastructure
cd infrastructure
cdk deploy NotesManagerFrontend

# Build and deploy frontend
cd ../frontend
npm run build
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete
aws cloudfront create-invalidation --distribution-id E1CJLXTY4W3HUT --paths "/*"
```

### 3. Update Environment Variables

```bash
# Update frontend environment
cd frontend
echo "VITE_API_BASE_URL=https://your-backend-url.onrender.com" > .env.production

# Rebuild and redeploy
npm run build
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete
```

## 📊 Production URLs

- **Frontend**: https://d2ozkl6n5yflvt.cloudfront.net
- **Backend**: https://notes-manager-smw4.onrender.com
- **Backend Health**: https://notes-manager-smw4.onrender.com/api/health

## 🛠️ Development Commands

### Backend Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start:prod      # Start production server

# Testing
npm test                # Run tests
npm run test:watch      # Run tests in watch mode
```

### Frontend Commands

```bash
# Development
npm run dev             # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Linting
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
```

### Infrastructure Commands

```bash
# CDK Commands
cdk deploy              # Deploy all stacks
cdk deploy NotesManagerFrontend  # Deploy frontend only
cdk destroy             # Destroy all resources
cdk synth               # Synthesize CloudFormation templates
cdk diff                # Show differences
```

## 🔧 Troubleshooting

### Common Issues

#### Backend Issues
```bash
# Port already in use
lsof -ti:3001 | xargs kill -9

# Build errors
rm -rf node_modules dist
npm install
npm run build
```

#### Frontend Issues
```bash
# Build fails
rm -rf node_modules dist
npm install
npm run build

# Environment variables not working
# Ensure variables start with VITE_
# Check .env files are in correct location
```

#### Deployment Issues
```bash
# AWS credentials
aws configure
aws sts get-caller-identity

# CDK bootstrap
cdk bootstrap

# S3 sync issues
aws s3 ls s3://your-bucket-name
aws s3 sync dist s3://your-bucket-name --delete --force
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

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide)
- [Express.js Documentation](https://expressjs.com/)
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [Render Documentation](https://render.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Your Notes Manager application is now ready for development and deployment!**