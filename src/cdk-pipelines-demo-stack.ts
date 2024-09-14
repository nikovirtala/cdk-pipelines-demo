import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpJwtAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

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
    const handlerFunction = new NodejsFunction(this, "pipeline-demo-function", {
      runtime: Runtime.NODEJS_20_X,
      memorySize: 1024,
      handler: "handler",
      entry: "lambda/main.ts",
    });

    // API Gateway HTTP API to make the Lambda web-accessible
    const api = new HttpApi(this, "pipeline-demo-api", {
      defaultAuthorizer: new HttpJwtAuthorizer(
        "auth0",
        "https://nikovirtala.eu.auth0.com/",
        {
          authorizerName: "Auth0",
          identitySource: ["$request.header.Authorization"],
          jwtAudience: ["https://github.com/nikovirtala/cdk-pipelines-demo"],
        }
      ),
      defaultIntegration: new HttpLambdaIntegration("api", handlerFunction),
    });

    this.urlOutput = new CfnOutput(this, "Url", {
      value: api.url ?? "Something went wrong",
    });
  }
}
