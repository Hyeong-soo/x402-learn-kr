// TEMPORARY DEBUG ENDPOINT - Remove in production
import { NextResponse } from "next/server";

// This needs to match the flag generation in middleware.ts
// We'll read it from environment or generate a consistent one for testing
export async function GET() {
  // For testing, return a sample flag that matches the pattern
  // In production, this endpoint should not exist
  return NextResponse.json({
    message: "This is a debug endpoint for testing",
    testFlag: "x402_SUCCESS_TEST1234",
    note: "Use this flag to test the verification UI",
  });
}
