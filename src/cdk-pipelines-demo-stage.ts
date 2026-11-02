import { type CfnOutput, Stage, type StageProps } from "aws-cdk-lib/core";
import type { Construct } from "constructs";
import { CdkpipelinesDemoStack } from "./cdk-pipelines-demo-stack.ts";

/**
 * Deployable unit of web service app
 */
export class CdkpipelinesDemoStage extends Stage {
    public readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new CdkpipelinesDemoStack(this, "pipeline-demo-stack");

        // Expose CdkpipelinesDemoStack's output one level higher
        this.urlOutput = service.urlOutput;
    }
}
