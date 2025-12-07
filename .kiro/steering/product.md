# Product Overview

AWS CDK Pipelines Demo - A continuous integration and delivery (CI/CD) demonstration project using AWS CDK Pipelines.

## Purpose

Demonstrates how to build self-mutating CI/CD pipelines using AWS CDK that automatically deploy infrastructure and application code to AWS.

## Architecture

- Lambda-powered web service with API Gateway HTTP API
- JWT authentication via Auth0
- Automated deployment pipeline using AWS CodePipeline
- Multi-stage deployment (staging environment)
- GitHub source integration

## Key Features

- Self-mutating pipeline that updates itself when infrastructure code changes
- Cross-account deployment support
- Automated synth and deployment steps
