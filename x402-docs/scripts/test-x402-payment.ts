/**
 * x402 Payment Test Script
 *
 * Tests the actual payment flow with a real wallet
 *
 * Usage:
 *   npx tsx scripts/test-x402-payment.ts
 *
 * Requirements:
 *   1. Set AGENT_PRIVATE_KEY in .env.local (test wallet private key)
 *   2. Have testnet USDC in the wallet (Base Sepolia)
 *
 * Get testnet USDC:
 *   - Base Sepolia Faucet: https://www.coinbase.com/faucets/base-sepolia-faucet
 *   - Bridge ETH to USDC: Use testnet DEX or faucet
 */

// Load env manually (Next.js style)
import { readFileSync, existsSync } from "fs";
if (existsSync(".env.local")) {
  const envContent = readFileSync(".env.local", "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && !key.startsWith("#")) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
}

const SERVER_URL = "http://localhost:3010";
const PROTECTED_ENDPOINT = "/demo/protected-content";

async function testWithoutPayment() {
  console.log("\n=== Test 1: Request without payment ===\n");

  const response = await fetch(`${SERVER_URL}${PROTECTED_ENDPOINT}`, {
    headers: {
      // No Accept: text/html to simulate AI agent
      "User-Agent": "x402-test-agent/1.0",
    },
  });

  console.log(`Status: ${response.status}`);

  if (response.status === 402) {
    const paymentRequired = response.headers.get("X-PAYMENT-REQUIRED");
    if (paymentRequired) {
      const decoded = JSON.parse(atob(paymentRequired));
      console.log("\nPayment Required:");
      console.log(JSON.stringify(decoded, null, 2));
    }

    const body = await response.json();
    console.log("\nResponse body:");
    console.log(JSON.stringify(body, null, 2));
  }

  return response.status === 402;
}

async function testWithPayment() {
  console.log("\n=== Test 2: Request with x402 payment ===\n");

  const privateKey = process.env.AGENT_PRIVATE_KEY;

  if (!privateKey) {
    console.log("⚠️  AGENT_PRIVATE_KEY not set in .env.local");
    console.log("\nTo test actual payment:");
    console.log("1. Create a test wallet");
    console.log("2. Get testnet ETH from https://www.coinbase.com/faucets/base-sepolia-faucet");
    console.log("3. Get testnet USDC (or use a testnet DEX)");
    console.log("4. Add AGENT_PRIVATE_KEY=0x... to .env.local");
    return false;
  }

  try {
    const { wrapFetchWithPayment, x402Client } = await import("@x402/fetch");
    const { ExactEvmScheme } = await import("@x402/evm");
    const { createWalletClient, http } = await import("viem");
    const { privateKeyToAccount } = await import("viem/accounts");
    const { baseSepolia } = await import("viem/chains");

    // Create viem wallet client
    const account = privateKeyToAccount(privateKey as `0x${string}`);
    const walletClient = createWalletClient({
      account,
      chain: baseSepolia,
      transport: http(),
    });

    console.log(`Wallet address: ${account.address}`);

    // Create x402 client with EVM scheme
    // Note: viem walletClient needs address at top level for x402 SDK
    const evmSigner = {
      ...walletClient,
      address: account.address,
    };
    const evmScheme = new ExactEvmScheme(evmSigner);

    const client = x402Client.fromConfig({
      schemes: [
        // x402 v2 uses CAIP-2 format (eip155:84532)
        { network: "eip155:84532", client: evmScheme, x402Version: 2 },
      ],
    });

    // Wrap fetch with x402 payment capability
    const x402Fetch = wrapFetchWithPayment(fetch, client);

    console.log("Making request with x402 payment capability...\n");

    const response = await x402Fetch(`${SERVER_URL}${PROTECTED_ENDPOINT}`, {
      headers: {
        "User-Agent": "x402-test-agent/1.0",
      },
    });

    console.log(`Status: ${response.status}`);

    if (response.status === 200) {
      console.log("\n✅ Payment successful! Content received.");
      const paymentResponse = response.headers.get("X-PAYMENT-RESPONSE");
      if (paymentResponse) {
        const decoded = JSON.parse(atob(paymentResponse));
        console.log("\nPayment details:");
        console.log(JSON.stringify(decoded, null, 2));
      }
      // Show first part of content
      const text = await response.text();
      console.log("\nContent preview (first 200 chars):");
      console.log(text.slice(0, 200) + "...");
    } else {
      console.log("\n❌ Payment failed");
      const body = await response.text();
      console.log(body.slice(0, 500));
    }

    return response.status === 200;
  } catch (error) {
    console.error("Payment error:", error);
    return false;
  }
}

async function main() {
  console.log("╔════════════════════════════════════════╗");
  console.log("║     x402 Payment Flow Test             ║");
  console.log("╚════════════════════════════════════════╝");

  // Test 1: Without payment (should get 402)
  const got402 = await testWithoutPayment();
  console.log(`\n${got402 ? "✅" : "❌"} Test 1: ${got402 ? "Correctly received 402" : "Did not receive 402"}`);

  // Test 2: With payment (if wallet configured)
  await testWithPayment();

  console.log("\n" + "=".repeat(50) + "\n");
}

main().catch(console.error);
