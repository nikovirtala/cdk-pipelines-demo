import { AwsCdkTypeScriptAppProject } from "@nikovirtala/projen-constructs";

const project = new AwsCdkTypeScriptAppProject({
    authorEmail: "niko.virtala@hey.com",
    authorName: "Niko Virtala",
    authorUrl: "https://cloudgardener.dev",
    cdkVersion: "2.275.0",
    defaultReleaseBranch: "main",
    devDeps: ["@nikovirtala/projen-constructs", "@types/aws-lambda", "esbuild@0"],
    license: "MIT",
    name: "cdk-pipelines-demo",
    pullRequestTemplate: false,
    repository: "https://github.com/nikovirtala/cdk-pipelines-demo.git",
});

project.synth();
