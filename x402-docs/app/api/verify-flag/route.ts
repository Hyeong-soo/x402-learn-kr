import { NextRequest, NextResponse } from "next/server";

// Generate consistent flag from environment secret (same logic as middleware)
function generateSuccessFlag(): string {
  const secret = process.env.X402_FLAG_SECRET || "default-flag-secret-change-me";
  let hash = 0;
  for (let i = 0; i < secret.length; i++) {
    const char = secret.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const flagSuffix = Math.abs(hash).toString(36).toUpperCase().substring(0, 8);
  return `x402_SUCCESS_${flagSuffix}`;
}

export async function POST(request: NextRequest) {
  try {
    const { flag } = await request.json();

    if (!flag || typeof flag !== "string") {
      return NextResponse.json(
        { success: false, error: "Flag is required" },
        { status: 400 }
      );
    }

    const expectedFlag = generateSuccessFlag();
    const isValid = flag.trim() === expectedFlag;

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: "Flag verified successfully! Your AI agent completed the x402 payment flow.",
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Invalid flag. Make sure you copied the exact flag from the AI response.",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
