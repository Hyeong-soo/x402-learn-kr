/**
 * x402 Middleware for Next.js
 *
 * - Humans (browsers with JS): FREE access
 * - AI Agents: Must pay via x402 protocol
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================
// Configuration (inline for Edge runtime)
// ============================================

const X402_CONFIG = {
  humanTokenCookie: "x402_human_token",
  humanTokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
  wallet: process.env.X402_WALLET_ADDRESS || "",
  network: process.env.X402_NETWORK || "base-sepolia",
  facilitatorUrl: process.env.X402_FACILITATOR_URL || "https://x402.org/facilitator",
};

const NETWORKS = {
  "base-sepolia": {
    // x402 v1 uses short network names, v2 uses CAIP-2
    v1Network: "base-sepolia",
    chainId: "eip155:84532",
    asset: "USDC",
    assetAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
  "base": {
    v1Network: "base",
    chainId: "eip155:8453",
    asset: "USDC",
    assetAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
} as const;

// Protected routes with pricing (in USDC units, 6 decimals)
// $0.01 = 10000, $0.05 = 50000
const PRICING: Record<string, string> = {
  "/demo/protected-content": "10000", // $0.01
  "/docs/advanced": "10000",          // $0.01
  "/docs/enterprise": "50000",        // $0.05
};

// ============================================
// Utility Functions
// ============================================

async function hmacSha256(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyHumanToken(token: string): Promise<boolean> {
  const SECRET_KEY = process.env.X402_SECRET_KEY || "x402-default-secret-change-me";

  try {
    const decoded = JSON.parse(atob(token));
    const { timestamp, signature } = decoded;

    // Check expiry (24 hours)
    if (Date.now() - timestamp > X402_CONFIG.humanTokenExpiry) {
      return false;
    }

    // Verify HMAC signature
    const expectedSignature = await hmacSha256(SECRET_KEY, `human:${timestamp}`);
    return signature === expectedSignature;
  } catch {
    return false;
  }
}

function getPriceForPath(pathname: string): string | null {
  for (const [route, price] of Object.entries(PRICING)) {
    if (pathname.startsWith(route)) {
      return price;
    }
  }
  return null;
}

function create402Response(pathname: string, price: string): NextResponse {
  const networkKey = X402_CONFIG.network as keyof typeof NETWORKS;
  const network = NETWORKS[networkKey] || NETWORKS["base-sepolia"];
  const priceInDollars = (parseInt(price) / 1000000).toFixed(2);

  const paymentRequired = {
    // Using v2 for consistent CAIP-2 network format (eip155:84532)
    x402Version: 2,
    accepts: [
      {
        scheme: "exact",
        // v2 uses CAIP-2 format
        network: network.chainId,
        // SDK uses 'amount' field
        amount: price,
        maxAmountRequired: price,
        resource: pathname,
        description: `Access to ${pathname}`,
        mimeType: "text/html",
        payTo: X402_CONFIG.wallet,
        maxTimeoutSeconds: 60,
        // Asset should be just the contract address for EVM
        asset: network.assetAddress,
        // EIP-712 domain parameters - must match USDC contract domain
        extra: {
          name: "USDC",
          version: "2",
        },
      },
    ],
  };

  const body = JSON.stringify({
    error: "Payment Required",
    message: `AI agents must pay $${priceInDollars} USDC to access this content`,
    price: parseFloat(priceInDollars),
    network: network.chainId,
    token: network.asset,
    paymentDetails: paymentRequired,
  });

  return new NextResponse(body, {
    status: 402,
    headers: {
      "Content-Type": "application/json",
      // x402 SDK expects PAYMENT-REQUIRED (not X-PAYMENT-REQUIRED)
      "PAYMENT-REQUIRED": btoa(JSON.stringify(paymentRequired)),
      "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, PAYMENT-RESPONSE, X-PAYMENT-REQUIRED, X-PAYMENT-RESPONSE",
    },
  });
}

// ============================================
// Middleware
// ============================================

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if this route has pricing
  const price = getPriceForPath(pathname);

  // Not a protected route - allow access
  if (!price) {
    return NextResponse.next();
  }

  // Check if wallet is configured
  if (!X402_CONFIG.wallet) {
    console.warn("[x402] X402_WALLET_ADDRESS not configured, allowing free access");
    return NextResponse.next();
  }

  // ---- Check 1: Human Token ----
  const humanToken = request.cookies.get(X402_CONFIG.humanTokenCookie)?.value;
  if (humanToken) {
    const isHuman = await verifyHumanToken(humanToken);
    if (isHuman) {
      // Human verified via JS challenge - FREE access
      return NextResponse.next();
    }
  }

  // ---- Check 2: Is this a browser request without token? ----
  // Browsers send Accept: text/html, AI agents typically send application/json or omit it
  const acceptHeader = request.headers.get("Accept") || "";
  const isBrowserRequest = acceptHeader.includes("text/html");

  if (isBrowserRequest && !humanToken) {
    // Browser without token - redirect to verification page
    // After verification, they'll be redirected back here
    const verifyUrl = new URL("/verify", request.url);
    verifyUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(verifyUrl);
  }

  // ---- Check 3: Payment Header ----
  // x402 SDK sends PAYMENT-SIGNATURE header
  const paymentHeader = request.headers.get("PAYMENT-SIGNATURE") || request.headers.get("X-PAYMENT");

  if (!paymentHeader) {
    // No human token & no payment = 402 Payment Required
    return create402Response(pathname, price);
  }

  // ---- Check 3: Verify & Settle Payment via API route ----
  // (API route uses Node.js runtime to avoid Edge fetch issues)
  try {
    const paymentPayload = JSON.parse(atob(paymentHeader));
    console.log("[x402] Received payment, verifying via API route...");

    // Get the origin from the request URL
    const origin = request.nextUrl.origin;

    // Call our payment check API (runs in Node.js runtime)
    const checkResponse = await fetch(`${origin}/api/check-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentPayload,
        price,
        resource: pathname,
      }),
    });

    const checkResult = await checkResponse.json();

    if (!checkResult.success) {
      console.error("[x402] Payment check failed:", checkResult);
      return create402Response(pathname, price);
    }

    console.log("[x402] Payment verified and settled:", checkResult.txHash);

    // Payment successful - allow access
    const response = NextResponse.next();
    const paymentResponse = btoa(JSON.stringify({
      settled: true,
      txHash: checkResult.txHash,
      amount: price,
    }));
    // Set both headers for compatibility
    response.headers.set("PAYMENT-RESPONSE", paymentResponse);
    response.headers.set("X-PAYMENT-RESPONSE", paymentResponse);

    console.log(`[x402] Payment settled for ${pathname}: ${checkResult.txHash}`);
    return response;

  } catch (error) {
    console.error("[x402] Payment processing error:", error);
    return create402Response(pathname, price);
  }
}

// ============================================
// Matcher Config
// ============================================

export const config = {
  matcher: [
    "/demo/protected-content",
    "/docs/advanced/:path*",
    "/docs/enterprise/:path*",
  ],
};
