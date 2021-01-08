import * as apigw from '@aws-cdk/aws-apigatewayv2';
import * as integration from '@aws-cdk/aws-apigatewayv2-integrations';
import * as lambda from '@aws-cdk/aws-lambda';
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
    const handlerFunction = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: new lambda.InlineCode(`exports.handler = (event, context, callback) =>
      callback(null, {
        statusCode: '200',
        body: JSON.stringify(event),
        headers: {
          'Content-Type': 'application/json',
        },
      });`),
      handler: 'index.handler',
    });

    // An API Gateway to make the Lambda web-accessible
    const gw = new apigw.HttpApi(this, 'Gateway', {
      defaultIntegration: new integration.LambdaProxyIntegration({
        handler: handlerFunction,
      }),
    });

    this.urlOutput = new CfnOutput(this, 'Url', {
      value: gw.url ?? 'Something went wrong',
    });
  }
}
