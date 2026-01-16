/**
 * Human Verification via JWT
 *
 * Uses JS challenge to verify human visitors.
 * AI agents cannot execute JavaScript, so they won't get the token.
 */

import { SignJWT, jwtVerify } from "jose";
import { x402Config } from "./x402-config";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "x402-demo-secret-change-in-production"
);

/**
 * Create a human verification token
 */
export async function createHumanToken(): Promise<string> {
  const token = await new SignJWT({ type: "human", verified: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${x402Config.humanTokenTTL}s`)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify a human token
 */
export async function verifyHumanToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.type === "human" && payload.verified === true;
  } catch {
    return false;
  }
}
