import type {
  Env,
  ResolvedPricing,
  PaymentRequired,
  PaymentPayload,
  VerifyRequest,
  VerifyResponse,
  X402_HEADERS,
} from "./types";

/**
 * Create a 402 Payment Required response
 */
export function createPaymentRequiredResponse(
  pricing: ResolvedPricing,
  network: string
): Response {
  const paymentRequired: PaymentRequired = {
    x402Version: "1",
    accepts: [
      {
        scheme: "evm/exact",
        network,
        maxAmountRequired: pricing.priceInWei,
        asset: "USDC",
        payTo: pricing.wallet,
        description: `Access to ${pricing.path}`,
        maxTimeoutSeconds: 3600, // 1 hour
      },
    ],
  };

  const encodedPayment = btoa(JSON.stringify(paymentRequired));

  return new Response(
    JSON.stringify({
      error: "Payment Required",
      message: `This content requires payment of $${pricing.price} USDC`,
      path: pricing.path,
    }),
    {
      status: 402,
      headers: {
        "Content-Type": "application/json",
        "X-PAYMENT-REQUIRED": encodedPayment,
        // Also include in standard header format
        "WWW-Authenticate": `X402 ${encodedPayment}`,
      },
    }
  );
}

/**
 * Parse payment signature from request header
 */
export function parsePaymentSignature(
  request: Request
): PaymentPayload | null {
  const paymentHeader = request.headers.get("X-PAYMENT");

  if (!paymentHeader) {
    return null;
  }

  try {
    const decoded = atob(paymentHeader);
    return JSON.parse(decoded) as PaymentPayload;
  } catch (error) {
    console.error("Failed to parse payment signature:", error);
    return null;
  }
}

/**
 * Verify payment with the facilitator service
 */
export async function verifyPayment(
  env: Env,
  paymentPayload: PaymentPayload,
  pricing: ResolvedPricing
): Promise<{ valid: boolean; reason?: string }> {
  const verifyRequest: VerifyRequest = {
    paymentPayload,
    paymentRequired: {
      scheme: "evm/exact",
      network: env.DEFAULT_NETWORK,
      maxAmountRequired: pricing.priceInWei,
      asset: "USDC",
      payTo: pricing.wallet,
    },
  };

  try {
    const response = await fetch(`${env.FACILITATOR_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verifyRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        valid: false,
        reason: `Facilitator error: ${response.status} - ${errorText}`,
      };
    }

    const result = (await response.json()) as VerifyResponse;
    return {
      valid: result.valid,
      reason: result.invalidReason,
    };
  } catch (error) {
    return {
      valid: false,
      reason: `Verification failed: ${error}`,
    };
  }
}

/**
 * Settle payment on-chain via facilitator
 */
export async function settlePayment(
  env: Env,
  paymentPayload: PaymentPayload,
  pricing: ResolvedPricing
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  const settleRequest: VerifyRequest = {
    paymentPayload,
    paymentRequired: {
      scheme: "evm/exact",
      network: env.DEFAULT_NETWORK,
      maxAmountRequired: pricing.priceInWei,
      asset: "USDC",
      payTo: pricing.wallet,
    },
  };

  try {
    const response = await fetch(`${env.FACILITATOR_URL}/settle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settleRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Settlement failed: ${response.status} - ${errorText}`,
      };
    }

    const result = await response.json() as { transactionHash?: string };
    return {
      success: true,
      txHash: result.transactionHash,
    };
  } catch (error) {
    return {
      success: false,
      error: `Settlement error: ${error}`,
    };
  }
}

/**
 * Create success response with payment receipt
 */
export function addPaymentReceiptHeader(
  response: Response,
  txHash: string
): Response {
  const newHeaders = new Headers(response.headers);
  newHeaders.set("X-PAYMENT-RESPONSE", txHash);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
