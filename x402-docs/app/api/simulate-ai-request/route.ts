import { NextResponse } from "next/server";
import { x402Config, getPriceForPath, usdToWei } from "@/lib/x402-config";

export async function POST(request: Request) {
  try {
    const { path } = await request.json();

    // Get price for the path
    const price = getPriceForPath(path);

    // Simulate what an AI agent would receive
    const paymentRequired = {
      x402Version: "1",
      accepts: [
        {
          scheme: "evm/exact",
          network: x402Config.network,
          maxAmountRequired: usdToWei(price),
          asset: "USDC",
          payTo: x402Config.wallet,
          description: `AI access to ${path}`,
        },
      ],
    };

    // Return simulated 402 response
    return NextResponse.json({
      status: 402,
      statusText: "Payment Required",
      headers: {
        "X-PAYMENT-REQUIRED": Buffer.from(JSON.stringify(paymentRequired)).toString("base64"),
        "Content-Type": "application/json",
      },
      body: {
        error: "Payment Required",
        message: `AI agents must pay $${price.toFixed(2)} USDC to access this content`,
        path,
        price,
        network: "Base Sepolia (testnet)",
        token: "USDC",
        wallet: x402Config.wallet,
        note: "This is what an AI agent would see. Humans get free access!",
      },
      paymentDetails: paymentRequired,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to simulate request", details: error.message },
      { status: 500 }
    );
  }
}
