"use client";

import { useEffect, useState } from "react";

/**
 * HumanVerification Component
 *
 * This component automatically verifies that the user is human by making
 * a JavaScript call to the verification API. Since AI agents can't execute
 * JavaScript, only real browsers will get the verification token.
 *
 * Include this component in your layout to automatically verify all visitors.
 */
export function HumanVerification() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Check if already verified
    const checkAndVerify = async () => {
      try {
        // First check if we already have a valid token
        const checkResponse = await fetch("/api/verify-human", {
          method: "GET",
          credentials: "include",
        });
        const checkData = await checkResponse.json();

        if (checkData.verified) {
          setVerified(true);
          return;
        }

        // Not verified yet, get a new token
        const verifyResponse = await fetch("/api/verify-human", {
          method: "POST",
          credentials: "include",
        });

        if (verifyResponse.ok) {
          setVerified(true);
          console.log("[x402] Human verification successful");
        }
      } catch (error) {
        console.error("[x402] Human verification error:", error);
      }
    };

    checkAndVerify();
  }, []);

  // This component doesn't render anything visible
  // It just runs the verification in the background
  return null;
}

/**
 * useHumanVerification Hook
 *
 * Use this hook to check the current verification status
 */
export function useHumanVerification() {
  const [status, setStatus] = useState<{
    verified: boolean;
    loading: boolean;
    expiresAt: string | null;
  }>({
    verified: false,
    loading: true,
    expiresAt: null,
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/verify-human", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        setStatus({
          verified: data.verified,
          loading: false,
          expiresAt: data.expiresAt || null,
        });
      } catch {
        setStatus({
          verified: false,
          loading: false,
          expiresAt: null,
        });
      }
    };

    checkStatus();
  }, []);

  return status;
}
