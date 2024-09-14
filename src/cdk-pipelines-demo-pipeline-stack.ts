import { pipelines, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkpipelinesDemoStage } from "./cdk-pipelines-demo-stage";

/**
 * The stack that defines the application pipeline
 */
export class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      crossAccountKeys: true,
      synth: new pipelines.ShellStep("Synth", {
        input: pipelines.CodePipelineSource.gitHub(
          "nikovirtala/cdk-pipelines-demo",
          "main",
          {
            authentication: SecretValue.secretsManager("github-access-token"),
          }
        ),
        commands: ["yarn install", "npx projen build", "npx projen synth"],
      }),
    });

    pipeline.addStage(
      new CdkpipelinesDemoStage(this, "staging", {
        env: { account: "546195103066", region: "eu-west-1" },
      })
    );
  }
}
