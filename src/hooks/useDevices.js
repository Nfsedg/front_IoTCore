import { useEffect, useState } from "react";
import { mqtt, iot } from "aws-iot-device-sdk-v2";
import AWSCognitoCredentialsProvider from "../AWS/AWSCognitoCredentialsProvider";

import {
  AWS_REGION,
  AWS_COGNITO_IDENTITY_POOL_ID,
  AWS_IOT_ENDPOINT,
} from "../AWS/config";

async function connect_websocket(provider) {
  return new Promise((resolve, reject) => {
    const config =
      iot.AwsIotMqttConnectionConfigBuilder.new_builder_for_websocket()
        .with_clean_session(true)
        .with_client_id("test-" + Math.floor(Math.random() * 100000000))
        .with_endpoint(AWS_IOT_ENDPOINT)
        .with_credential_provider(provider)
        .with_use_websockets()
        .with_keep_alive_seconds(30)
        .build();

    console.debug("Connecting websocket...");
    const client = new mqtt.MqttClient();

    const connection = client.new_connection(config);
    connection.on("connect", () => {
      resolve(connection);
    });
    connection.on("interrupt", (error) => {
      console.debug(`Connection interrupted: error=${error}`);
    });
    connection.on("resume", (return_code, session_present) => {
      console.debug(
        `Resumed: rc: ${return_code} existing session: ${session_present}`
      );
    });
    connection.on("disconnect", () => {
      console.debug("Disconnected");
    });
    connection.on("error", (error) => {
      reject(error);
    });
    connection.connect();
  });
}
async function subscribeDevice(setMessageDetector) {
  const provider = new AWSCognitoCredentialsProvider({
    IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
    Region: AWS_REGION,
  });
  await provider.refreshCredentialAsync();

  connect_websocket(provider)
    .then((connection) => {
      connection.subscribe(
        "esp32/pub",
        mqtt.QoS.AtLeastOnce,
        (topic, payload) => {
          const decoder = new TextDecoder("utf8");
          const message = decoder.decode(new Uint8Array(payload));
          const toJsonMessage = JSON.parse(message);
          setMessageDetector(toJsonMessage);
        }
      );
    })
    .catch((reason) => {
      console.debug(`Error while connecting: ${reason}`);
    });
}

export function useDevices() {
  const [messageDetector, setMessageDetector] = useState();

  useEffect(() => {
    subscribeDevice(setMessageDetector);
  }, []);

  return {
    messageDetector,
    setMessageDetector,
  };
}
