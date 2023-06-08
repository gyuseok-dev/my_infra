import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyPortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket to be used as the origin for the CloudFront distribution
    // vuejs 실행을 위한 버킷 생성
    const bucket = new s3.Bucket(this, "PortfolioBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true,
      bucketName: "portfolio-bucket-2023-03-25",
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create a CloudFront distribution with the S3 bucket as the origin
    const distribution = new cloudfront.Distribution(this, "MyDistribution", {
      defaultBehavior: { origin: new origins.S3Origin(bucket) },
    });

    // Output the CloudFront domain name
    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.domainName,
    });
  }
}

