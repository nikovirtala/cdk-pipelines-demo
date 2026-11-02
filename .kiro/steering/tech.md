# Technology Stack

## Build System

**Projen** - Project configuration and build management tool that generates all build files from `.projenrc.ts`

- All build configuration is defined in `.projenrc.ts`
- Generated files (package.json, tsconfig.json, etc.) should not be edited directly
- The project type is `AwsCdkTypeScriptAppProject` from `@nikovirtala/projen-constructs`
- To modify configuration: edit `.projenrc.ts` and run `pnpm exec projen`

## Core Technologies

- **AWS CDK v2** (2.158.0) - Infrastructure as Code framework
- **TypeScript** - Primary language, ES modules, run with `tsx`
- **Node.js** - Runtime environment, version pinned in `mise.toml`
- **pnpm** - Package manager

## Key Libraries

- `aws-cdk-lib` - AWS CDK constructs library
- `constructs` - CDK constructs base library
- `aws-lambda` - Lambda function types
- `esbuild` - Lambda bundling

## Code Quality Tools

- **Biome** - Linting and formatting
- **Vitest** - Tests (`test/`)
- **TypeScript** - Static type checking

## Common Commands

```bash
# Build the project
pnpm exec projen build

# Synthesize CloudFormation templates
pnpm exec projen synth

# Deploy to AWS
pnpm exec projen deploy

# Show diff against deployed stack
pnpm exec projen diff

# Destroy deployed resources
pnpm exec projen destroy

# Run linting and formatting
pnpm exec projen biome

# Compile TypeScript
pnpm exec projen compile

# Bundle Lambda functions
pnpm exec projen bundle

# Upgrade dependencies
pnpm exec projen upgrade

# Watch mode for development
pnpm exec projen watch
```

## CDK Configuration

- Entry point: `src/main.ts`
- Output directory: `cdk.out`
- CDK app command: `npx tsx src/main.ts`
