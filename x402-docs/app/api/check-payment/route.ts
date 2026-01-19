/**
 * Payment Verification API Route
 *
 * This runs in Node.js runtime (not Edge) to avoid fetch issues
 */

import { NextResponse } from "next/server";

// Force Node.js runtime
export const runtime = "nodejs";

const X402_CONFIG = {
  wallet: process.env.X402_WALLET_ADDRESS || "",
  network: process.env.X402_NETWORK || "base-sepolia",
  facilitatorUrl: process.env.X402_FACILITATOR_URL || "https://x402.org/facilitator",
};

const NETWORKS = {
  "base-sepolia": {
    v1Network: "base-sepolia",  // SDK uses this format
    chainId: "eip155:84532",     // CAIP-2 format (for x402 v2)
    assetAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
  "base": {
    v1Network: "base",
    chainId: "eip155:8453",
    assetAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
} as const;

export async function POST(request: Request) {
  try {
    const { paymentPayload, price, resource } = await request.json();

    // Construct full URL for resource (required by x402 SDK)
    const origin = request.headers.get("origin") || request.headers.get("host") || "localhost:3010";
    const protocol = origin.includes("localhost") ? "http" : "https";
    const resourceUrl = `${protocol}://${origin.replace(/^https?:\/\//, "")}${resource}`;

    const networkKey = X402_CONFIG.network as keyof typeof NETWORKS;
    const network = NETWORKS[networkKey] || NETWORKS["base-sepolia"];

    // v2 uses CAIP-2 network format
    const payloadNetwork = paymentPayload?.accepted?.network || network.chainId;

    // Build payment requirements in v2 format (matching what SDK expects)
    const paymentRequirements = {
      scheme: "exact",
      network: payloadNetwork,  // Keep CAIP-2 format (eip155:84532)
      maxAmountRequired: price,
      amount: price,  // v2 SDK uses 'amount' field
      resource: resourceUrl,
      description: `Access to ${resource}`,
      mimeType: "text/html",
      payTo: X402_CONFIG.wallet,
      maxTimeoutSeconds: 60,
      asset: network.assetAddress,
      // EIP-712 domain parameters - must match USDC contract domain
      extra: {
        name: "USDC",
        version: "2",
      },
    };

    // Keep v2 payload as-is (don't transform to v1)
    const v2PaymentPayload = paymentPayload;

    console.log("[x402] Payment payload (v2):", JSON.stringify(v2PaymentPayload, null, 2));
    console.log("[x402] Payment requirements (v2):", JSON.stringify(paymentRequirements, null, 2));

    console.log("[x402] Verifying payment...");

    // Verify payment with facilitator (v2 format)
    const verifyResponse = await fetch(`${X402_CONFIG.facilitatorUrl}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x402Version: 2,
        paymentPayload: v2PaymentPayload,
        paymentRequirements,
      }),
    });

    if (!verifyResponse.ok) {
      const errorText = await verifyResponse.text();
      console.error("[x402] Verify failed:", verifyResponse.status, errorText);
      return NextResponse.json({
        success: false,
        error: "Verification failed",
        details: errorText,
      }, { status: 402 });
    }

    const verifyResult = await verifyResponse.json();
    console.log("[x402] Verify result:", verifyResult);

    if (!verifyResult.isValid) {
      return NextResponse.json({
        success: false,
        error: "Payment invalid",
        reason: verifyResult.invalidReason,
      }, { status: 402 });
    }

    // Settle payment
    console.log("[x402] Settling payment...");
    const settleResponse = await fetch(`${X402_CONFIG.facilitatorUrl}/settle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x402Version: 2,
        paymentPayload: v2PaymentPayload,
        paymentRequirements,
      }),
    });

    const settleResult = await settleResponse.json();
    console.log("[x402] Settle result:", settleResult);

    if (settleResult.success === false) {
      return NextResponse.json({
        success: false,
        error: "Settlement failed",
        reason: settleResult.errorReason,
      }, { status: 402 });
    }

    return NextResponse.json({
      success: true,
      txHash: settleResult.txHash || settleResult.transaction,
    });
  } catch (error) {
    console.error("[x402] Payment check error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
