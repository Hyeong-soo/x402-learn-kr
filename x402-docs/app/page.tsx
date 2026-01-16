import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Code2,
  DollarSign,
  Shield,
  User,
  Zap,
  Sparkles,
  Play,
  BookOpen,
  Eye,
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
            <span className="text-sm text-white/80">x402 프로토콜 한국어 학습 허브</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-white">사람은 무료.</span>
            <br />
            <span className="gradient-text">AI는 결제.</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg sm:text-xl text-white/60 mb-10 leading-relaxed">
            AI 에이전트 시대의 새로운 결제 프로토콜, x402를 배워보세요.
            <br />
            인터랙티브 데모와 시각화로 쉽게 이해할 수 있습니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 btn-glow"
              asChild
            >
              <Link href="/learn">
                학습 시작하기
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
              <div className="text-3xl font-bold text-white">$0.0001</div>
              <div className="text-sm text-white/50">가스비</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">무료</div>
              <div className="text-sm text-white/50">사람은 항상</div>
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
              HTTP 402 상태 코드를 활용한 인터넷 네이티브 결제 프로토콜
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Human Card */}
            <div className="glass glass-hover rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-500/20">
                    <User className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">사람 (브라우저)</h3>
                    <span className="text-emerald-400 font-mono text-sm">무료 접근</span>
                  </div>
                </div>
                <ol className="space-y-3 text-white/60">
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-mono">01</span>
                    웹페이지 방문
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-mono">02</span>
                    JavaScript 자동 실행
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-mono">03</span>
                    "사람 토큰" 발급
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-mono">04</span>
                    24시간 무료 이용
                  </li>
                </ol>
              </div>
            </div>

            {/* AI Card */}
            <div className="glass glass-hover rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-amber-500/20">
                    <Bot className="h-8 w-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">AI 에이전트</h3>
                    <span className="text-amber-400 font-mono text-sm">USDC 결제</span>
                  </div>
                </div>
                <ol className="space-y-3 text-white/60">
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-mono">01</span>
                    HTTP 요청 전송
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-mono">02</span>
                    JS 실행 불가 → 토큰 없음
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-mono">03</span>
                    <code className="text-amber-400">402 Payment Required</code> 응답
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-mono">04</span>
                    x402 결제 후 콘텐츠 수신
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-32 relative">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              시작하기
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link href="/learn" className="block">
              <div className="glass glass-hover rounded-2xl p-8 h-full">
                <BookOpen className="h-12 w-12 text-emerald-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">개념 학습</h3>
                <p className="text-white/50">
                  x402 프로토콜의 핵심 개념과 작동 원리를 한국어로 쉽게 배워보세요.
                </p>
              </div>
            </Link>
            <Link href="/demo/visualizer" className="block">
              <div className="glass glass-hover rounded-2xl p-8 h-full">
                <Eye className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">결제 플로우 시각화</h3>
                <p className="text-white/50">
                  실제 결제 과정을 애니메이션으로 보면서 각 단계별 데이터를 확인하세요.
                </p>
              </div>
            </Link>
            <Link href="/demo/paywall" className="block">
              <div className="glass glass-hover rounded-2xl p-8 h-full">
                <DollarSign className="h-12 w-12 text-amber-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">페이월 체험</h3>
                <p className="text-white/50">
                  실제 유료 페이지에 접근하며 사람과 AI의 차이를 직접 체험해보세요.
                </p>
              </div>
            </Link>
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

      {/* Features */}
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
                Coinbase, Google, Visa, AWS가 지원하는 개방형 표준입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
        <div className="container px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-8">
              <Zap className="h-12 w-12 text-emerald-400" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              직접 체험해보세요
            </h2>
            <p className="text-lg text-white/50 mb-10">
              이론보다 실습! 데모를 통해 x402를 경험해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 btn-glow"
                asChild
              >
                <Link href="/demo/visualizer">
                  <Play className="mr-2 h-4 w-4" />
                  결제 시각화 보기
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-8"
                asChild
              >
                <Link href="/learn">
                  <BookOpen className="mr-2 h-4 w-4" />
                  학습 시작하기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
