import { App } from '@aws-cdk/core';
import { CdkpipelinesDemoPipelineStack } from './cdk-pipelines-demo-pipeline-stack';

const app = new App();


new CdkpipelinesDemoPipelineStack(app, 'CdkpipelinesDemoPipelineStack', {
  env: { account: '191420785973', region: 'eu-west-1' },
});

app.synth();
