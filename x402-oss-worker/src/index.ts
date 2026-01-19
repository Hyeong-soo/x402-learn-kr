/**
 * x402 Open Source Gateway
 *
 * A Cloudflare Worker that adds x402 payment support to GitHub content.
 * Usage: GET /github/{owner}/{repo}/{path}
 */

import type { Env } from "./x402/types";
import { getX402Config, getPricingForPath, fetchGitHubContent } from "./github/config";
import {
  createPaymentRequiredResponse,
  parsePaymentSignature,
  verifyPayment,
  settlePayment,
  addPaymentReceiptHeader,
} from "./x402/payment";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return handleCORS();
    }

    // Only allow GET requests
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    // Route: GET /
    if (url.pathname === "/" || url.pathname === "") {
      return handleHome();
    }

    // Route: GET /health
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Route: GET /github/{owner}/{repo}/{path}
    const githubMatch = url.pathname.match(
      /^\/github\/([^\/]+)\/([^\/]+)\/(.+)$/
    );

    if (githubMatch) {
      const [, owner, repo, path] = githubMatch;
      return handleGitHubContent(request, env, owner, repo, path);
    }

    return new Response("Not found. Use: /github/{owner}/{repo}/{path}", {
      status: 404,
    });
  },
};

/**
 * Handle GitHub content requests with x402 payment
 */
async function handleGitHubContent(
  request: Request,
  env: Env,
  owner: string,
  repo: string,
  path: string
): Promise<Response> {
  // 1. Get repository's .x402.yml config
  const config = await getX402Config(env, owner, repo);

  // 2. Determine pricing for this path
  const pricing = getPricingForPath(config, path);

  // 3. If content is free, return it directly
  if (pricing.price === 0 || !pricing.wallet) {
    const response = await fetchGitHubContent(owner, repo, path);
    return addCORSHeaders(response);
  }

  // 4. Content requires payment - check for payment header
  const paymentPayload = parsePaymentSignature(request);

  if (!paymentPayload) {
    // No payment provided - return 402
    const response = createPaymentRequiredResponse(pricing, env.DEFAULT_NETWORK);
    return addCORSHeaders(response);
  }

  // 5. Verify the payment
  const verification = await verifyPayment(env, paymentPayload, pricing);

  if (!verification.valid) {
    return addCORSHeaders(
      new Response(
        JSON.stringify({
          error: "Payment verification failed",
          reason: verification.reason,
        }),
        {
          status: 402,
          headers: { "Content-Type": "application/json" },
        }
      )
    );
  }

  // 6. Settle the payment on-chain
  const settlement = await settlePayment(env, paymentPayload, pricing);

  if (!settlement.success) {
    return addCORSHeaders(
      new Response(
        JSON.stringify({
          error: "Payment settlement failed",
          reason: settlement.error,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    );
  }

  // 7. Payment successful - return content
  const content = await fetchGitHubContent(owner, repo, path);
  const responseWithReceipt = addPaymentReceiptHeader(
    content,
    settlement.txHash || "pending"
  );

  return addCORSHeaders(responseWithReceipt);
}

/**
 * Home page with usage instructions
 */
function handleHome(): Response {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>x402 Open Source Gateway</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      color: #333;
    }
    h1 { color: #0066cc; }
    code {
      background: #f4f4f4;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'SF Mono', Monaco, monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
    }
    .endpoint {
      background: #e8f4ff;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
    }
  </style>
</head>
<body>
  <h1>x402 Open Source Gateway</h1>
  <p>
    This gateway enables <a href="https://x402.org">x402 payments</a> for
    open source documentation on GitHub.
  </p>

  <h2>Usage</h2>
  <div class="endpoint">
    <code>GET /github/{owner}/{repo}/{path}</code>
  </div>

  <h3>Example</h3>
  <pre>curl https://x402-oss-gateway.workers.dev/github/facebook/react/README.md</pre>

  <h2>For Repository Maintainers</h2>
  <p>Add a <code>.x402.yml</code> file to your repository root:</p>
  <pre>
version: 1
wallet: "0x1234567890abcdef..."

pricing:
  default: 0  # Free by default
  paths:
    "docs/advanced/**": 0.01
    "examples/enterprise/**": 0.05
  </pre>

  <h2>Payment Flow</h2>
  <ol>
    <li>Request content → Get <code>402 Payment Required</code></li>
    <li>Sign payment with your wallet</li>
    <li>Retry request with <code>X-PAYMENT</code> header</li>
    <li>Receive content</li>
  </ol>

  <p>
    <a href="https://github.com/your-org/x402-for-opensource">GitHub</a> |
    <a href="https://x402.org">x402 Protocol</a>
  </p>
</body>
</html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

/**
 * Handle CORS preflight requests
 */
function handleCORS(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-PAYMENT",
      "Access-Control-Max-Age": "86400",
    },
  });
}

/**
 * Add CORS headers to response
 */
function addCORSHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set("Access-Control-Expose-Headers", "X-PAYMENT-REQUIRED, X-PAYMENT-RESPONSE");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
