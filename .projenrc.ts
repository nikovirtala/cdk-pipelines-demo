import { awscdk } from "projen";

const project = new awscdk.AwsCdkTypeScriptApp({
  authorEmail: "niko.virtala@hey.com",
  authorName: "Niko Virtala",
  authorUrl: "https://cloudgardener.dev",
  cdkVersion: "2.158.0",
  codeCov: false,
  defaultReleaseBranch: "main",
  deps: ["aws-cdk-lib", "constructs"],
  devDeps: ["prettier", "@types/aws-lambda", "esbuild@0"],
  dependabot: false,
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ["auto-approve", "auto-merge"],
    },
  },
  autoApproveOptions: {
    secret: "GITHUB_TOKEN",
    allowedUsernames: ["nikovirtala"],
  },
  jest: false,
  license: "MIT",
  minNodeVersion: "v20.17.0",
  name: "cdk-pipelines-demo",
  prettier: true,
  projenrcTs: true,
  pullRequestTemplate: false,
  repository: "https://github.com/nikovirtala/cdk-pipelines-demo.git",
  typescriptVersion: "5.5.4",
});

project.synth();
