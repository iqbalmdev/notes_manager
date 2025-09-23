# 🏗️ Notes Manager Infrastructure

AWS CDK infrastructure for the Notes Manager application.

## 📋 Prerequisites

- AWS CLI configured with appropriate permissions
- AWS CDK installed: `npm install -g aws-cdk`
- Node.js and npm
- Docker (for ECS container builds)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Bootstrap CDK (First time only)
```bash
cdk bootstrap
```

### 3. Deploy Infrastructure
```bash
npm run deploy
```

### 4. Deploy Frontend
```bash
# Build the frontend first
cd ../frontend
npm run build

# Upload to S3 (replace BUCKET_NAME with actual bucket name from outputs)
aws s3 sync dist s3://BUCKET_NAME --delete
```

## 🏗️ Architecture

### Backend Stack (`NotesManagerBackend`)
- **ECS Fargate Service** with Application Load Balancer
- **VPC** with public and private subnets
- **Auto Scaling** based on CPU utilization
- **CloudWatch Logs** for monitoring
- **Health checks** on `/health` endpoint

### Frontend Stack (`NotesManagerFrontend`)
- **S3 Bucket** for static website hosting
- **CloudFront Distribution** with Origin Access Control
- **Custom error pages** for SPA routing
- **Compression** and caching optimization

## 📜 Available Commands

```bash
# Build TypeScript
npm run build

# Watch for changes
npm run watch

# Deploy all stacks
npm run deploy

# Destroy all stacks
npm run destroy

# Synthesize CloudFormation templates
npm run synth

# Show differences
npm run diff

# Run deployment script
./scripts/deploy.sh
```

## 🔧 Configuration

### Environment Variables
- `CDK_DEFAULT_ACCOUNT`: AWS Account ID
- `CDK_DEFAULT_REGION`: AWS Region (default: us-east-1)

### Customization
You can modify the stacks in the `lib/` directory:
- `backend-stack.ts`: ECS Fargate configuration
- `frontend-stack.ts`: S3 and CloudFront configuration

## 📊 Outputs

After deployment, you'll get:
- **Backend API URL**: Load balancer endpoint for the backend
- **Frontend URL**: CloudFront distribution URL
- **S3 Bucket Name**: For manual frontend uploads

## 🧹 Cleanup

To destroy all resources:
```bash
npm run destroy
```

## 🔍 Monitoring

- **CloudWatch Logs**: `/ecs/notes-manager`
- **ECS Service**: Monitor task health and scaling
- **CloudFront**: Monitor distribution metrics

## 🚨 Troubleshooting

### Common Issues

1. **CDK Bootstrap Required**
   ```bash
   cdk bootstrap
   ```

2. **Permissions Issues**
   - Ensure your AWS credentials have sufficient permissions
   - Required: ECS, S3, CloudFront, IAM, VPC permissions

3. **Frontend Not Loading**
   - Check S3 bucket policy
   - Verify CloudFront distribution status
   - Ensure frontend is built and uploaded

4. **Backend Not Responding**
   - Check ECS service status
   - Verify health check endpoint
   - Check CloudWatch logs

## 📝 Notes

- The backend uses an in-memory store (resets on restart)
- Frontend is served from S3 with CloudFront CDN
- All resources are in the same VPC for security
- Auto-scaling is configured for the backend service
