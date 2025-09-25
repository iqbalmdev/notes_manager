#!/bin/bash

# Deploy Notes Manager Frontend to AWS S3 + CloudFront
# This script builds the frontend and deploys it to S3

set -e

echo "🚀 Starting Notes Manager Frontend deployment..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

# Navigate to frontend directory
cd "$(dirname "$0")/../frontend"

# Build the frontend
echo "📦 Building frontend..."
npm run build

# Deploy to S3
echo "☁️ Deploying to S3..."
aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id E1CJLXTY4W3HUT --paths "/*"

echo "✅ Frontend deployment completed!"
echo ""
echo "🌐 Frontend URL: https://d2ozkl6n5yflvt.cloudfront.net"
echo "🔗 Backend URL: https://notes-manager-smw4.onrender.com"
echo ""
echo "📝 To update the frontend:"
echo "cd frontend && npm run build && aws s3 sync dist s3://notes-manager-frontend-677020945452-ap-south-1 --delete"
