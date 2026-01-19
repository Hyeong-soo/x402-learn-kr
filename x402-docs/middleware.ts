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
  "/api/content/demo/protected-content": "10000", // $0.01 (AI API)
  "/api/content/docs/advanced": "10000",          // $0.01 (AI API)
  "/api/content/docs/enterprise": "50000",        // $0.05 (AI API)
};

// Generate consistent flag from environment secret
// This ensures the same flag is used across all serverless instances
function generateSuccessFlag(): string {
  const secret = process.env.X402_FLAG_SECRET || "default-flag-secret-change-me";
  // Simple hash to generate consistent flag from secret
  let hash = 0;
  for (let i = 0; i < secret.length; i++) {
    const char = secret.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const flagSuffix = Math.abs(hash).toString(36).toUpperCase().substring(0, 8);
  return `x402_SUCCESS_${flagSuffix}`;
}

const SUCCESS_FLAG = generateSuccessFlag();

// Log the flag for testing (remove in production)
console.log(`[x402] Current success flag: ${SUCCESS_FLAG}`);

// AI-optimized markdown content for protected routes
const AI_CONTENT: Record<string, string> = {
  "/demo/protected-content": `# x402 통합 가이드

Next.js 미들웨어에 x402 결제 보호를 추가하는 방법입니다.

## 1. 환경 변수 설정

\`\`\`bash
# .env.local
X402_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f...
X402_NETWORK=base-sepolia  # 또는 base (메인넷)
X402_SECRET_KEY=your-secret-key-for-human-verification
\`\`\`

## 2. 미들웨어 핵심 로직

\`\`\`typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호할 경로와 가격 설정 (USDC 6 decimals)
const PRICING: Record<string, string> = {
  "/api/premium": "10000",     // $0.01
  "/docs/advanced": "50000",   // $0.05
};

export async function middleware(request: NextRequest) {
  const price = PRICING[request.nextUrl.pathname];
  if (!price) return NextResponse.next();

  // 1. 사람 검증 (쿠키 확인)
  const humanToken = request.cookies.get("x402_human_token");
  if (humanToken && await verifyHumanToken(humanToken.value)) {
    return NextResponse.next(); // 무료 통과
  }

  // 2. 결제 헤더 확인
  const paymentHeader = request.headers.get("x-payment");
  if (!paymentHeader) {
    return create402Response(price, request);
  }

  // 3. 결제 검증 후 콘텐츠 제공
  const isValid = await verifyPayment(paymentHeader, price);
  if (isValid) {
    return NextResponse.next();
  }

  return create402Response(price, request);
}
\`\`\`

## 3. 402 응답 생성

\`\`\`typescript
function create402Response(price: string, request: NextRequest) {
  const paymentRequired = {
    x402Version: 2,
    accepts: [{
      scheme: "exact",
      network: "eip155:84532",  // Base Sepolia (CAIP-2)
      amount: price,
      resource: request.nextUrl.href,
      payTo: process.env.X402_WALLET_ADDRESS,
      asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC
      extra: { name: "USDC", version: "2" }
    }]
  };

  return new NextResponse(JSON.stringify(paymentRequired), {
    status: 402,
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT-REQUIRED": btoa(JSON.stringify(paymentRequired))
    }
  });
}
\`\`\`

## 요약

- **사람**: JavaScript 검증으로 무료 접근
- **AI 에이전트**: x402 프로토콜로 결제 필요
- **메인테이너**: AI 사용량에서 수익 창출

---

**검증 플래그**: \`${SUCCESS_FLAG}\`

*이 플래그를 데모 페이지에 입력하여 x402 결제 성공을 확인하세요.*
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

function create402Response(pathname: string, price: string, request: NextRequest): NextResponse {
  const networkKey = X402_CONFIG.network as keyof typeof NETWORKS;
  const network = NETWORKS[networkKey] || NETWORKS["base-sepolia"];
  const priceInDollars = (parseInt(price) / 1000000).toFixed(2);
  const resourceUrl = `${request.nextUrl.origin}${pathname}`;

  const paymentRequired = {
    // Using v2 with CAIP-2 network format
    x402Version: 2,
    accepts: [
      {
        scheme: "exact",
        // v2 uses CAIP-2 format like "eip155:84532"
        network: network.chainId,
        // SDK uses 'amount' field
        amount: price,
        maxAmountRequired: price,
        resource: resourceUrl,
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

  // Check Accept header - browsers send text/html, x402-fetch sends nothing or application/json
  const acceptHeader = request.headers.get("Accept") || "";
  const wantsHtml = acceptHeader.includes("text/html");

  // AI agents (x402-fetch): JSON body for x402 protocol compliance
  if (!wantsHtml) {
    return new NextResponse(JSON.stringify(paymentRequired), {
      status: 402,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "PAYMENT-REQUIRED": paymentRequiredHeader,
        "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, PAYMENT-RESPONSE",
      },
    });
  }

  // 브라우저: 인라인 챌린지 HTML
  // - JS 실행 → 토큰 발급 → reload → 콘텐츠
  const htmlBody = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <title>402 Payment Required</title>
  <link rel="alternate" type="application/json" href="/api/content${pathname}" />
  <style>
    body { font-family: system-ui; background: #0a0a0a; color: #fff;
           display: flex; justify-content: center; align-items: center;
           height: 100vh; margin: 0; }
    .container { text-align: center; max-width: 400px; padding: 20px; }
    h1 { color: #10b981; margin-bottom: 16px; }
    p { color: #9ca3af; margin: 8px 0; }
    .loading { display: block; }
    .error { display: none; color: #9ca3af; }
    code { background: #1f2937; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    .price { color: #f59e0b; font-weight: bold; }
    noscript .error { display: block; }
  </style>
</head>
<body>
  <div class="container">
    <h1>402 Payment Required</h1>
    <p class="loading">브라우저 확인 중...</p>
    <div class="error">
      <p>AI 에이전트는 <span class="price">$${priceInDollars} USDC</span> 결제가 필요합니다.</p>
      <p>API: <code>/api/content${pathname}</code></p>
    </div>
    <noscript>
      <style>.loading { display: none !important; } .error { display: block !important; }</style>
    </noscript>
  </div>
  <script>
    fetch('/api/verify-human', { method: 'POST', credentials: 'include' })
      .then(r => r.json())
      .then(d => {
        if (d.success) location.reload();
        else throw new Error('Verification failed');
      })
      .catch(() => {
        document.querySelector('.loading').style.display = 'none';
        document.querySelector('.error').style.display = 'block';
      });
  </script>
</body>
</html>`;

  return new NextResponse(htmlBody, {
    status: 402,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "PAYMENT-REQUIRED": paymentRequiredHeader,
      "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, PAYMENT-RESPONSE",
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
  // x402 SDK sends payment-signature header (lowercase in HTTP/2)
  // DEBUG: Log all headers to understand what we're receiving
  const allHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    allHeaders[key] = value.substring(0, 50);
  });
  console.log("[x402] Request headers:", JSON.stringify(allHeaders));

  const paymentHeader = request.headers.get("payment-signature") || request.headers.get("x-payment");
  console.log("[x402] Payment header found:", !!paymentHeader);

  if (!paymentHeader) {
    // No human token & no payment = 402 Payment Required
    // 모든 비인증 요청에 동일한 인라인 챌린지 HTML 반환
    // - 브라우저: JS 실행으로 자동 검증
    // - AI: 402 상태 코드 + PAYMENT-REQUIRED 헤더 수신
    return create402Response(pathname, price, request);
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
      return create402Response(pathname, price, request);
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
    return create402Response(pathname, price, request);
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
    "/api/content/:path*",
  ],
};
