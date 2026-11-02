import { aws_codebuild, pipelines, SecretValue, Stack, type StackProps } from "aws-cdk-lib";
import type { Construct } from "constructs";
import { CdkpipelinesDemoStage } from "./cdk-pipelines-demo-stage.ts";

/**
 * The stack that defines the application pipeline
 */
export class CdkpipelinesDemoPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
            crossAccountKeys: true,
            /* pnpm 11 needs Node.js 22 or later; use the project's Node.js 24 */
            synthCodeBuildDefaults: {
                buildEnvironment: { buildImage: aws_codebuild.LinuxBuildImage.STANDARD_7_0 },
                partialBuildSpec: aws_codebuild.BuildSpec.fromObject({
                    phases: { install: { "runtime-versions": { nodejs: "24" } } },
                }),
            },
            synth: new pipelines.ShellStep("Synth", {
                input: pipelines.CodePipelineSource.gitHub("nikovirtala/cdk-pipelines-demo", "main", {
                    authentication: SecretValue.secretsManager("github-access-token"),
                }),
                commands: ["npm install -g pnpm@11.20.0", "pnpm install --frozen-lockfile", "pnpm exec projen synth"],
            }),
        });

        pipeline.addStage(
            new CdkpipelinesDemoStage(this, "staging", {
                env: { account: "546195103066", region: "eu-west-1" },
            }),
        );
    }
}
