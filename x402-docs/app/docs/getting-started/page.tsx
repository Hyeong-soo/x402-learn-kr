import Link from "next/link";
import { CheckCircle2, ArrowRight, Zap, Terminal, FileCode, Rocket, ExternalLink } from "lucide-react";
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

        {/* Notice */}
        <div className="glass rounded-xl p-6 mb-12 border border-purple-500/30">
          <p className="text-white/80">
            <strong className="text-purple-400">참고:</strong> 이 가이드의 코드는 개념적 구현 예시입니다.
            실제 프로젝트에서는{" "}
            <a href="https://github.com/coinbase/x402" target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-emerald-300">
              공식 SDK
            </a>
            를 사용하세요.
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
                  <h4 className="text-white font-medium">문서 사이트</h4>
                  <p className="text-white/60 text-sm">Next.js, Docusaurus, 또는 유사한 프레임워크로 만든 사이트</p>
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
            <CodeBlock code="npm install x402-next" language="bash" />
          </div>

          {/* Step 2 */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <FileCode className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <span className="text-purple-400 text-sm font-mono">Step 2</span>
                <h3 className="text-white font-semibold">설정 파일 생성</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              프로젝트 루트에 <code className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">x402.config.ts</code> 생성:
            </p>
            <CodeBlock
              code={`// x402.config.ts
// x402 설정 파일 - 가격과 결제 정책을 정의합니다.

export const x402Config = {
  // 결제를 받을 지갑 주소 (Base 네트워크)
  wallet: "0xYourWalletAddress",

  // 사람(브라우저)은 무료 접근
  humanAccess: "free",

  // AI 에이전트 가격 (경로별 USDC)
  aiPricing: {
    "/docs/**": 0.01,          // 일반 문서: $0.01
    "/api-reference/**": 0.02, // API 레퍼런스: $0.02
  },
};`}
              language="typescript"
            />
          </div>

          {/* Step 3 */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <FileCode className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <span className="text-amber-400 text-sm font-mono">Step 3</span>
                <h3 className="text-white font-semibold">미들웨어 추가</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Next.js의 경우 <code className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">middleware.ts</code> 생성:
            </p>
            <CodeBlock
              code={`// middleware.ts
import { x402Middleware } from "x402-next";
import { x402Config } from "./x402.config";

// 미들웨어가 요청을 분석하여:
// - 브라우저(사람) → 무료 통과
// - AI 에이전트 → 402 응답 반환
export const middleware = x402Middleware(x402Config);

export const config = {
  matcher: ["/docs/:path*"],
};`}
              language="typescript"
            />
          </div>

          {/* Step 4 */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Rocket className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-emerald-400 text-sm font-mono">Step 4</span>
                <h3 className="text-white font-semibold">배포</h3>
              </div>
            </div>
            <CodeBlock code="vercel deploy" language="bash" />
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
                  이제 문서 사이트에 x402가 적용되었습니다. 접근 방식에 따라 다르게 동작합니다:
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
