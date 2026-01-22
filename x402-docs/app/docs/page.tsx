import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Cog,
  Download,
  DollarSign,
  BarChart3,
  Lightbulb,
  ArrowRight,
  Zap,
  Code,
  Server,
  Terminal,
  ExternalLink,
  Globe,
  Package,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const BASE_URL = "https://learn402.xyz";
const PAGE_URL = `${BASE_URL}/docs`;

export const metadata: Metadata = {
  title: "개발 문서",
  description:
    "x402 프로토콜을 프로젝트에 통합하기 위한 가이드와 레퍼런스. Express, Next.js 미들웨어 설정부터 커스텀 가격 전략까지.",
  keywords: ["x402 SDK", "x402 문서", "Express 미들웨어", "Next.js x402", "API 결제"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 개발 문서",
    description: "x402 프로토콜을 프로젝트에 통합하기 위한 가이드와 레퍼런스.",
    type: "website",
    url: PAGE_URL,
    images: [`${BASE_URL}/docs/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 개발 문서",
    description: "x402 프로토콜을 프로젝트에 통합하기 위한 가이드와 레퍼런스.",
    images: [`${BASE_URL}/docs/opengraph-image`],
  },
};
import { CodeBlock } from "@/components/CodeBlock";

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10 max-w-5xl px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-white/80">기술 문서</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              개발 문서
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              x402 프로토콜을 프로젝트에 통합하기 위한 가이드와 레퍼런스입니다.
            </p>
          </div>

          {/* Quick Start Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-mono">
                시작하기
              </span>
              <h2 className="text-2xl font-bold text-white">빠른 시작</h2>
            </div>
            <div className="grid gap-4">
              <Link href="/docs/getting-started">
                <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-emerald-500/20">
                      <Zap className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        빠른 시작 가이드
                      </h3>
                      <p className="text-white/50 text-sm">
                        5분 안에 x402를 프로젝트에 통합하는 방법을 알아보세요.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
                </div>
              </Link>

              <a
                href="https://github.com/coinbase/x402"
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      <Download className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        설치 가이드
                      </h3>
                      <p className="text-white/50 text-sm">
                        공식 SDK GitHub에서 프레임워크별 설치 방법 확인
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-white/30 group-hover:text-blue-400 transition-colors" />
                </div>
              </a>

              <a
                href="https://docs.cdp.coinbase.com/x402/docs/configuration"
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/20">
                      <Cog className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                        설정
                      </h3>
                      <p className="text-white/50 text-sm">
                        가격, 지갑, 접근 규칙 설정 방법 (공식 문서)
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-white/30 group-hover:text-purple-400 transition-colors" />
                </div>
              </a>
            </div>
          </div>

          {/* Code Examples Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-mono">
                코드
              </span>
              <h2 className="text-2xl font-bold text-white">코드 예제</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="h-5 w-5 text-blue-400" />
                  <h3 className="text-white font-semibold">서버 (Express)</h3>
                </div>
                <CodeBlock
                  code={`import { paymentMiddleware } from "@x402/express";

// 경로별 결제 요구사항 정의
app.use(paymentMiddleware({
  "GET /api/premium": {
    price: "$0.01",
    network: "base-sepolia",
    payTo: "0x...",
    description: "Premium API endpoint"
  }
}));`}
                  language="typescript"
                />
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-white font-semibold">클라이언트</h3>
                </div>
                <CodeBlock
                  code={`import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";

// 클라이언트 설정 및 EVM 체인 등록
const client = new x402Client();
registerExactEvmScheme(client, { signer: evmWallet });

// fetch를 결제 기능으로 감싸기
const payFetch = wrapFetchWithPayment(fetch, client);
await payFetch("/api/premium");`}
                  language="typescript"
                />
              </div>
            </div>
          </div>

          {/* V2 SDK Packages */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-mono">
                V2
              </span>
              <h2 className="text-2xl font-bold text-white">SDK 패키지</h2>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5 text-purple-400" />
                    <h4 className="text-white font-medium">코어 패키지</h4>
                  </div>
                  <div className="space-y-2">
                    <code className="block text-emerald-400 bg-black/30 px-3 py-2 rounded text-sm font-mono">@x402/core</code>
                    <code className="block text-blue-400 bg-black/30 px-3 py-2 rounded text-sm font-mono">@x402/evm</code>
                    <code className="block text-purple-400 bg-black/30 px-3 py-2 rounded text-sm font-mono">@x402/svm</code>
                    <code className="block text-amber-400 bg-black/30 px-3 py-2 rounded text-sm font-mono">@x402/paywall</code>
                  </div>
                  <p className="text-white/40 text-xs mt-3">
                    EVM 체인, Solana, 세션 기반 접근 지원
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="h-5 w-5 text-blue-400" />
                    <h4 className="text-white font-medium">프레임워크 통합</h4>
                  </div>
                  <div className="space-y-2">
                    <code className="block text-emerald-400 bg-black/30 px-3 py-2 rounded text-sm font-mono">@x402/express</code>
                    <code className="block text-blue-400 bg-black/30 px-3 py-2 rounded text-sm font-mono">@x402/next</code>
                    <code className="block text-purple-400 bg-black/30 px-3 py-2 rounded text-sm font-mono">@x402/hono</code>
                    <code className="block text-amber-400 bg-black/30 px-3 py-2 rounded text-sm font-mono">@x402/fetch · @x402/axios</code>
                  </div>
                  <p className="text-white/40 text-xs mt-3">
                    Express, Next.js, Hono 미들웨어 및 클라이언트 래퍼
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-mono">
                AI: $0.01
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-sm">
                사람: 무료
              </span>
              <h2 className="text-2xl font-bold text-white">고급</h2>
            </div>
            <div className="grid gap-4">
              <Link href="/docs/advanced/custom-pricing">
                <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group border-amber-500/20">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-amber-500/20">
                      <DollarSign className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                        커스텀 가격 전략
                      </h3>
                      <p className="text-white/50 text-sm">
                        콘텐츠 유형과 사용량에 따른 동적 가격 책정
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-mono">
                    $0.01
                  </span>
                </div>
              </Link>

              <Link href="/docs/advanced/analytics">
                <div className="glass glass-hover rounded-xl p-6 flex items-center justify-between group border-amber-500/20">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-amber-500/20">
                      <BarChart3 className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                        분석 및 수익 추적
                      </h3>
                      <p className="text-white/50 text-sm">
                        AI 사용 패턴과 수익 지표 추적 방법
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-mono">
                    $0.01
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* External Resources */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">외부 리소스</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://x402.org"
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover rounded-xl p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/20">
                    <Globe className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      x402.org
                    </h3>
                    <p className="text-white/50 text-sm">공식 프로토콜 포털</p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-white/30 group-hover:text-emerald-400" />
              </a>

              <a
                href="https://docs.cdp.coinbase.com/x402/welcome"
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover rounded-xl p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <BookOpen className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      Coinbase 공식 문서
                    </h3>
                    <p className="text-white/50 text-sm">x402 SDK 문서 (영문)</p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-white/30 group-hover:text-blue-400" />
              </a>

              <a
                href="https://x402.gitbook.io/x402"
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover rounded-xl p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <BookOpen className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                      GitBook 문서
                    </h3>
                    <p className="text-white/50 text-sm">상세 기술 문서 및 스펙</p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-white/30 group-hover:text-purple-400" />
              </a>

              <a
                href="https://github.com/coinbase/x402"
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover rounded-xl p-6 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white/10">
                    <Code className="h-6 w-6 text-white/70" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-white/80 transition-colors">
                      GitHub 저장소
                    </h3>
                    <p className="text-white/50 text-sm">SDK 소스 코드 및 예제</p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-white/30 group-hover:text-white/70" />
              </a>
            </div>
          </div>

          {/* Common Misconceptions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">자주 묻는 오해</h2>
            <div className="grid gap-4">
              <div className="glass rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-2">&quot;x402는 암호화폐 토큰이다&quot;</h4>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-white/60 text-sm">
                        x402는 <span className="text-emerald-400">오픈 프로토콜</span>입니다.
                        자체 토큰 없이 USDC 같은 기존 스테이블코인을 결제 수단으로 사용합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-2">&quot;복잡한 블록체인 인프라가 필요하다&quot;</h4>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-white/60 text-sm">
                        x402는 <span className="text-emerald-400">HTTP 미들웨어</span>로 작동합니다.
                        퍼실리테이터가 블록체인 복잡성을 처리하므로 개발자는 npm 패키지 설치만으로 시작할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-2">&quot;모든 결제마다 온체인 트랜잭션이 발생한다&quot;</h4>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-white/60 text-sm">
                        x402는 <span className="text-emerald-400">메타 트랜잭션</span>을 사용합니다.
                        클라이언트는 서명만 전달하고, 실제 온체인 정산은 퍼실리테이터가 배치 처리할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/20 shrink-0">
                <Lightbulb className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">가격 정책 안내</h3>
                <div className="space-y-3 text-white/60">
                  <p>
                    <span className="text-emerald-400 font-semibold">사람:</span> 모든 문서는 사람에게 무료입니다.
                    브라우저에서 JavaScript 검증을 통해 사람임을 확인합니다.
                  </p>
                  <p>
                    <span className="text-amber-400 font-semibold">AI 에이전트:</span> Claude, GPT, Cursor 등
                    AI 도구가 문서에 접근하면{" "}
                    <code className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      402 Payment Required
                    </code>{" "}
                    응답을 받고 소액의 USDC를 결제해야 콘텐츠에 접근할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
