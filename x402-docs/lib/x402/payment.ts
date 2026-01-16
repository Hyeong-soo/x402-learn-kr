import { x402Config, getNetworkConfig, NetworkName } from "./config";

// Payment requirement structure for 402 response
export interface PaymentRequirement {
  scheme: "exact";
  network: string;
  maxAmountRequired: string;
  resource: string;
  description: string;
  mimeType: string;
  payTo: string;
  maxTimeoutSeconds: number;
  asset: string;
  extra?: {
    name: string;
    version: string;
  };
}

export interface PaymentRequiredResponse {
  x402Version: number;
  accepts: PaymentRequirement[];
}

/**
 * Create a 402 Payment Required response body
 */
export function createPaymentRequiredBody(
  path: string,
  priceInUsdcUnits: string
): PaymentRequiredResponse {
  const network = getNetworkConfig(x402Config.network as NetworkName);

  return {
    x402Version: x402Config.version,
    accepts: [
      {
        scheme: "exact",
        network: network.chainId,
        maxAmountRequired: priceInUsdcUnits,
        resource: path,
        description: `Access to ${path}`,
        mimeType: "text/html",
        payTo: x402Config.wallet,
        maxTimeoutSeconds: 60,
        asset: `${network.chainId}/erc20:${network.assetAddress}`,
        extra: {
          name: "x402-for-opensource",
          version: "1.0.0",
        },
      },
    ],
  };
}

/**
 * Create the X-PAYMENT-REQUIRED header value (base64 encoded)
 */
export function createPaymentRequiredHeader(
  path: string,
  priceInUsdcUnits: string
): string {
  const body = createPaymentRequiredBody(path, priceInUsdcUnits);
  return Buffer.from(JSON.stringify(body)).toString("base64");
}

/**
 * Get price for a given path from config
 */
export function getPriceForPath(path: string): string | null {
  for (const [pattern, price] of Object.entries(x402Config.pricing)) {
    if (matchPath(pattern, path)) {
      return price;
    }
  }
  return null;
}

/**
 * Simple glob pattern matching
 */
function matchPath(pattern: string, path: string): boolean {
  // Convert glob pattern to regex
  const regexPattern = pattern
    .replace(/\*\*/g, ".*")
    .replace(/\*/g, "[^/]*")
    .replace(/\//g, "\\/");

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * Verify payment signature with facilitator
 */
export async function verifyPayment(
  paymentHeader: string,
  path: string,
  priceInUsdcUnits: string
): Promise<{ isValid: boolean; error?: string }> {
  try {
    const paymentPayload = JSON.parse(
      Buffer.from(paymentHeader, "base64").toString("utf-8")
    );

    const network = getNetworkConfig(x402Config.network as NetworkName);

    const response = await fetch(`${x402Config.facilitatorUrl}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentPayload,
        paymentRequirements: {
          scheme: "exact",
          network: network.chainId,
          maxAmountRequired: priceInUsdcUnits,
          resource: path,
          payTo: x402Config.wallet,
          asset: `${network.chainId}/erc20:${network.assetAddress}`,
        },
      }),
    });

    if (!response.ok) {
      return { isValid: false, error: "Facilitator verification failed" };
    }

    const result = await response.json();
    return { isValid: result.isValid === true };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { isValid: false, error: "Verification error" };
  }
}

/**
 * Settle payment with facilitator
 */
export async function settlePayment(
  paymentHeader: string,
  path: string,
  priceInUsdcUnits: string
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    const paymentPayload = JSON.parse(
      Buffer.from(paymentHeader, "base64").toString("utf-8")
    );

    const network = getNetworkConfig(x402Config.network as NetworkName);

    const response = await fetch(`${x402Config.facilitatorUrl}/settle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentPayload,
        paymentRequirements: {
          scheme: "exact",
          network: network.chainId,
          maxAmountRequired: priceInUsdcUnits,
          resource: path,
          payTo: x402Config.wallet,
          asset: `${network.chainId}/erc20:${network.assetAddress}`,
        },
      }),
    });

    if (!response.ok) {
      return { success: false, error: "Settlement failed" };
    }

    const result = await response.json();
    return { success: true, txHash: result.txHash };
  } catch (error) {
    console.error("Payment settlement error:", error);
    return { success: false, error: "Settlement error" };
  }
}
