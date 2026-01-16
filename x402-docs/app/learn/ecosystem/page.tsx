"use client";

import Link from "next/link";
import { ArrowLeft, Globe, Building2, Code, Layers, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

// Language Icons
const TypeScriptIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5">
    <path fill="#3178c6" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"/>
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5">
    <linearGradient id="python-a" x1="70.252" x2="170.659" y1="1237.476" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#5A9FD4"/>
      <stop offset="1" stopColor="#306998"/>
    </linearGradient>
    <linearGradient id="python-b" x1="209.474" x2="173.62" y1="1098.811" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#FFD43B"/>
      <stop offset="1" stopColor="#FFE873"/>
    </linearGradient>
    <path fill="url(#python-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
    <path fill="url(#python-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
  </svg>
);

const GoIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5">
    <path fill="#00acd7" d="M18.8 51.5c-.2 0-.4-.2-.2-.4l1.3-1.7c.2-.2.5-.4.8-.4h21.6c.2 0 .4.2.2.4l-1 1.6c-.2.2-.5.5-.8.5l-21.9-.1zm-9.5 5.8c-.2 0-.4-.2-.2-.4l1.3-1.7c.2-.2.5-.4.8-.4h27.6c.2 0 .4.2.3.5l-.5 1.5c0 .3-.3.5-.6.5l-28.7.1zm15.3 5.8c-.2 0-.4-.2-.2-.5l.9-1.6c.2-.3.5-.5.8-.5h12.1c.2 0 .4.2.4.5l-.1 1.5c0 .3-.2.5-.5.5l-13.4.1zm63.4-11.4l-15.8 4c-.7.2-1 .5-1 1 0 .6.2 1.1.5 1.7.4.8.9 1.6 1.4 2.2.5.7 1.1 1.4 1.6 2.1.5.7.9 1.3 1.4 1.8.3.4.7.8 1.1 1.1.4.4.9.7 1.4 1 .5.3 1.1.5 1.7.6.6.2 1.2.3 1.8.3.6 0 1.3-.1 1.9-.2.6-.1 1.2-.3 1.8-.6.6-.3 1.1-.6 1.6-1 .5-.4.9-.8 1.3-1.3.4-.5.7-1 .9-1.5.2-.5.4-1.1.5-1.7.1-.6.2-1.2.2-1.8 0-.6-.1-1.2-.2-1.8-.1-.6-.4-1.2-.6-1.8-.3-.6-.6-1.1-.9-1.6-.4-.5-.8-1-1.2-1.4-.4-.4-.9-.8-1.4-1.1-.5-.3-1-.6-1.5-.8-.5-.2-1.1-.4-1.6-.5-.6-.1-1.1-.2-1.7-.2h-3.4zm2.3 12.7c-1.8-.3-2.9-1.7-2.4-3.4.4-1.4 1.5-2.1 3-2.1 1.6 0 2.8.8 3.1 2.2.3 1.7-.9 3.3-3.7 3.3zm26.3-16.5c-.6.2-1.1.4-1.7.6-1.6.7-3 1.7-4.1 3-.2.3-.4.5-.6.8-.2.3-.4.6-.5 1-.1.3-.3.7-.4 1-.1.3-.2.7-.2 1 0 .7.1 1.3.4 1.9.3.6.7 1.1 1.2 1.5.5.4 1.1.7 1.8.9.7.2 1.4.3 2.1.2.7-.1 1.4-.3 2-.6.6-.3 1.2-.7 1.6-1.2.5-.5.9-1.1 1.2-1.7.3-.6.5-1.3.6-2 .1-.7.1-1.4 0-2.1-.1-.7-.3-1.4-.6-2-.3-.6-.7-1.1-1.2-1.6-.5-.5-1-.8-1.6-1.1-.6-.3-1.2-.4-1.9-.5-.7-.1-1.4-.1-2.1 0z"/>
  </svg>
);

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
                  <TypeScriptIcon /> TypeScript / JavaScript
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
                  <PythonIcon /> Python
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
                  <GoIcon /> Go
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
              USDC 가스리스 전송
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
