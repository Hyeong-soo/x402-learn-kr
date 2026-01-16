"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Smartphone, Server, Building2, Layers, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/learn" className="hover:text-white">학습</Link>
          <span>/</span>
          <span className="text-white">구성 요소</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          구성 요소
        </h1>

        {/* Overview */}
        <div className="glass rounded-2xl p-8 mb-12">
          <p className="text-lg text-white/80 leading-relaxed">
            x402 프로토콜은 4개의 핵심 구성 요소로 이루어져 있습니다.
            각 구성 요소는 명확한 역할을 가지며, 함께 협력하여 안전하고 빠른 결제를 구현합니다.
          </p>
        </div>

        {/* Component 1: Client */}
        <section className="mb-8">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/20">
                  <Smartphone className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">클라이언트 (Client)</h2>
                  <p className="text-emerald-400">결제를 시작하는 주체</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">역할</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    보호된 리소스에 HTTP 요청 전송
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    402 응답 수신 및 결제 요구사항 파싱
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    EIP-712 서명 생성 (지갑 개인키 사용)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    결제 서명과 함께 요청 재전송
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">예시</h3>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• AI 에이전트 (Claude, GPT 등)</li>
                  <li>• 자동화된 스크립트</li>
                  <li>• 웹 애플리케이션</li>
                </ul>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="text-white font-medium mb-2 text-sm">SDK</h3>
                <CodeBlock
                  code={`npm install @x402/fetch @x402/axios
pip install x402  # Python`}
                  language="bash"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Component 2: Resource Server */}
        <section className="mb-8">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="bg-blue-500/10 border-b border-blue-500/20 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Server className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">리소스 서버 (Resource Server)</h2>
                  <p className="text-blue-400">콘텐츠를 제공하는 서버</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">역할</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    결제가 필요한 요청에 402 응답 반환
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    결제 요구사항 정의 (가격, 토큰, 수신 주소)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    퍼실리테이터에 결제 검증 요청
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    검증 완료 후 보호된 콘텐츠 반환
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">구현 방식</h3>
                <ul className="space-y-1 text-white/70 text-sm">
                  <li>• Express/Next.js 미들웨어</li>
                  <li>• Cloudflare Workers</li>
                  <li>• FastAPI/Flask 미들웨어</li>
                </ul>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="text-white font-medium mb-2 text-sm">SDK</h3>
                <CodeBlock
                  code={`npm install @x402/express @x402/next @x402/hono
pip install x402[fastapi]  # Python`}
                  language="bash"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Component 3: 퍼실리테이터 */}
        <section className="mb-8">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="bg-purple-500/10 border-b border-purple-500/20 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <Building2 className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">퍼실리테이터</h2>
                  <p className="text-purple-400">결제 검증 및 온체인 정산 담당</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">역할</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    결제 서명 유효성 오프체인 검증 (~100ms)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    블록체인에 트랜잭션 제출 (가스비 대납)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    정산 결과를 서버에 반환
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    사기 방지 및 리스크 관리
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">주요 퍼실리테이터</h3>
                <div className="grid grid-cols-2 gap-2">
                  <a href="https://docs.cdp.coinbase.com/x402" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-purple-400 transition-colors">
                    <span>Coinbase CDP</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://x402.org/facilitator" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-purple-400 transition-colors">
                    <span>x402.org</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://payai.network" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-purple-400 transition-colors">
                    <span>PayAI</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="text-white font-medium mb-2 text-sm">API 엔드포인트</h3>
                <CodeBlock
                  code={`POST /verify   - 서명 검증
POST /settle   - 온체인 정산`}
                  language="http"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Component 4: Blockchain */}
        <section className="mb-12">
          <div className="glass rounded-2xl overflow-hidden">
            <div className="bg-amber-500/10 border-b border-amber-500/20 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/20">
                  <Layers className="h-8 w-8 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">블록체인</h2>
                  <p className="text-amber-400">최종 정산 레이어</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">역할</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    USDC 토큰 전송 실행
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    서명 검증 (transferWithAuthorization)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    거래 기록의 불변성 보장
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">지원 네트워크</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-white/50 border-b border-white/10">
                        <th className="text-left py-2">네트워크</th>
                        <th className="text-left py-2">CAIP-2 ID</th>
                        <th className="text-left py-2">토큰</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      <tr className="border-b border-white/5">
                        <td className="py-2">Base Mainnet</td>
                        <td className="py-2 font-mono text-xs">eip155:8453</td>
                        <td className="py-2">USDC</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">Base Sepolia</td>
                        <td className="py-2 font-mono text-xs">eip155:84532</td>
                        <td className="py-2">USDC (테스트)</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">Ethereum</td>
                        <td className="py-2 font-mono text-xs">eip155:1</td>
                        <td className="py-2">USDC</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2">Solana</td>
                        <td className="py-2 font-mono text-xs">solana:5eykt4...</td>
                        <td className="py-2">SPL USDC</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">전체 아키텍처</h2>
          <CodeBlock
            code={`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   클라이언트     │     │   리소스 서버    │     │   퍼실리테이터   │
│   (AI Agent)    │     │   (API Server)  │     │   (검증/정산)    │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │  1. GET /resource     │                       │
         │──────────────────────>│                       │
         │                       │                       │
         │  2. 402 + 결제정보    │                       │
         │<──────────────────────│                       │
         │                       │                       │
         │  3. 서명 생성         │                       │
         │  (로컬)               │                       │
         │                       │                       │
         │  4. GET + 서명        │                       │
         │──────────────────────>│                       │
         │                       │  5. 검증 요청         │
         │                       │──────────────────────>│
         │                       │                       │  6. 온체인 정산
         │                       │                       │─────────────────┐
         │                       │                       │                 │
         │                       │                       │<────────────────┘
         │                       │  검증 완료            │
         │                       │<──────────────────────│
         │  7. 200 + 콘텐츠      │                       │
         │<──────────────────────│                       │
         │                       │                       │`}
            language="text"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn/how-it-works">
              <ArrowLeft className="mr-2 h-4 w-4" />
              작동 원리
            </Link>
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <Link href="/learn/eip712">
              EIP-712 서명
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
