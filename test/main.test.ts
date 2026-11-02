import { App } from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { beforeAll, describe, test } from "vitest";
import { CdkpipelinesDemoPipelineStack } from "../src/cdk-pipelines-demo-pipeline-stack.ts";
import { CdkpipelinesDemoStack } from "../src/cdk-pipelines-demo-stack.ts";

/* Skip bundling: the tests check the resources, not the asset hash of the handler bundle. */
const context = { "aws:cdk:bundling-stacks": [] };

describe("CdkpipelinesDemoStack", () => {
    let template: Template;

    beforeAll(() => {
        template = Template.fromStack(new CdkpipelinesDemoStack(new App({ context }), "test"));
    });

    test("creates the Node.js 20 handler function", () => {
        template.hasResourceProperties("AWS::Lambda::Function", {
            Runtime: "nodejs20.x",
            MemorySize: 1024,
            Handler: "index.handler",
        });
    });

    test("protects the HTTP API with the Auth0 JWT authorizer", () => {
        template.hasResourceProperties("AWS::ApiGatewayV2::Authorizer", {
            AuthorizerType: "JWT",
            Name: "Auth0",
            IdentitySource: ["$request.header.Authorization"],
            JwtConfiguration: {
                Audience: ["https://github.com/nikovirtala/cdk-pipelines-demo"],
                Issuer: "https://nikovirtala.eu.auth0.com/",
            },
        });
        template.hasResourceProperties("AWS::ApiGatewayV2::Route", {
            RouteKey: "$default",
            AuthorizationType: "JWT",
        });
    });
});

describe("CdkpipelinesDemoPipelineStack", () => {
    let template: Template;

    beforeAll(() => {
        const stack = new CdkpipelinesDemoPipelineStack(new App({ context }), "pipeline", {
            env: { account: "111111111111", region: "eu-west-1" },
        });
        template = Template.fromStack(stack);
    });

    test("synthesizes the app with pnpm", () => {
        template.hasResourceProperties("AWS::CodeBuild::Project", {
            Source: {
                BuildSpec: Match.serializedJson(
                    Match.objectLike({
                        phases: {
                            build: {
                                commands: [
                                    "n 24.22.2",
                                    "npm install -g pnpm@11.20.0",
                                    "pnpm install --frozen-lockfile",
                                    "pnpm exec projen synth",
                                ],
                            },
                        },
                    }),
                ),
            },
        });
    });

    test("deploys the staging stage", () => {
        template.hasResourceProperties("AWS::CodePipeline::Pipeline", {
            Stages: Match.arrayWith([Match.objectLike({ Name: "staging" })]),
        });
    });
});
