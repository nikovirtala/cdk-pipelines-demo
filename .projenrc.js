const { awscdk } = require('projen');

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '1.188.0',
  name: 'cdk-pipelines-demo',
  cdkDependencies: [
    '@aws-cdk/aws-apigatewayv2',
    '@aws-cdk/aws-apigatewayv2-authorizers',
    '@aws-cdk/aws-apigatewayv2-integrations',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/aws-codepipeline-actions',
    '@aws-cdk/pipelines',
    '@aws-cdk/aws-lambda-nodejs',
  ],
  context: { '@aws-cdk/core:newStyleStackSynthesis': true },
  authorEmail: 'niko.virtala@hey.com',
  authorName: 'Niko Virtala',
  authorUrl: 'https://cloudgardener.dev',
  devDeps: ['prettier', '@types/aws-lambda', 'esbuild@0'],
  license: 'MIT',
  repository: 'https://github.com/nikovirtala/cdk-pipelines-demo.git',
  codeCov: false,
  defaultReleaseBranch: 'main',
  jest: false,
  pullRequestTemplate: false,
  mergify: true,
});

project.synth();
