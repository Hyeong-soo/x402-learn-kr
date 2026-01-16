"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/**
 * Human Verification Page
 *
 * This page runs the JavaScript verification challenge.
 * Since AI agents can't execute JavaScript, only real browsers
 * will pass this verification and get redirected to the content.
 */
export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [message, setMessage] = useState("Verifying you're human...");

  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    const verify = async () => {
      try {
        // Call the verification API
        const response = await fetch("/api/verify-human", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          setStatus("success");
          setMessage("Verified! Redirecting...");

          // Short delay so user sees the success message
          setTimeout(() => {
            router.push(redirectTo);
          }, 500);
        } else {
          setStatus("error");
          setMessage("Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("[x402] Verification error:", error);
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    };

    verify();
  }, [redirectTo, router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        {/* Status Icon */}
        <div className="flex justify-center">
          {status === "verifying" && (
            <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          )}
          {status === "success" && (
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
          {status === "error" && (
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{message}</h1>
          <p className="text-white/60">
            {status === "verifying" && "This only takes a moment..."}
            {status === "success" && "You have free access as a human visitor."}
            {status === "error" && (
              <button
                onClick={() => window.location.reload()}
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Click here to retry
              </button>
            )}
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10 max-w-md mx-auto">
          <p className="text-sm text-white/60">
            <span className="text-white font-medium">Why this check?</span>
            <br />
            We verify you're human to provide free access. AI agents are charged
            a small fee to support open source maintainers.
          </p>
        </div>

        {/* x402 Badge */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="text-emerald-400 text-sm font-medium">x402</span>
            <span className="text-white/40 text-sm">Human Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
}
