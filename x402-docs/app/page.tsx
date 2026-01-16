import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "x402 - AI 시대의 결제 프로토콜 | x402-learn-kr",
  description:
    "HTTP 402 상태 코드를 활용한 인터넷 네이티브 결제 표준. AI 에이전트가 자율적으로 결제할 수 있는 새로운 방식을 한국어로 배워보세요.",
  keywords: ["x402", "HTTP 402", "AI 결제", "마이크로페이먼트", "USDC", "블록체인", "Coinbase"],
  openGraph: {
    title: "x402 - AI 시대의 결제 프로토콜",
    description: "HTTP 402 상태 코드를 활용한 AI 에이전트 결제 프로토콜을 한국어로 배워보세요.",
    type: "website",
    url: "https://x402-learn-kr.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 - AI 시대의 결제 프로토콜",
    description: "HTTP 402 상태 코드를 활용한 AI 에이전트 결제 프로토콜을 한국어로 배워보세요.",
  },
};
import {
  ArrowRight,
  Bot,
  Code2,
  DollarSign,
  Shield,
  Zap,
  Sparkles,
  Play,
  BookOpen,
  Server,
  Building2,
  Smartphone,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-50" />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="container relative z-10 flex flex-col items-center text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-white/80">x402-learn-kr</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-white">AI 시대의</span>
            <br />
            <span className="gradient-text">결제 프로토콜</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg sm:text-xl text-white/60 mb-10 leading-relaxed">
            HTTP 402 상태 코드를 활용한 인터넷 네이티브 결제 표준.
            <br />
            AI 에이전트가 자율적으로 결제할 수 있는 새로운 방식을 배워보세요.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 btn-glow"
              asChild
            >
              <Link href="/learn/what-is-x402">
                x402 알아보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-8"
              asChild
            >
              <Link href="/demo/visualizer">
                <Play className="mr-2 h-4 w-4" />
                결제 플로우 보기
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-16 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">~2초</div>
              <div className="text-sm text-white/50">결제 완료</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">$0.001~</div>
              <div className="text-sm text-white/50">마이크로페이먼트</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">HTTP</div>
              <div className="text-sm text-white/50">네이티브</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is x402 */}
      <section className="py-32 relative">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              x402란?
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              HTTP 402 "Payment Required" 상태 코드를 활용한 오픈 결제 프로토콜
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">핵심 아이디어</h3>
                <ul className="space-y-3 text-white/60">
                  <li className="flex gap-3">
                    <span className="text-emerald-400">•</span>
                    서버가 402 응답으로 결제 정보 전달
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">•</span>
                    클라이언트가 USDC로 서명 생성
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">•</span>
                    퍼실리테이터가 서명 검증 및 정산
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400">•</span>
                    콘텐츠 즉시 제공
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">주요 특징</h3>
                <ul className="space-y-3 text-white/60">
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    계정/API 키 불필요
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    EIP-712 표준 서명
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    Base 체인 (L2) 저렴한 가스비
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-400">•</span>
                    AI 에이전트 자율 결제 가능
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                asChild
              >
                <Link href="/learn/what-is-x402">
                  자세히 알아보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="py-32 relative">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              핵심 구성 요소
            </h2>
            <p className="text-lg text-white/50">
              x402 프로토콜을 구성하는 세 가지 역할
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass glass-hover rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">클라이언트</h3>
              <p className="text-white/50 text-sm">
                결제 요청을 보내고 EIP-712 서명을 생성하는 주체. AI 에이전트 또는 브라우저.
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                <Server className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">리소스 서버</h3>
              <p className="text-white/50 text-sm">
                유료 콘텐츠를 제공하는 서버. 402 응답으로 결제 정보를 전달.
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">퍼실리테이터</h3>
              <p className="text-white/50 text-sm">
                서명을 검증하고 온체인 정산을 처리하는 중개자. Coinbase 등이 운영.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
              asChild
            >
              <Link href="/learn/components">
                구성 요소 자세히 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Protocol Flow Preview */}
      <section className="py-32 relative">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              결제 플로우
            </h2>
            <p className="text-lg text-white/50">
              x402 프로토콜의 핵심 흐름
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-400">1</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">요청</h4>
                  <p className="text-sm text-white/50">GET /api/data</p>
                </div>

                <ArrowRight className="h-6 w-6 text-white/30 rotate-90 md:rotate-0" />

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-amber-400">2</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">402 응답</h4>
                  <p className="text-sm text-white/50">결제 정보 포함</p>
                </div>

                <ArrowRight className="h-6 w-6 text-white/30 rotate-90 md:rotate-0" />

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-purple-400">3</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">서명</h4>
                  <p className="text-sm text-white/50">EIP-712 서명</p>
                </div>

                <ArrowRight className="h-6 w-6 text-white/30 rotate-90 md:rotate-0" />

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-emerald-400">4</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">완료</h4>
                  <p className="text-sm text-white/50">콘텐츠 수신</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                  asChild
                >
                  <Link href="/demo/visualizer">
                    <Play className="mr-2 h-4 w-4" />
                    애니메이션으로 자세히 보기
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why x402 */}
      <section className="py-32 relative">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              왜 x402인가?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="glass glass-hover rounded-2xl p-8">
              <DollarSign className="h-12 w-12 text-emerald-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">마이크로페이먼트</h3>
              <p className="text-white/50">
                $0.001부터 가능한 초소액 결제. Base 체인의 낮은 가스비로 실현 가능해졌습니다.
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-8">
              <Shield className="h-12 w-12 text-blue-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">계정 불필요</h3>
              <p className="text-white/50">
                회원가입, 로그인, API 키 없이 암호화 서명만으로 결제가 완료됩니다.
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-8">
              <Code2 className="h-12 w-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">HTTP 네이티브</h3>
              <p className="text-white/50">
                기존 HTTP 인프라 위에서 작동. 특별한 SDK 없이도 구현 가능합니다.
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-8">
              <Zap className="h-12 w-12 text-yellow-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">즉시 정산</h3>
              <p className="text-white/50">
                신용카드의 며칠 정산과 달리, ~2초 만에 온체인 최종 확정됩니다.
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-8">
              <Bot className="h-12 w-12 text-pink-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">AI 에이전트 최적화</h3>
              <p className="text-white/50">
                AI가 자율적으로 결제할 수 있는 구조. MCP, Agent-to-Agent 결제 지원.
              </p>
            </div>
            <div className="glass glass-hover rounded-2xl p-8">
              <Sparkles className="h-12 w-12 text-cyan-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">오픈 프로토콜</h3>
              <p className="text-white/50">
                Coinbase가 주도하고, 다양한 기업이 지원하는 개방형 표준입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-32 relative">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              학습 경로
            </h2>
            <p className="text-lg text-white/50">
              단계별로 x402를 배워보세요
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Link href="/learn/what-is-x402" className="block">
              <div className="glass glass-hover rounded-2xl p-6 h-full border-l-4 border-emerald-500">
                <div className="text-emerald-400 font-mono text-sm mb-2">Step 1</div>
                <h3 className="text-lg font-semibold text-white mb-2">x402란?</h3>
                <p className="text-white/50 text-sm">
                  프로토콜 개요와 탄생 배경
                </p>
              </div>
            </Link>
            <Link href="/learn/how-it-works" className="block">
              <div className="glass glass-hover rounded-2xl p-6 h-full border-l-4 border-blue-500">
                <div className="text-blue-400 font-mono text-sm mb-2">Step 2</div>
                <h3 className="text-lg font-semibold text-white mb-2">작동 원리</h3>
                <p className="text-white/50 text-sm">
                  결제 플로우 상세 설명
                </p>
              </div>
            </Link>
            <Link href="/learn/eip712" className="block">
              <div className="glass glass-hover rounded-2xl p-6 h-full border-l-4 border-purple-500">
                <div className="text-purple-400 font-mono text-sm mb-2">Step 3</div>
                <h3 className="text-lg font-semibold text-white mb-2">EIP-712 서명</h3>
                <p className="text-white/50 text-sm">
                  타입 구조화 데이터 서명
                </p>
              </div>
            </Link>
            <Link href="/learn/ecosystem" className="block">
              <div className="glass glass-hover rounded-2xl p-6 h-full border-l-4 border-amber-500">
                <div className="text-amber-400 font-mono text-sm mb-2">Step 4</div>
                <h3 className="text-lg font-semibold text-white mb-2">생태계</h3>
                <p className="text-white/50 text-sm">
                  지원 기업 및 활용 사례
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
        <div className="container px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-8">
              <BookOpen className="h-12 w-12 text-emerald-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              지금 시작하세요
            </h2>
            <p className="text-lg text-white/50 mb-10">
              x402 프로토콜을 배우고, 데모를 통해 직접 체험해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 btn-glow"
                asChild
              >
                <Link href="/learn">
                  <BookOpen className="mr-2 h-4 w-4" />
                  학습 시작하기
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-8"
                asChild
              >
                <Link href="/demo">
                  <Play className="mr-2 h-4 w-4" />
                  데모 체험하기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
