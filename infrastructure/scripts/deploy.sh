#!/bin/bash

# Deploy Notes Manager Infrastructure
# This script builds the frontend, deploys the infrastructure, and uploads the frontend

set -e

echo "🚀 Starting Notes Manager deployment..."

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

# Deploy the infrastructure
echo "🏗️ Deploying infrastructure..."
cdk deploy --all --require-approval never

# Get the outputs
echo "📋 Getting deployment outputs..."
BACKEND_URL=$(aws cloudformation describe-stacks --stack-name NotesManagerBackend --query 'Stacks[0].Outputs[?OutputKey==`BackendApiUrl`].OutputValue' --output text)
FRONTEND_URL=$(aws cloudformation describe-stacks --stack-name NotesManagerFrontend --query 'Stacks[0].Outputs[?OutputKey==`FrontendUrl`].OutputValue' --output text)
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name NotesManagerFrontend --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)

echo "✅ Deployment completed!"
echo ""
echo "🌐 Frontend URL: $FRONTEND_URL"
echo "🔗 Backend API URL: $BACKEND_URL"
echo "🪣 S3 Bucket: $BUCKET_NAME"
echo ""
echo "📝 To upload the frontend to S3:"
echo "aws s3 sync ../frontend/dist s3://$BUCKET_NAME --delete"
echo ""
echo "🔄 To update the frontend:"
echo "cd ../frontend && npm run build && aws s3 sync dist s3://$BUCKET_NAME --delete"
