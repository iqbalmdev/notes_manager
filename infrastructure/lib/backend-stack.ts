import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class NotesManagerBackendStack extends cdk.Stack {
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC for the ECS cluster
    const vpc = new ec2.Vpc(this, 'NotesManagerVPC', {
      maxAzs: 2,
      natGateways: 1,
    });

    // ECS Cluster
    const cluster = new ecs.Cluster(this, 'NotesManagerCluster', {
      vpc,
      clusterName: 'notes-manager-cluster',
    });

    // CloudWatch Log Group
    const logGroup = new logs.LogGroup(this, 'NotesManagerLogGroup', {
      logGroupName: '/ecs/notes-manager',
      retention: logs.RetentionDays.ONE_WEEK,
    });

    // ECS Fargate Service with Application Load Balancer
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'NotesManagerService', {
      cluster,
      serviceName: 'notes-manager-backend',
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('node:18-alpine'),
        containerPort: 3001,
        environment: {
          NODE_ENV: 'production',
          PORT: '3001',
        },
        logDriver: ecs.LogDrivers.awsLogs({
          streamPrefix: 'notes-manager',
          logGroup,
        }),
        // Override the default command to run our Node.js app
        command: [
          'sh', '-c',
          'npm install -g express cors zod && ' +
          'mkdir -p /app && cd /app && ' +
          'echo "const express = require(\'express\'); const cors = require(\'cors\'); const app = express(); app.use(cors()); app.use(express.json()); const notes = new Map(); app.post(\'/notes\', (req, res) => { const { title, content } = req.body; if (!title || !content) return res.status(400).json({ error: \'Title and content required\' }); const id = Date.now().toString(); const note = { id, title, content, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }; notes.set(id, note); res.status(201).json(note); }); app.get(\'/notes\', (req, res) => { res.json(Array.from(notes.values())); }); app.get(\'/notes/:id\', (req, res) => { const note = notes.get(req.params.id); if (!note) return res.status(404).json({ error: \'Note not found\' }); res.json(note); }); app.delete(\'/notes/:id\', (req, res) => { if (!notes.has(req.params.id)) return res.status(404).json({ error: \'Note not found\' }); notes.delete(req.params.id); res.status(204).send(); }); app.get(\'/health\', (req, res) => { res.json({ status: \'OK\', timestamp: new Date().toISOString() }); }); app.listen(3001, () => console.log(\'Server running on port 3001\'));" > server.js && node server.js'
        ],
      },
      memoryLimitMiB: 512,
      cpu: 256,
      desiredCount: 1,
      publicLoadBalancer: true,
    });

    // Health check configuration
    fargateService.targetGroup.configureHealthCheck({
      path: '/health',
      healthyHttpCodes: '200',
      interval: cdk.Duration.seconds(30),
      timeout: cdk.Duration.seconds(5),
      healthyThresholdCount: 2,
      unhealthyThresholdCount: 3,
    });

    // Auto Scaling
    const scalableTarget = fargateService.service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 10,
    });

    scalableTarget.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 70,
      scaleInCooldown: cdk.Duration.seconds(300),
      scaleOutCooldown: cdk.Duration.seconds(300),
    });

    // Store the API URL for output
    this.apiUrl = `http://${fargateService.loadBalancer.loadBalancerDnsName}`;

    // Outputs
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
      description: 'Load Balancer DNS Name',
    });

    new cdk.CfnOutput(this, 'ClusterName', {
      value: cluster.clusterName,
      description: 'ECS Cluster Name',
    });

    new cdk.CfnOutput(this, 'ServiceName', {
      value: fargateService.service.serviceName,
      description: 'ECS Service Name',
    });
  }
}
