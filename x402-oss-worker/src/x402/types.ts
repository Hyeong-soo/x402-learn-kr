/**
 * x402 Protocol Types
 * Based on x402 specification: https://x402.gitbook.io/x402
 */

// Environment bindings for Cloudflare Worker
export interface Env {
  CONFIG_CACHE: KVNamespace;
  FACILITATOR_URL: string;
  DEFAULT_NETWORK: string;
  USDC_ADDRESS: string;
}

// x402 Payment Requirement (server → client)
export interface PaymentRequirement {
  scheme: "evm/exact";
  network: string; // e.g., "eip155:84532" for Base Sepolia
  maxAmountRequired: string; // Amount in atomic units (wei)
  asset: string; // Token symbol or contract address
  payTo: string; // Recipient wallet address
  description?: string;
  mimeType?: string;
  maxTimeoutSeconds?: number;
  resource?: string;
  extra?: Record<string, unknown>;
}

// Full Payment Required response
export interface PaymentRequired {
  x402Version: "1";
  accepts: PaymentRequirement[];
}

// EVM authorization payload (EIP-3009)
export interface EVMAuthorization {
  token: string; // Token contract address
  from: string; // Payer address
  to: string; // Recipient address
  amount: string; // Amount in atomic units
  validAfter: number; // Unix timestamp
  validBefore: number; // Unix timestamp
  nonce: string; // Unique per transaction
}

// Payment payload (client → server)
export interface PaymentPayload {
  x402Version: "1";
  scheme: "evm/exact";
  network: string;
  payload: {
    authorization: EVMAuthorization;
    signature: string; // EIP-712 signature
  };
}

// Facilitator verify request
export interface VerifyRequest {
  paymentPayload: PaymentPayload;
  paymentRequired: PaymentRequirement;
}

// Facilitator verify response
export interface VerifyResponse {
  valid: boolean;
  invalidReason?: string;
}

// Facilitator settle response
export interface SettleResponse {
  transactionHash: string;
  status: "pending" | "confirmed" | "failed";
  blockNumber?: number;
  timestamp: number;
}

// .x402.yml configuration
export interface X402Config {
  version: number;
  wallet: string;
  pricing: {
    default: number; // Default price in USDC (0 = free)
    paths?: Record<string, number>; // Path pattern → price
  };
  metadata?: {
    name?: string;
    description?: string;
  };
}

// Resolved pricing for a specific path
export interface ResolvedPricing {
  price: number; // Price in USDC
  priceInWei: string; // Price in atomic units (6 decimals for USDC)
  wallet: string;
  path: string;
}

// HTTP Headers
export const X402_HEADERS = {
  PAYMENT_REQUIRED: "X-PAYMENT-REQUIRED",
  PAYMENT_SIGNATURE: "X-PAYMENT",
  PAYMENT_RESPONSE: "X-PAYMENT-RESPONSE",
} as const;
