import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const config = new pulumi.Config();
const configValue = config.require("s3-bucket-name")

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket(configValue);

// Export the name of the bucket
export const bucketName = bucket.id;
