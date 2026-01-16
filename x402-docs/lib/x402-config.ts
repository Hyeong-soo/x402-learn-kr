/**
 * x402 Configuration
 *
 * Humans: FREE access (verified via JS challenge)
 * AI Agents: PAID access via x402 protocol
 */

export const x402Config = {
  // Payment recipient wallet
  wallet: process.env.WALLET_ADDRESS || "0x1234567890abcdef1234567890abcdef12345678",

  // Network configuration
  network: "eip155:84532", // Base Sepolia (testnet)
  facilitatorUrl: "https://x402.org/facilitator",

  // AI agent pricing (humans are free)
  pricing: {
    // Demo pages - AI pays
    "/demo/**": 0.01,
    "/docs/advanced/**": 0.01,
    "/docs/enterprise/**": 0.05,
  },

  // Known AI agent User-Agent patterns
  aiAgentPatterns: [
    "claude",
    "anthropic",
    "openai",
    "gpt",
    "cursor",
    "copilot",
    "chatgpt",
    "x402-client",
    "ai-agent",
    "bot",
  ],

  // Human verification token TTL (24 hours)
  humanTokenTTL: 60 * 60 * 24,
};

// USDC decimals
export const USDC_DECIMALS = 6;

/**
 * Convert USD to USDC wei (atomic units)
 */
export function usdToWei(usd: number): string {
  return Math.floor(usd * 10 ** USDC_DECIMALS).toString();
}

/**
 * Check if a path requires payment for AI
 */
export function getPriceForPath(path: string): number {
  for (const [pattern, price] of Object.entries(x402Config.pricing)) {
    const regex = new RegExp(
      "^" + pattern.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*") + "$"
    );
    if (regex.test(path)) {
      return price;
    }
  }
  return 0; // Free by default
}

/**
 * Check if request is from an AI agent
 */
export function isAIAgent(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return x402Config.aiAgentPatterns.some(pattern => ua.includes(pattern));
}
