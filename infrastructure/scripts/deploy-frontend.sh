#!/bin/bash

# Deploy Notes Manager Frontend Only
# This script builds the frontend and deploys it to S3 + CloudFront

set -e

echo "🚀 Starting Notes Manager Frontend deployment..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if CDK is installed
if ! command -v cdk &> /dev/null; then
    echo "❌ AWS CDK not installed. Please install it with 'npm install -g aws-cdk'"
    exit 1
fi

# Build the frontend
echo "📦 Building frontend..."
cd ../frontend
npm run build
cd ../infrastructure

# Bootstrap CDK if needed
echo "🔧 Bootstrapping CDK (if needed)..."
cdk bootstrap

# Deploy only the frontend infrastructure
echo "🏗️ Deploying frontend infrastructure..."
cdk deploy NotesManagerFrontend --require-approval never

# Get the outputs
echo "📋 Getting deployment outputs..."
FRONTEND_URL=$(aws cloudformation describe-stacks --stack-name NotesManagerFrontend --query 'Stacks[0].Outputs[?OutputKey==`FrontendUrl`].OutputValue' --output text)
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name NotesManagerFrontend --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)

echo "✅ Frontend deployment completed!"
echo ""
echo "🌐 Frontend URL: $FRONTEND_URL"
echo "🪣 S3 Bucket: $BUCKET_NAME"
echo ""
echo "📝 To upload the frontend to S3:"
echo "aws s3 sync ../frontend/dist s3://$BUCKET_NAME --delete"
echo ""
echo "🔄 To update the frontend:"
echo "cd ../frontend && npm run build && aws s3 sync dist s3://$BUCKET_NAME --delete"
