import { CheckCircle2, Bot, User, DollarSign, Zap } from "lucide-react";

export default function ProtectedContentPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10 max-w-4xl px-4">
          {/* Success Alert */}
          <div className="glass rounded-2xl p-6 border-emerald-500/30 mb-12">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-emerald-400 font-semibold mb-1">Access Granted!</h3>
                <p className="text-white/60 text-sm">
                  You're viewing this as a verified human. This content is free for you.
                </p>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Protected Documentation
            </h1>
            <p className="text-lg text-white/60">
              This page demonstrates x402 protection. You're seeing it because you're
              a human (verified via JavaScript).
            </p>
          </div>

          <div className="h-px bg-white/10 mb-12" />

          {/* Content */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Secret API Documentation</h2>
              <p className="text-white/60 mb-6">
                This is premium content that AI agents would need to pay $0.01 to
                access. As a human, you see it for free!
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Advanced Configuration</h3>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-sm text-white/40 ml-2 font-mono">config.json</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto bg-transparent border-0">
                  <code className="text-gray-300">{`{
  "secret_key": "this-is-premium-content",
  "api_endpoint": "https://api.example.com/v2",
  "features": {
    "advanced_analytics": true,
    "custom_webhooks": true,
    "priority_support": true
  }
}`}</code>
                </pre>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Enterprise Integration Guide</h3>
              <p className="text-white/60 mb-4">
                To integrate with enterprise systems, follow these steps:
              </p>
              <ol className="space-y-3 text-white/60">
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-mono">01</span>
                  Configure your SSO provider
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-mono">02</span>
                  Set up the webhook endpoints
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-mono">03</span>
                  Enable audit logging
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-mono">04</span>
                  Configure rate limiting policies
                </li>
              </ol>
            </section>

            {/* What AI sees */}
            <div className="glass rounded-2xl p-8 border-amber-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Bot className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-amber-400">
                  What AI agents see instead:
                </h3>
              </div>
              <div className="glass rounded-xl overflow-hidden">
                <pre className="p-6 text-sm overflow-x-auto">
                  <code className="text-gray-300">{`HTTP/1.1 402 Payment Required
X-PAYMENT-REQUIRED: base64-encoded-payment-details

{
  "error": "Payment Required",
  "message": "AI agents must pay $0.01 USDC",
  "price": 0.01,
  "network": "Base",
  "token": "USDC"
}`}</code>
                </pre>
              </div>
            </div>

            <section>
              <h3 className="text-xl font-bold text-white mb-6">Conclusion</h3>
              <p className="text-white/60 mb-6">
                This demonstrates how x402 for Open Source works:
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="glass rounded-xl p-6">
                  <div className="p-3 rounded-lg bg-emerald-500/20 w-fit mb-4">
                    <User className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Humans</h4>
                  <p className="text-white/50 text-sm">
                    Free access, verified via JavaScript
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <div className="p-3 rounded-lg bg-amber-500/20 w-fit mb-4">
                    <Bot className="h-6 w-6 text-amber-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">AI Agents</h4>
                  <p className="text-white/50 text-sm">
                    Must pay via x402 protocol
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <div className="p-3 rounded-lg bg-emerald-500/20 w-fit mb-4">
                    <DollarSign className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Maintainers</h4>
                  <p className="text-white/50 text-sm">
                    Earn revenue from AI usage
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
