import Link from "next/link";
import { CheckCircle2, ArrowRight, BookOpen, Zap } from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10 max-w-4xl px-4">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono">Free</span>
              <span className="text-sm text-white/80">Getting Started</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Quick Start Guide
            </h1>
            <p className="text-lg text-white/60">
              Get x402 running on your documentation site in 5 minutes.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-white/60">
                x402 for Open Source lets you monetize your documentation when AI
                agents access it, while keeping it free for human developers. Here's
                how to get started.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Prerequisites</h2>
              <ul className="space-y-3 text-white/60">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  A documentation site (Next.js, Docusaurus, or similar)
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  A crypto wallet address to receive payments (Base network)
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  Node.js 18+ installed
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Step 1: Install the package</h2>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-white/40 ml-2 font-mono">terminal</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto bg-transparent border-0">
                  <code className="text-emerald-400">npm install x402-middleware</code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Step 2: Create configuration file</h2>
              <p className="text-white/60 mb-4">
                Create <code className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">x402.config.ts</code> in your project root:
              </p>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-white/40 ml-2 font-mono">x402.config.ts</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto bg-transparent border-0">
                  <code className="text-gray-300">{`// x402.config.ts
export const x402Config = {
  // Your wallet address (Base network)
  wallet: "0xYourWalletAddress",

  // Humans are always free
  humanAccess: "free",

  // AI pays per request
  aiPricing: {
    "/docs/**": 0.01,           // $0.01 per request
    "/api-reference/**": 0.02,  // $0.02 for API docs
  },
};`}</code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Step 3: Add middleware</h2>
              <p className="text-white/60 mb-4">
                For Next.js, create <code className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">middleware.ts</code>:
              </p>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-white/40 ml-2 font-mono">middleware.ts</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto bg-transparent border-0">
                  <code className="text-gray-300">{`// middleware.ts
import { x402Middleware } from "x402-middleware/next";
import { x402Config } from "./x402.config";

export const middleware = x402Middleware(x402Config);

export const config = {
  matcher: ["/docs/:path*"],
};`}</code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Step 4: Deploy</h2>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-white/40 ml-2 font-mono">terminal</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto bg-transparent border-0">
                  <code className="text-emerald-400">vercel deploy</code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">That's it!</h2>
              <p className="text-white/60 mb-6">
                Your documentation is now set up with x402. Human visitors will access
                everything for free, while AI agents will pay the configured prices.
              </p>

              <div className="glass rounded-2xl p-6 border-emerald-500/20">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                    <ul className="space-y-2 text-white/60 text-sm">
                      <li className="flex gap-2">
                        <span className="text-emerald-400">•</span>
                        Human visitors: Verified via JS challenge → Free access
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-400">•</span>
                        AI agents: Receive 402 response → Pay → Access content
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-400">•</span>
                        Payments go directly to your wallet in USDC
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
              <div className="grid gap-4">
                <Link href="/docs/installation">
                  <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        Detailed installation guide
                      </h3>
                      <p className="text-white/50 text-sm">For your specific framework</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </Link>
                <Link href="/docs/configuration">
                  <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        Configuration options
                      </h3>
                      <p className="text-white/50 text-sm">For advanced pricing rules</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </Link>
                <Link href="/demo">
                  <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        Try the demo
                      </h3>
                      <p className="text-white/50 text-sm">See x402 in action</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
