# Project Structure

## Directory Layout

```
.
├── src/                    # CDK infrastructure code
├── lambda/                 # Lambda function code
├── .projen/                # Projen-generated metadata
├── .kiro/                  # Kiro configuration and steering
└── cdk.out/                # CDK synthesis output (generated)
```

## Source Code Organization

### `src/` - CDK Infrastructure

- `main.ts` - CDK app entry point, instantiates the pipeline stack
- `cdk-pipelines-demo-pipeline-stack.ts` - Defines the CI/CD pipeline infrastructure
- `cdk-pipelines-demo-stage.ts` - Deployable stage containing the application stack
- `cdk-pipelines-demo-stack.ts` - Application infrastructure (Lambda, API Gateway)

### `lambda/` - Lambda Functions

- `main.ts` - Lambda handler code
- Bundled automatically by CDK using esbuild via NodejsFunction construct

## Architecture Pattern

**Three-tier CDK structure:**

1. **App** (`main.ts`) - Creates the CDK app and pipeline stack
2. **Pipeline Stack** - Defines the CI/CD pipeline that deploys stages
3. **Stage** - Contains one or more application stacks for deployment
4. **Application Stack** - Defines the actual application resources

## Naming Conventions

- Stack names: PascalCase with descriptive suffixes (e.g., `CdkpipelinesDemoPipelineStack`)
- Construct IDs: kebab-case for resources (e.g., `pipeline-demo-function`)
- File names: kebab-case matching the main export (e.g., `cdk-pipelines-demo-stack.ts`)

## Generated Files

These files are managed by Projen and should not be edited directly:
- `package.json`
- `tsconfig*.json`
- `.eslintrc.json`
- `.prettierrc.json`
- `.gitignore`
- `.npmignore`
- Files in `.projen/` directory

To modify these, edit `.projenrc.ts` and run `npx projen`.
