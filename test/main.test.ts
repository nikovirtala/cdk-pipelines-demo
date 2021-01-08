import '@aws-cdk/assert/jest';
import { App } from '@aws-cdk/core';
import { CdkpipelinesDemoPipelineStack } from '../src/cdk-pipelines-demo-pipeline-stack';

test('Snapshot', () => {
  const app = new App();
  const stack = new CdkpipelinesDemoPipelineStack(app, 'test');

  expect(stack).toHaveResource('AWS::S3::Bucket');
  expect(app.synth().getStackArtifact(stack.artifactId).template).toMatchSnapshot();
});