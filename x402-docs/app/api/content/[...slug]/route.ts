import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering to ensure middleware runs
export const dynamic = "force-dynamic";

/**
 * AI Content API
 *
 * AI 에이전트가 JSON/Markdown으로 콘텐츠를 받을 수 있는 API 엔드포인트.
 * x402 결제 검증은 미들웨어에서 처리됩니다.
 *
 * 사용 예:
 *   GET /api/content/demo/protected-content
 *   → 미들웨어에서 결제 검증
 *   → 콘텐츠 반환
 */

// Generate random flag for each deployment (matches middleware)
const SUCCESS_FLAG = `x402_API_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

// AI-optimized content for protected routes
const CONTENT: Record<string, { title: string; content: string; format: string }> = {
  "/demo/protected-content": {
    title: "x402 Protected Content - Access Granted",
    format: "markdown",
    content: `# x402 Protected Content - Access Granted

## Verification Flag
\`\`\`
${SUCCESS_FLAG}
\`\`\`

Congratulations! Your AI agent successfully paid $0.01 USDC via x402 protocol and accessed this protected content.

## What This Demonstrates

1. **Payment Successful**: Your agent's wallet was charged $0.01 USDC on Base Sepolia
2. **x402 Protocol Works**: The 402 Payment Required → Payment → Access flow completed
3. **API Optimized**: This JSON/Markdown response is optimized for AI consumption

## Premium API Documentation

### Secret Configuration
\`\`\`json
{
  "secret_key": "x402-api-premium-key",
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
- **Humans**: Free access via browser (verified via JavaScript)
- **AI Agents**: Pay via x402 protocol (you just did this!)
- **Maintainers**: Earn revenue from AI usage

---
*Content served via x402 API. Flag: ${SUCCESS_FLAG}*
`,
  },
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await context.params;
  const path = "/" + slug.join("/");

  // Check if content exists for this path
  const contentData = CONTENT[path];

  if (!contentData) {
    return NextResponse.json(
      {
        error: "Not Found",
        message: `No content available for path: ${path}`,
        availablePaths: Object.keys(CONTENT),
      },
      { status: 404 }
    );
  }

  // Return structured content
  return NextResponse.json({
    path,
    title: contentData.title,
    format: contentData.format,
    content: contentData.content,
    meta: {
      accessedAt: new Date().toISOString(),
      protocol: "x402",
    },
  });
}
