import { HttpApi } from '@aws-cdk/aws-apigatewayv2';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';

/**
 * A stack for our simple Lambda-powered web service
 */
export class CdkpipelinesDemoStack extends Stack {
  /**
   * The URL of the API Gateway endpoint, for use in the integ tests
   */
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The Lambda function that contains the functionality
    const handlerFunction = new NodejsFunction(this, 'Lambda', {
      runtime: Runtime.NODEJS_14_X,
      memorySize: 1024,
      handler: 'handler',
      entry: 'lambda/main.ts',
    });

    // An API Gateway to make the Lambda web-accessible
    const gw = new HttpApi(this, 'Gateway', {
      defaultIntegration: new LambdaProxyIntegration({
        handler: handlerFunction,
      }),
    });

    this.urlOutput = new CfnOutput(this, 'Url', {
      value: gw.url ?? 'Something went wrong',
    });
  }
}
