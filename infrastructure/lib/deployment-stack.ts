import * as cdk from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface DeploymentStackProps extends cdk.StackProps {
  bucket: s3.IBucket;
  distributionId: string;
}

export class DeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DeploymentStackProps) {
    super(scope, id, props);

    // Deploy the built React app to S3
    new s3deploy.BucketDeployment(this, 'NotesManagerFrontendDeployment', {
      sources: [
        s3deploy.Source.asset('../frontend/dist'),
      ],
      destinationBucket: props.bucket,
      distribution: cdk.aws_cloudfront.Distribution.fromDistributionId(
        this,
        'Distribution',
        props.distributionId
      ),
      distributionPaths: ['/*'],
      prune: true,
    });
  }
}
