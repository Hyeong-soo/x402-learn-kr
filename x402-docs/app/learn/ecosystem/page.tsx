"use client";

import Link from "next/link";
import { ArrowLeft, Globe, Building2, Code, Layers, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EcosystemPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/learn" className="hover:text-white">학습</Link>
          <span>/</span>
          <span className="text-white">생태계</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          생태계
        </h1>

        {/* Overview */}
        <div className="glass rounded-2xl p-8 mb-12">
          <p className="text-lg text-white/80 leading-relaxed">
            x402는 오픈 프로토콜로, 다양한 SDK, 퍼실리테이터, 도구들이 활발하게 개발되고 있습니다.
            주요 생태계 구성 요소들을 소개합니다.
          </p>
        </div>

        {/* Official SDKs */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Code className="h-6 w-6 text-emerald-400" />
            공식 SDK
          </h2>

          <div className="space-y-4">
            {/* TypeScript */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <span className="text-xl">🟨</span> TypeScript / JavaScript
                </h3>
                <a
                  href="https://github.com/coinbase/x402"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
              <p className="text-white/60 text-sm mb-4">
                가장 완성도 높은 SDK입니다. 클라이언트, 서버, 프레임워크 통합을 모두 지원합니다.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-xs space-y-2">
                <div className="text-white/50"># 코어 패키지</div>
                <div className="text-emerald-400">npm install @x402/core @x402/evm @x402/svm</div>
                <div className="text-white/50 mt-3"># 서버 프레임워크</div>
                <div className="text-emerald-400">npm install @x402/express @x402/next @x402/hono</div>
                <div className="text-white/50 mt-3"># 클라이언트</div>
                <div className="text-emerald-400">npm install @x402/fetch @x402/axios @x402/paywall</div>
              </div>
            </div>

            {/* Python */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <span className="text-xl">🐍</span> Python
                </h3>
                <a
                  href="https://pypi.org/project/x402/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  PyPI
                </a>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Python 3.10 이상 지원. FastAPI, Flask, httpx, requests 통합을 제공합니다.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-xs">
                <div className="text-emerald-400">pip install x402</div>
                <div className="text-emerald-400 mt-2">pip install x402[fastapi]  # FastAPI 미들웨어</div>
              </div>
            </div>

            {/* Go */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <span className="text-xl">🐹</span> Go
                </h3>
                <a
                  href="https://github.com/coinbase/x402/tree/main/go"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Go 언어 SDK. 고성능 서버 구현에 적합합니다.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-xs">
                <div className="text-emerald-400">go get github.com/coinbase/x402/go</div>
              </div>
            </div>
          </div>
        </section>

        {/* 퍼실리테이터s */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Building2 className="h-6 w-6 text-emerald-400" />
            퍼실리테이터s
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-sm">CB</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Coinbase CDP</h3>
                  <span className="text-white/50 text-xs">공식 퍼실리테이터</span>
                </div>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Coinbase Developer Platform에서 제공하는 공식 퍼실리테이터입니다.
                Base 네트워크에 최적화되어 있습니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>지원 네트워크</span>
                  <span className="text-emerald-400">Base, Ethereum</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>지원 토큰</span>
                  <span className="text-emerald-400">USDC</span>
                </div>
              </div>
              <a
                href="https://docs.cdp.coinbase.com/x402"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm mt-4"
              >
                문서 보기 <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-sm">x4</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">x402.org</h3>
                  <span className="text-white/50 text-xs">커뮤니티 퍼실리테이터</span>
                </div>
              </div>
              <p className="text-white/60 text-sm mb-4">
                커뮤니티에서 운영하는 오픈 퍼실리테이터입니다.
                다양한 네트워크를 지원합니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>지원 네트워크</span>
                  <span className="text-emerald-400">Base, Polygon, +</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>지원 토큰</span>
                  <span className="text-emerald-400">USDC</span>
                </div>
              </div>
              <a
                href="https://x402.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm mt-4"
              >
                웹사이트 <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-sm">PA</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">PayAI</h3>
                  <span className="text-white/50 text-xs">AI 특화 퍼실리테이터</span>
                </div>
              </div>
              <p className="text-white/60 text-sm mb-4">
                AI 에이전트 결제에 특화된 퍼실리테이터입니다.
                Solana 네트워크도 지원합니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>지원 네트워크</span>
                  <span className="text-emerald-400">Solana, Base, Polygon</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>지원 토큰</span>
                  <span className="text-emerald-400">USDC, SPL</span>
                </div>
              </div>
              <a
                href="https://payai.network"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm mt-4"
              >
                웹사이트 <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Supported Networks */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Layers className="h-6 w-6 text-emerald-400" />
            지원 네트워크
          </h2>

          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/50 border-b border-white/10 bg-white/5">
                  <th className="text-left py-3 px-4">네트워크</th>
                  <th className="text-left py-3 px-4">CAIP-2 ID</th>
                  <th className="text-left py-3 px-4">토큰</th>
                  <th className="text-left py-3 px-4">상태</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 font-medium text-white">Base Mainnet</td>
                  <td className="py-3 px-4 font-mono text-xs">eip155:8453</td>
                  <td className="py-3 px-4">USDC</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">✓ 활성</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 font-medium text-white">Base Sepolia</td>
                  <td className="py-3 px-4 font-mono text-xs">eip155:84532</td>
                  <td className="py-3 px-4">USDC (테스트)</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">✓ 활성</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 font-medium text-white">Ethereum Mainnet</td>
                  <td className="py-3 px-4 font-mono text-xs">eip155:1</td>
                  <td className="py-3 px-4">USDC</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">✓ 활성</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 font-medium text-white">Solana Mainnet</td>
                  <td className="py-3 px-4 font-mono text-xs">solana:5eykt4...</td>
                  <td className="py-3 px-4">SPL USDC</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">✓ 활성</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 font-medium text-white">Polygon</td>
                  <td className="py-3 px-4 font-mono text-xs">eip155:137</td>
                  <td className="py-3 px-4">USDC</td>
                  <td className="py-3 px-4"><span className="text-emerald-400">✓ 활성</span></td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 font-medium text-white">Arbitrum</td>
                  <td className="py-3 px-4 font-mono text-xs">eip155:42161</td>
                  <td className="py-3 px-4">USDC</td>
                  <td className="py-3 px-4"><span className="text-amber-400">◐ 일부</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Optimism</td>
                  <td className="py-3 px-4 font-mono text-xs">eip155:10</td>
                  <td className="py-3 px-4">USDC</td>
                  <td className="py-3 px-4"><span className="text-amber-400">◐ 일부</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Globe className="h-6 w-6 text-emerald-400" />
            리소스
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://docs.cdp.coinbase.com/x402/welcome"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  공식 문서
                </h3>
                <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">Coinbase Developer Platform x402 문서</p>
            </a>

            <a
              href="https://github.com/coinbase/x402"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  GitHub 저장소
                </h3>
                <Github className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">공식 SDK 및 예제 코드</p>
            </a>

            <a
              href="https://x402.gitbook.io/x402"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  x402 스펙
                </h3>
                <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">프로토콜 명세서</p>
            </a>

            <a
              href="https://developers.cloudflare.com/agents/x402/"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  Cloudflare 가이드
                </h3>
                <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">Cloudflare Workers 구현 가이드</p>
            </a>
          </div>
        </section>

        {/* CTA */}
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">학습을 완료했습니다!</h2>
          <p className="text-white/60 mb-6">
            이제 데모를 통해 x402가 실제로 어떻게 작동하는지 확인해보세요.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
              <Link href="/demo/visualizer">
                결제 플로우 시각화
              </Link>
            </Button>
            <Button variant="outline" className="border-white/20 text-white" asChild>
              <Link href="/demo/paywall">
                페이월 체험
              </Link>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn/usdc-transfer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              USDC transferWithAuthorization
            </Link>
          </Button>
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn">
              학습 목록으로
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
