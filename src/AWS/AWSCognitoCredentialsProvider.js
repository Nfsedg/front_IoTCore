import * as AWS from "aws-sdk";
import { auth } from "aws-iot-device-sdk-v2";

class AWSCognitoCredentialsProvider extends auth.CredentialsProvider {
  constructor(options, expire_interval_in_ms) {
    super();
    this.options = options;
    AWS.config.region = options.Region;
    this.source_provider = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: options.IdentityPoolId,
    });
    this.aws_credentials = {
      aws_region: options.Region,
      aws_access_id: this.source_provider.accessKeyId,
      aws_secret_key: this.source_provider.secretAccessKey,
      aws_sts_token: this.source_provider.sessionToken,
    };

    setInterval(async () => {
      await this.refreshCredentialAsync();
    }, expire_interval_in_ms ?? 3600 * 1000);
  }

  getCredentials() {
    return this.aws_credentials;
  }

  async refreshCredentialAsync() {
    return new Promise((resolve, reject) => {
      this.source_provider.get((err) => {
        if (err) {
          reject(new Error("Failed to get cognito credentials."));
        } else {
          this.aws_credentials.aws_access_id = this.source_provider.accessKeyId;
          this.aws_credentials.aws_secret_key =
            this.source_provider.secretAccessKey;
          this.aws_credentials.aws_sts_token =
            this.source_provider.sessionToken;
          this.aws_credentials.aws_region = this.options.Region;
          resolve(this);
        }
      });
    });
  }
}

export default AWSCognitoCredentialsProvider;
