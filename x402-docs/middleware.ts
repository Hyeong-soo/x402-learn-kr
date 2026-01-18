/**
 * x402 Middleware for Next.js
 *
 * - Humans (browsers with JS): FREE access
 * - AI Agents: Must pay via x402 protocol
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================
// Search Engine Crawlers (SEO)
// ============================================

const SEARCH_ENGINE_BOTS = [
  "googlebot",
  "bingbot",
  "slurp",        // Yahoo
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "sogou",
  "exabot",
  "facebot",      // Facebook
  "ia_archiver",  // Alexa
];

function isSearchEngineCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return SEARCH_ENGINE_BOTS.some(bot => ua.includes(bot));
}

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

// Generate random flag for each deployment (changes on restart)
const SUCCESS_FLAG = `x402_SUCCESS_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

// Log the flag for testing (remove in production)
console.log(`[x402] Current success flag: ${SUCCESS_FLAG}`);

// AI-optimized markdown content for protected routes
const AI_CONTENT: Record<string, string> = {
  "/demo/protected-content": `# x402 Protected Content - Access Granted

## Verification Flag
\`\`\`
${SUCCESS_FLAG}
\`\`\`

Congratulations! Your AI agent successfully paid $0.01 USDC via x402 protocol and accessed this protected content.

## What This Demonstrates

1. **Payment Successful**: Your agent's wallet was charged $0.01 USDC on Base Sepolia
2. **x402 Protocol Works**: The 402 Payment Required → Payment → Access flow completed
3. **Token Efficient**: This markdown response saves tokens compared to full HTML

## Premium API Documentation

### Secret Configuration
\`\`\`json
{
  "secret_key": "x402-premium-content-key",
  "api_endpoint": "https://api.example.com/v2",
  "features": {
    "advanced_analytics": true,
    "custom_webhooks": true,
    "priority_support": true
  }
}
\`\`\`

### Enterprise Integration Steps
1. Configure your SSO provider
2. Set up webhook endpoints
3. Enable audit logging
4. Configure rate limiting policies

## Summary
- **Humans**: Free access (verified via JavaScript)
- **AI Agents**: Pay via x402 protocol (you just did this!)
- **Maintainers**: Earn revenue from AI usage

---
*Content served via x402 protocol. Flag: ${SUCCESS_FLAG}*
`,
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

function create402Response(pathname: string, price: string, isBrowser: boolean = false): NextResponse {
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

  const paymentRequiredHeader = btoa(JSON.stringify(paymentRequired));

  // 브라우저 요청인 경우 HTML 반환 (JS로 /verify로 리다이렉트)
  if (isBrowser) {
    const htmlBody = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>402 Payment Required</title>
  <script>
    // 브라우저는 자동으로 /verify 페이지로 이동하여 human 검증
    window.location.href = '/verify?redirect=${encodeURIComponent(pathname)}';
  </script>
  <style>
    body { font-family: system-ui; background: #0a0a0a; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .container { text-align: center; }
    h1 { color: #10b981; }
    p { color: #9ca3af; }
    a { color: #10b981; }
  </style>
</head>
<body>
  <div class="container">
    <h1>402 Payment Required</h1>
    <p>AI 에이전트는 $${priceInDollars} USDC 결제가 필요합니다.</p>
    <p>사람이신가요? <a href="/verify?redirect=${encodeURIComponent(pathname)}">여기를 클릭</a>하여 무료로 접근하세요.</p>
  </div>
</body>
</html>`;

    return new NextResponse(htmlBody, {
      status: 402,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "PAYMENT-REQUIRED": paymentRequiredHeader,
        "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, PAYMENT-RESPONSE, X-PAYMENT-REQUIRED, X-PAYMENT-RESPONSE",
      },
    });
  }

  // AI 에이전트용 JSON 응답
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
      "PAYMENT-REQUIRED": paymentRequiredHeader,
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

  // ---- Check 0: Search Engine Crawlers (SEO) ----
  const userAgent = request.headers.get("User-Agent") || "";
  if (isSearchEngineCrawler(userAgent)) {
    // Search engine bots get FREE access for SEO indexing
    console.log(`[x402] Search engine crawler detected: ${userAgent.substring(0, 50)}...`);
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

  // ---- Check 2: Payment Header ----
  // x402 SDK sends PAYMENT-SIGNATURE header
  const paymentHeader = request.headers.get("PAYMENT-SIGNATURE") || request.headers.get("X-PAYMENT");

  if (!paymentHeader) {
    // No human token & no payment = 402 Payment Required
    // 브라우저 요청인지 확인 (Accept: text/html 포함 여부)
    const acceptHeader = request.headers.get("Accept") || "";
    const isBrowserRequest = acceptHeader.includes("text/html");
    return create402Response(pathname, price, isBrowserRequest);
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

    // Payment successful - return markdown content for AI agents (token efficient)
    const aiContent = AI_CONTENT[pathname];
    if (aiContent) {
      const paymentResponse = btoa(JSON.stringify({
        settled: true,
        txHash: checkResult.txHash,
        amount: price,
      }));

      console.log(`[x402] Payment settled for ${pathname}: ${checkResult.txHash}`);
      console.log(`[x402] Returning markdown content for AI agent`);

      return new NextResponse(aiContent, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "PAYMENT-RESPONSE": paymentResponse,
          "X-PAYMENT-RESPONSE": paymentResponse,
          "Access-Control-Expose-Headers": "PAYMENT-RESPONSE, X-PAYMENT-RESPONSE",
        },
      });
    }

    // Fallback: allow access to Next.js page
    const response = NextResponse.next();
    const paymentResponse = btoa(JSON.stringify({
      settled: true,
      txHash: checkResult.txHash,
      amount: price,
    }));
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
