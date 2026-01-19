import { CheckCircle2, Bot, User, DollarSign } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

// 미들웨어가 항상 실행되도록 동적 렌더링 강제
export const dynamic = "force-dynamic";

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
                <h3 className="text-emerald-400 font-semibold mb-1">접근 허용됨!</h3>
                <p className="text-white/60 text-sm">
                  브라우저 검증을 통과하여 이 콘텐츠를 무료로 보고 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              x402 통합 가이드
            </h1>
            <p className="text-lg text-white/60">
              Next.js 미들웨어에 x402 결제 보호를 추가하는 방법을 알아봅니다.
            </p>
          </div>

          <div className="h-px bg-white/10 mb-12" />

          {/* Content */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. 환경 변수 설정</h2>
              <p className="text-white/60 mb-6">
                x402 결제를 받으려면 지갑 주소와 네트워크를 설정해야 합니다.
              </p>
              <CodeBlock
                code={`# .env.local
X402_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f...
X402_NETWORK=base-sepolia  # 또는 base (메인넷)
X402_SECRET_KEY=your-secret-key-for-human-verification`}
                language="bash"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. 미들웨어 핵심 로직</h2>
              <p className="text-white/60 mb-6">
                402 응답을 생성하는 핵심 함수입니다.
              </p>
              <CodeBlock
                code={`// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호할 경로와 가격 설정 (USDC 6 decimals)
const PRICING: Record<string, string> = {
  "/api/premium": "10000",     // $0.01
  "/docs/advanced": "50000",   // $0.05
};

export async function middleware(request: NextRequest) {
  const price = PRICING[request.nextUrl.pathname];
  if (!price) return NextResponse.next();

  // 1. 사람 검증 (쿠키 확인)
  const humanToken = request.cookies.get("x402_human_token");
  if (humanToken && await verifyHumanToken(humanToken.value)) {
    return NextResponse.next(); // 무료 통과
  }

  // 2. 결제 헤더 확인
  const paymentHeader = request.headers.get("x-payment");
  if (!paymentHeader) {
    return create402Response(price, request);
  }

  // 3. 결제 검증 후 콘텐츠 제공
  const isValid = await verifyPayment(paymentHeader, price);
  if (isValid) {
    return NextResponse.next();
  }

  return create402Response(price, request);
}`}
                language="typescript"
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. 402 응답 생성</h2>
              <p className="text-white/60 mb-6">
                x402 프로토콜 v2 형식의 결제 요청 응답입니다.
              </p>
              <CodeBlock
                code={`function create402Response(price: string, request: NextRequest) {
  const paymentRequired = {
    x402Version: 2,
    accepts: [{
      scheme: "exact",
      network: "eip155:84532",  // Base Sepolia (CAIP-2)
      amount: price,
      resource: request.nextUrl.href,
      payTo: process.env.X402_WALLET_ADDRESS,
      asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC
      extra: { name: "USDC", version: "2" }
    }]
  };

  return new NextResponse(JSON.stringify(paymentRequired), {
    status: 402,
    headers: {
      "Content-Type": "application/json",
      "X-PAYMENT-REQUIRED": btoa(JSON.stringify(paymentRequired))
    }
  });
}`}
                language="typescript"
              />
            </section>

            {/* What AI sees */}
            <div className="glass rounded-2xl p-8 border-amber-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-500/20">
                  <Bot className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-amber-400">
                  AI 에이전트가 받는 응답:
                </h3>
              </div>
              <CodeBlock
                code={`HTTP/1.1 402 Payment Required
Content-Type: application/json
X-PAYMENT-REQUIRED: eyJ4NDAyVmVyc2lvbiI6Mn0...

{
  "x402Version": 2,
  "accepts": [{
    "scheme": "exact",
    "network": "eip155:84532",
    "amount": "10000",
    "payTo": "0x742d35Cc6634C0532925a3b844Bc9e7595f...",
    "asset": "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
  }]
}`}
                language="http"
              />
            </div>

            <section>
              <h3 className="text-xl font-bold text-white mb-6">요약</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="glass rounded-xl p-6">
                  <div className="p-3 rounded-lg bg-emerald-500/20 w-fit mb-4">
                    <User className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">사람</h4>
                  <p className="text-white/50 text-sm">
                    JavaScript 검증으로 무료 접근
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <div className="p-3 rounded-lg bg-amber-500/20 w-fit mb-4">
                    <Bot className="h-6 w-6 text-amber-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">AI 에이전트</h4>
                  <p className="text-white/50 text-sm">
                    x402 프로토콜로 결제 필요
                  </p>
                </div>
                <div className="glass rounded-xl p-6">
                  <div className="p-3 rounded-lg bg-emerald-500/20 w-fit mb-4">
                    <DollarSign className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">메인테이너</h4>
                  <p className="text-white/50 text-sm">
                    AI 사용량에서 수익 창출
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
