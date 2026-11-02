import { App } from "aws-cdk-lib";
import { CdkpipelinesDemoPipelineStack } from "./cdk-pipelines-demo-pipeline-stack.ts";

const app = new App();

new CdkpipelinesDemoPipelineStack(app, "CdkpipelinesDemoPipelineStack", {
  env: { account: "191420785973", region: "eu-west-1" },
});

app.synth();
