/**
 * x402 Protocol Utilities
 */

import { x402Config, usdToWei } from "./x402-config";

// x402 Payment Required response structure
export interface PaymentRequirement {
  scheme: "evm/exact";
  network: string;
  maxAmountRequired: string;
  asset: string;
  payTo: string;
  description?: string;
}

export interface PaymentRequired {
  x402Version: "1";
  accepts: PaymentRequirement[];
}

/**
 * Create a 402 Payment Required response
 */
export function createPaymentRequiredResponse(
  path: string,
  price: number
): Response {
  const paymentRequired: PaymentRequired = {
    x402Version: "1",
    accepts: [
      {
        scheme: "evm/exact",
        network: x402Config.network,
        maxAmountRequired: usdToWei(price),
        asset: "USDC",
        payTo: x402Config.wallet,
        description: `AI access to ${path} - $${price.toFixed(2)} USDC`,
      },
    ],
  };

  const encoded = Buffer.from(JSON.stringify(paymentRequired)).toString("base64");

  return new Response(
    JSON.stringify({
      error: "Payment Required",
      message: `AI agents must pay $${price.toFixed(2)} USDC to access this content`,
      path,
      price,
      note: "Humans can access for free - this payment is only for AI agents",
    }),
    {
      status: 402,
      headers: {
        "Content-Type": "application/json",
        "X-PAYMENT-REQUIRED": encoded,
        "WWW-Authenticate": `X402 ${encoded}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "X-PAYMENT-REQUIRED",
      },
    }
  );
}

/**
 * Parse payment header from request
 */
export function parsePaymentHeader(header: string | null): any | null {
  if (!header) return null;

  try {
    const decoded = Buffer.from(header, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Verify payment with facilitator (mock for demo)
 */
export async function verifyPayment(
  paymentPayload: any,
  expectedPrice: number
): Promise<{ valid: boolean; reason?: string }> {
  // In production, this would call the facilitator
  // For demo, we'll accept any well-formed payment

  if (!paymentPayload) {
    return { valid: false, reason: "No payment payload" };
  }

  if (paymentPayload.x402Version !== "1") {
    return { valid: false, reason: "Invalid x402 version" };
  }

  // TODO: Actually verify with facilitator
  // const response = await fetch(`${x402Config.facilitatorUrl}/verify`, {
  //   method: "POST",
  //   body: JSON.stringify({ paymentPayload, ... }),
  // });

  // For demo purposes, accept the payment
  return { valid: true };
}
