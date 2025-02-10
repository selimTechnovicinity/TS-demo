import paypal from "@paypal/checkout-server-sdk";

const getPaypalClient = () => {
  const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID as string,
    process.env.PAYPAL_SECRET as string
  );
  return new paypal.core.PayPalHttpClient(environment);
};

export default getPaypalClient;
