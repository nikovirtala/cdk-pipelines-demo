# Technology Stack

## Build System

**Projen** - Project configuration and build management tool that generates all build files from `.projenrc.ts`

- All build configuration is defined in `.projenrc.ts`
- Generated files (package.json, tsconfig.json, etc.) should not be edited directly
- To modify configuration: edit `.projenrc.ts` and run `npx projen`

## Core Technologies

- **AWS CDK v2** (2.158.0) - Infrastructure as Code framework
- **TypeScript** (5.5.4) - Primary language
- **Node.js** (>= v20.17.0) - Runtime environment
- **Yarn** - Package manager

## Key Libraries

- `aws-cdk-lib` - AWS CDK constructs library
- `constructs` - CDK constructs base library
- `aws-lambda` - Lambda function types
- `esbuild` - Lambda bundling

## Code Quality Tools

- **ESLint** - Linting with TypeScript support
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## Common Commands

```bash
# Build the project
npx projen build

# Synthesize CloudFormation templates
npx projen synth

# Deploy to AWS
npx projen deploy

# Show diff against deployed stack
npx projen diff

# Destroy deployed resources
npx projen destroy

# Run linting
npx projen eslint

# Compile TypeScript
npx projen compile

# Bundle Lambda functions
npx projen bundle

# Upgrade dependencies
npx projen upgrade

# Watch mode for development
npx projen watch
```

## CDK Configuration

- Entry point: `src/main.ts`
- Output directory: `cdk.out`
- CDK app command: `npx ts-node -P tsconfig.json --prefer-ts-exts src/main.ts`
