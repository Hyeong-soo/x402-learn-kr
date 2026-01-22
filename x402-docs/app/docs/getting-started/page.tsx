import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Terminal, FileCode, Rocket, ExternalLink, Shield, AlertTriangle, Cog } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/docs" className="hover:text-white">문서</Link>
          <span>/</span>
          <span className="text-white">빠른 시작</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Zap className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-white/80">5분 가이드</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            빠른 시작 가이드
          </h1>
          <p className="text-lg text-white/60">
            x402를 프로젝트에 통합하여 AI 에이전트로부터 수익을 창출하세요.
          </p>
        </div>

        {/* SDK Notice */}
        <div className="glass rounded-xl p-6 mb-12 border border-blue-500/30">
          <p className="text-white/80">
            <strong className="text-blue-400">공식 SDK:</strong> 이 가이드는{" "}
            <a href="https://github.com/coinbase/x402" target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-emerald-300">
              @x402 공식 패키지
            </a>
            를 사용합니다. 자세한 API 레퍼런스는{" "}
            <a href="https://docs.cdp.coinbase.com/x402/welcome" target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-emerald-300">
              Coinbase 공식 문서
            </a>
            를 참조하세요.
          </p>
        </div>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            사전 준비
          </h2>
          <div className="glass rounded-xl p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-mono text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">웹 애플리케이션</h4>
                  <p className="text-white/60 text-sm">Next.js, Express, Hono 등 Node.js 기반 프레임워크</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-mono text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">암호화폐 지갑 주소</h4>
                  <p className="text-white/60 text-sm">USDC를 받을 Base 네트워크 지갑 (MetaMask, Coinbase Wallet 등)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 font-mono text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Node.js 18+</h4>
                  <p className="text-white/60 text-sm">최신 LTS 버전 권장</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Steps */}
        <section className="space-y-8">
          {/* Step 1 */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Terminal className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <span className="text-blue-400 text-sm font-mono">Step 1</span>
                <h3 className="text-white font-semibold">패키지 설치</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              사용하는 프레임워크에 맞는 패키지를 설치하세요:
            </p>
            <CodeBlock
              code={`# Next.js 프로젝트
npm install @x402/next

# Express 프로젝트
npm install @x402/express

# Hono 프로젝트
npm install @x402/hono

# 클라이언트 (AI 에이전트 개발 시)
npm install @x402/fetch`}
              language="bash"
            />
          </div>

          {/* Step 2 - Environment Variables */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <FileCode className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-emerald-400 text-sm font-mono">Step 2</span>
                <h3 className="text-white font-semibold">환경 변수 설정</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              <code className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">.env.local</code> 파일에 필수 환경 변수를 설정하세요:
            </p>
            <CodeBlock
              code={`# .env.local

# 네트워크 설정
# 테스트넷 (개발용): base-sepolia
# 메인넷 (프로덕션): base
NETWORK=base-sepolia

# 결제를 받을 지갑 주소
RECEIVING_WALLET_ADDRESS=0xYourWalletAddress

# 퍼실리테이터 URL (선택사항)
# Coinbase CDP 사용 시 별도 설정 불필요
FACILITATOR_URL=https://x402.org/facilitator`}
              language="bash"
            />
            <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-amber-400 text-sm">
                <strong>테스트넷 먼저:</strong> 개발 시에는 <code className="bg-black/30 px-1 rounded">base-sepolia</code>를 사용하세요.
                프로덕션 배포 시 <code className="bg-black/30 px-1 rounded">base</code>로 변경합니다.
              </p>
            </div>
          </div>

          {/* Step 3 - Middleware */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <FileCode className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <span className="text-purple-400 text-sm font-mono">Step 3</span>
                <h3 className="text-white font-semibold">미들웨어 설정 (Next.js)</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              프로젝트 루트에 <code className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">middleware.ts</code> 생성:
            </p>
            <CodeBlock
              code={`// middleware.ts
import { paymentMiddleware } from "@x402/next";

// 환경 변수 로드
const network = process.env.NETWORK || "base-sepolia";
const payTo = process.env.RECEIVING_WALLET_ADDRESS!;
const facilitatorUrl = process.env.FACILITATOR_URL;

// 경로별 결제 요구사항 정의
export const middleware = paymentMiddleware(
  {
    "GET /docs/:path*": {
      price: "$0.01",              // USDC 금액
      network: network,
      description: "문서 접근",
    },
    "GET /api/premium/:path*": {
      price: "$0.02",
      network: network,
      description: "프리미엄 API",
    },
  },
  {
    payTo: payTo,
    facilitatorUrl: facilitatorUrl,
  }
);

export const config = {
  matcher: ["/docs/:path*", "/api/premium/:path*"],
};`}
              language="typescript"
            />
          </div>

          {/* Step 3b - Express Alternative */}
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <FileCode className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <span className="text-blue-400 text-sm font-mono">대안</span>
                <h3 className="text-white font-semibold">Express 서버 설정</h3>
              </div>
            </div>
            <CodeBlock
              code={`// server.ts
import express from "express";
import { paymentMiddleware } from "@x402/express";

const app = express();

// 결제 미들웨어 적용
app.use(paymentMiddleware({
  "GET /api/premium": {
    price: "$0.01",
    network: process.env.NETWORK || "base-sepolia",
    payTo: process.env.RECEIVING_WALLET_ADDRESS!,
    description: "Premium API endpoint",
  },
}));

// 보호된 엔드포인트
app.get("/api/premium", (req, res) => {
  res.json({ data: "Premium content" });
});

app.listen(3000);`}
              language="typescript"
            />
          </div>

          {/* Step 4 */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Rocket className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <span className="text-amber-400 text-sm font-mono">Step 4</span>
                <h3 className="text-white font-semibold">테스트 및 배포</h3>
              </div>
            </div>
            <CodeBlock
              code={`# 로컬 테스트
npm run dev

# 배포 (Vercel)
vercel deploy

# 배포 (기타)
npm run build && npm start`}
              language="bash"
            />
          </div>
        </section>

        {/* Security Notes */}
        <section className="mt-12">
          <div className="glass rounded-xl p-6 border border-red-500/30">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-red-400 shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">보안 주의사항</h3>
                <ul className="space-y-3 text-white/60 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>프라이빗 키를 코드에 절대 하드코딩하지 마세요. 환경 변수를 사용하세요.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>최대 결제 한도(maxPaymentAmount)를 설정하여 예상치 못한 대량 결제를 방지하세요.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>프로덕션 배포 전 테스트넷(base-sepolia)에서 충분히 테스트하세요.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>사용자에게 정확한 비용을 미리 표시하세요 (402 응답의 가격 정보 활용).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Facilitator Setup */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <Cog className="h-6 w-6 text-purple-400" />
            퍼실리테이터 설정 (선택)
          </h2>
          <div className="glass rounded-xl p-6 border border-purple-500/30">
            <p className="text-white/60 mb-4">
              <strong className="text-purple-400">Coinbase CDP 퍼실리테이터</strong>를 사용하면
              Base 메인넷에서 수수료 없이 USDC 정산을 받을 수 있습니다.
            </p>
            <ol className="space-y-3 text-white/60 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-mono">1.</span>
                <span>
                  <a href="https://portal.cdp.coinbase.com" target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-300">
                    Coinbase CDP Portal
                  </a>
                  에서 계정 생성
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-mono">2.</span>
                <span>x402 프로젝트 생성 및 API 키 발급</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-mono">3.</span>
                <span>
                  <code className="text-amber-400 bg-black/30 px-1 rounded">FACILITATOR_URL</code> 환경 변수에 CDP 엔드포인트 설정
                </span>
              </li>
            </ol>
            <div className="mt-4 p-4 rounded-lg bg-emerald-500/10">
              <p className="text-emerald-400 text-sm">
                <strong>팁:</strong> 퍼실리테이터 없이도 x402를 사용할 수 있습니다.
                기본 설정으로 시작하고, 필요시 퍼실리테이터를 추가하세요.
              </p>
            </div>
          </div>
        </section>

        {/* Result */}
        <section className="mt-12">
          <div className="glass rounded-2xl p-8 border border-emerald-500/30">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 shrink-0">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">설정 완료!</h3>
                <p className="text-white/60 mb-6">
                  이제 프로젝트에 x402가 적용되었습니다. 접근 방식에 따라 다르게 동작합니다:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-emerald-400 font-semibold">사람 (브라우저)</span>
                    </div>
                    <p className="text-white/60 text-sm">
                      JavaScript 검증 통과 → 무료 접근
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-400 font-semibold">AI 에이전트</span>
                    </div>
                    <p className="text-white/60 text-sm">
                      402 응답 → USDC 결제 → 콘텐츠 접근
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">다음 단계</h2>
          <div className="grid gap-4">
            <a
              href="https://github.com/coinbase/x402"
              target="_blank"
              rel="noreferrer"
              className="glass glass-hover rounded-xl p-6 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <ExternalLink className="h-5 w-5 text-white/70" />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                    공식 SDK 저장소
                  </h3>
                  <p className="text-white/50 text-sm">프레임워크별 설치 방법과 예제 코드</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
            </a>

            <Link href="/docs/advanced/custom-pricing">
              <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/20">
                    <Zap className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">
                      커스텀 가격 전략
                    </h3>
                    <p className="text-white/50 text-sm">콘텐츠 유형에 따른 동적 가격 책정</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-amber-400 transition-colors" />
              </div>
            </Link>

            <Link href="/demo">
              <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/20">
                    <Rocket className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                      데모 체험
                    </h3>
                    <p className="text-white/50 text-sm">x402 결제 플로우 직접 확인</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/docs">
              ← 문서 목록
            </Link>
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <Link href="/docs/advanced/custom-pricing">
              커스텀 가격 전략 →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
