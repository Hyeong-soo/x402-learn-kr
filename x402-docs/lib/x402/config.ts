// x402 Configuration
export const x402Config = {
  // Version
  version: 1,

  // Facilitator URL (Coinbase's public facilitator)
  facilitatorUrl: process.env.X402_FACILITATOR_URL || "https://x402.org/facilitator",

  // Wallet address to receive payments (Base network)
  wallet: process.env.X402_WALLET_ADDRESS || "",

  // Network (Base Sepolia for testnet, Base for mainnet)
  network: process.env.X402_NETWORK || "base-sepolia",

  // Default pricing in USDC (6 decimals)
  defaultPrice: "10000", // $0.01 USDC = 10000 (0.01 * 10^6)

  // Human verification token expiry (24 hours)
  humanTokenExpiry: 24 * 60 * 60 * 1000,

  // Cookie name for human verification
  humanTokenCookie: "x402_human_token",

  // Protected routes with pricing
  pricing: {
    "/docs/advanced/**": "10000",      // $0.01 USDC
    "/docs/enterprise/**": "50000",    // $0.05 USDC
    "/demo/protected-content": "10000", // $0.01 USDC
  } as Record<string, string>,
};

// Network configurations
export const networks = {
  "base-sepolia": {
    chainId: "eip155:84532",
    name: "Base Sepolia",
    asset: "USDC",
    assetAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC on Base Sepolia
  },
  "base": {
    chainId: "eip155:8453",
    name: "Base",
    asset: "USDC",
    assetAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  },
} as const;

export type NetworkName = keyof typeof networks;

export function getNetworkConfig(network: NetworkName = "base-sepolia") {
  return networks[network] || networks["base-sepolia"];
}
