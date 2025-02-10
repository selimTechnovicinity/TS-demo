import { SandboxEnvironment } from "@paypal/checkout-server-sdk/lib/core/paypal_environment";
import { PayPalHttpClient } from "@paypal/checkout-server-sdk/lib/core/paypal_http_client";
import {
  OrdersCaptureRequest,
  OrdersCreateRequest,
} from "@paypal/checkout-server-sdk/lib/orders/lib";
import dotenv from "dotenv";

dotenv.config();

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  throw new Error("Missing PayPal credentials in environment variables.");
}

const environment = new SandboxEnvironment(
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET
);
const client = new PayPalHttpClient(environment);

export const createOrder = async (cart: any) => {
  const request = new OrdersCreateRequest();
  request.prefer("return=minimal");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100",
        },
      },
    ],
  });

  try {
    const response = await client.execute(request);
    return {
      jsonResponse: response.result,
      httpStatusCode: response.statusCode,
    };
  } catch (error) {
    throw new Error((error as any).message);
  }
};

export const captureOrder = async (orderID: string) => {
  const request = new OrdersCaptureRequest(orderID);
  request.prefer("return=minimal");

  try {
    const response = await client.execute(request);
    return {
      jsonResponse: response.result,
      httpStatusCode: response.statusCode,
    };
  } catch (error) {
    throw new Error((error as any).message);
  }
};
