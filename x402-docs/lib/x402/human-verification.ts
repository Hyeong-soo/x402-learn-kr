import { x402Config } from "./config";
import crypto from "crypto";

// Secret key for signing tokens (should be in env)
const SECRET_KEY = process.env.X402_SECRET_KEY || "x402-secret-key-change-in-production";

/**
 * Generate a human verification token
 * This is set when a browser executes JavaScript
 */
export function generateHumanToken(): string {
  const timestamp = Date.now();
  const data = `human:${timestamp}`;
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(data)
    .digest("hex");

  return Buffer.from(JSON.stringify({ timestamp, signature })).toString("base64");
}

/**
 * Verify a human token
 */
export function verifyHumanToken(token: string): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    const { timestamp, signature } = decoded;

    // Check if token is expired
    if (Date.now() - timestamp > x402Config.humanTokenExpiry) {
      return false;
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(`human:${timestamp}`)
      .digest("hex");

    return signature === expectedSignature;
  } catch {
    return false;
  }
}

/**
 * Check if request is from a human (has valid token)
 */
export function isHumanRequest(cookies: string | null): boolean {
  if (!cookies) return false;

  // Parse cookies
  const cookieMap = parseCookies(cookies);
  const token = cookieMap[x402Config.humanTokenCookie];

  if (!token) return false;

  return verifyHumanToken(token);
}

/**
 * Parse cookie string into object
 */
function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieString.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name && rest.length > 0) {
      cookies[name] = rest.join("=");
    }
  });

  return cookies;
}

/**
 * Generate a JavaScript challenge for human verification
 * This is a simple challenge that browsers can execute but AI agents cannot
 */
export function generateJsChallenge(): { challenge: string; expectedAnswer: string } {
  // Simple math challenge
  const a = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  const expectedAnswer = String(a + b);

  const challenge = `
    (function() {
      return ${a} + ${b};
    })()
  `;

  return { challenge, expectedAnswer };
}
