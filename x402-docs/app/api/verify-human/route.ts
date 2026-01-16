import { NextResponse } from "next/server";

const SECRET_KEY = process.env.X402_SECRET_KEY || "x402-default-secret-change-me";
const COOKIE_NAME = "x402_human_token";
const TOKEN_EXPIRY = 24 * 60 * 60; // 24 hours in seconds

/**
 * Generate HMAC-SHA256 signature
 */
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

/**
 * Create a human verification token
 */
async function createHumanToken(): Promise<string> {
  const timestamp = Date.now();
  const signature = await hmacSha256(SECRET_KEY, `human:${timestamp}`);
  return btoa(JSON.stringify({ timestamp, signature }));
}

/**
 * POST /api/verify-human
 *
 * When JavaScript calls this endpoint, it proves the client is a real browser.
 * AI agents making HTTP requests can't execute JavaScript.
 */
export async function POST() {
  try {
    const token = await createHumanToken();

    const response = NextResponse.json({
      success: true,
      message: "Human verified - you now have free access for 24 hours",
      expiresIn: TOKEN_EXPIRY,
    });

    // Set the human verification cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: TOKEN_EXPIRY,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[x402] Human verification error:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/verify-human
 *
 * Check if the current user has a valid human token
 */
export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    })
  );

  const token = cookies[COOKIE_NAME];

  if (!token) {
    return NextResponse.json({
      verified: false,
      message: "No human token found",
    });
  }

  try {
    const decoded = JSON.parse(atob(token));
    const { timestamp, signature } = decoded;

    // Check expiry
    const expiryMs = TOKEN_EXPIRY * 1000;
    if (Date.now() - timestamp > expiryMs) {
      return NextResponse.json({
        verified: false,
        message: "Token expired",
      });
    }

    // Verify signature
    const expectedSignature = await hmacSha256(SECRET_KEY, `human:${timestamp}`);
    const isValid = signature === expectedSignature;

    return NextResponse.json({
      verified: isValid,
      message: isValid ? "Valid human token" : "Invalid token signature",
      expiresAt: isValid ? new Date(timestamp + expiryMs).toISOString() : null,
    });
  } catch {
    return NextResponse.json({
      verified: false,
      message: "Invalid token format",
    });
  }
}
