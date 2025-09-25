# 🌐 Frontend-Only Deployment Guide

This guide will help you deploy only the Notes Manager frontend to AWS S3 + CloudFront.

## 🔑 AWS Credentials Setup

### Option 1: AWS CLI Configuration (Recommended)
```bash
# Install AWS CLI if not already installed
# macOS: brew install awscli
# Windows: Download from AWS website
# Linux: sudo apt-get install awscli

# Configure AWS credentials
aws configure
```

**You'll need to provide:**
- **AWS Access Key ID**: Get from AWS Console → IAM → Users → Your User → Security Credentials
- **AWS Secret Access Key**: Generated when you create the access key
- **Default region**: `us-east-1` (recommended for CloudFront)
- **Default output format**: `json`

### Option 2: Environment Variables
```bash
export AWS_ACCESS_KEY_ID=your_access_key_here
export AWS_SECRET_ACCESS_KEY=your_secret_key_here
export AWS_DEFAULT_REGION=us-east-1
```

### Option 3: AWS Profiles
```bash
# Create a named profile
aws configure --profile notes-manager

# Use the profile
export AWS_PROFILE=notes-manager
```

## 📋 Required AWS Permissions

Your AWS user/role needs these permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "cloudfront:*",
                "iam:CreateRole",
                "iam:AttachRolePolicy",
                "iam:PassRole",
                "cloudformation:*",
                "ssm:GetParameter",
                "ssm:PutParameter"
            ],
            "Resource": "*"
        }
    ]
}
```

## 🚀 Deployment Steps

### 1. Prerequisites
```bash
# Install AWS CDK globally
npm install -g aws-cdk

# Verify installations
aws --version
cdk --version
```

### 2. Deploy Infrastructure
```bash
cd infrastructure

# Install dependencies
npm install

# Deploy frontend infrastructure
./scripts/deploy-frontend.sh
```

### 3. Manual Steps (Alternative)
```bash
# Build frontend
cd ../frontend
npm run build

# Deploy infrastructure
cd ../infrastructure
cdk bootstrap
cdk deploy NotesManagerFrontend

# Upload frontend to S3
aws s3 sync ../frontend/dist s3://BUCKET_NAME --delete
```

## 📊 What Gets Created

### AWS Resources:
- **S3 Bucket**: For hosting static files
- **CloudFront Distribution**: For global CDN
- **Origin Access Control**: For security
- **IAM Roles**: For CloudFront to access S3

### Estimated Costs:
- **S3**: ~$0.023/GB/month (very low for static sites)
- **CloudFront**: ~$0.085/GB for first 10TB
- **Total**: Usually under $1/month for small sites

## 🔧 Configuration Options

### Environment Variables:
```bash
# Set custom region
export CDK_DEFAULT_REGION=eu-west-1

# Set custom account
export CDK_DEFAULT_ACCOUNT=123456789012
```

### Custom Domain (Optional):
1. Add your domain to the CloudFront distribution
2. Configure SSL certificate in ACM
3. Update DNS records

## 🧹 Cleanup

To remove all resources:
```bash
cd infrastructure
cdk destroy NotesManagerFrontend
```

## 🐛 Troubleshooting

### Common Issues:

1. **"No credentials"**
   ```bash
   aws configure list
   aws sts get-caller-identity
   ```

2. **"CDK not bootstrapped"**
   ```bash
   cdk bootstrap
   ```

3. **"Permission denied"**
   - Check IAM permissions
   - Ensure user has required policies

4. **"Bucket already exists"**
   - S3 bucket names must be globally unique
   - CDK will handle this automatically

### Useful Commands:
```bash
# Check AWS identity
aws sts get-caller-identity

# List CDK stacks
cdk list

# View CloudFormation stack
aws cloudformation describe-stacks --stack-name NotesManagerFrontend

# Check S3 bucket
aws s3 ls s3://your-bucket-name

# Check CloudFront distribution
aws cloudfront list-distributions
```

## 📝 Next Steps

After deployment:
1. **Test the URL**: Visit the CloudFront URL
2. **Update DNS**: Point your domain to CloudFront
3. **Monitor**: Check CloudWatch for any issues
4. **Backend**: Deploy backend separately when ready

## 💡 Tips

- **Cost Optimization**: Use S3 Intelligent Tiering
- **Performance**: Enable CloudFront compression
- **Security**: Use Origin Access Control (already configured)
- **Monitoring**: Set up CloudWatch alarms for high costs
