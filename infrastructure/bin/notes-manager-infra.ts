#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { NotesManagerBackendStack } from '../lib/backend-stack';
import { NotesManagerFrontendStack } from '../lib/frontend-stack';

const app = new cdk.App();

// Environment configuration
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
};

// Backend stack (ECS Fargate) - COMMENTED OUT FOR NOW
// const backendStack = new NotesManagerBackendStack(app, 'NotesManagerBackend', {
//   env,
//   description: 'Notes Manager Backend API on ECS Fargate',
// });

// Frontend stack (S3 + CloudFront)
const frontendStack = new NotesManagerFrontendStack(app, 'NotesManagerFrontend', {
  env,
  description: 'Notes Manager Frontend on S3 + CloudFront',
});

// Add dependency: Frontend depends on Backend for API URL - COMMENTED OUT
// frontendStack.addDependency(backendStack);

// Outputs
// new cdk.CfnOutput(backendStack, 'BackendApiUrl', {
//   value: backendStack.apiUrl,
//   description: 'Backend API URL',
//   exportName: 'NotesManagerBackendApiUrl',
// });

new cdk.CfnOutput(frontendStack, 'FrontendUrl', {
  value: frontendStack.frontendUrl,
  description: 'Frontend URL',
  exportName: 'NotesManagerFrontendUrl',
});

new cdk.CfnOutput(frontendStack, 'S3BucketName', {
  value: frontendStack.bucketName,
  description: 'S3 Bucket Name for Frontend',
  exportName: 'NotesManagerS3BucketName',
});
