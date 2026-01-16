"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, User, Terminal, Loader2, Zap, CheckCircle2, Eye, Lock, ArrowRight, Play } from "lucide-react";

export default function DemoPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAsHuman = async () => {
    setLoading(true);
    try {
      const response = await fetch("/demo/protected-content");
      const data = await response.text();
      setTestResult({
        type: "human",
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: data.substring(0, 500),
      });
    } catch (error: any) {
      setTestResult({ type: "human", error: error.message });
    }
    setLoading(false);
  };

  const testAsAI = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/simulate-ai-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/demo/protected-content" }),
      });
      const data = await response.json();
      setTestResult({
        type: "ai",
        ...data,
      });
    } catch (error: any) {
      setTestResult({ type: "ai", error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10 max-w-5xl px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-white/80">인터랙티브 데모</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              직접 체험하기
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              사람과 AI 에이전트가 같은 페이지에 접근할 때 어떤 차이가 있는지 확인하세요.
            </p>
          </div>

          {/* Demo Links */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link href="/demo/visualizer" className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Eye className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">결제 플로우 시각화</h3>
                <p className="text-sm text-white/50">애니메이션으로 전체 과정 보기</p>
              </div>
              <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link href="/demo/paywall" className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group border border-amber-500/20 hover:border-amber-500/40 transition-colors">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Lock className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors">페이월 체험</h3>
                <p className="text-sm text-white/50">사람 vs AI 접근 비교</p>
              </div>
              <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Test Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Human Test */}
            <div className="glass glass-hover rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-emerald-500/20">
                    <User className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">사람으로 접근</h3>
                    <span className="text-emerald-400 font-mono text-sm">무료</span>
                  </div>
                </div>
                <p className="text-white/60 mb-6">
                  브라우저로 페이지를 보고 있으므로 무료로 콘텐츠에 접근할 수 있습니다.
                </p>
                <Button
                  onClick={testAsHuman}
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold btn-glow"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  )}
                  {loading ? "로딩 중..." : "사람으로 접근하기"}
                </Button>
              </div>
            </div>

            {/* AI Test */}
            <div className="glass glass-hover rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-amber-500/20">
                    <Bot className="h-8 w-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">AI로 접근</h3>
                    <span className="text-amber-400 font-mono text-sm">$0.01+ USDC</span>
                  </div>
                </div>
                <p className="text-white/60 mb-6">
                  AI 에이전트가 같은 콘텐츠에 접근하면 어떤 응답을 받는지 시뮬레이션합니다.
                </p>
                <Button
                  onClick={testAsAI}
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold"
                  style={{ boxShadow: loading ? 'none' : '0 0 20px -3px rgba(245, 158, 11, 0.6)' }}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Bot className="mr-2 h-4 w-4" />
                  )}
                  {loading ? "로딩 중..." : "AI 요청 시뮬레이션"}
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          {testResult && (
            <div className="glass rounded-2xl overflow-hidden mb-8">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
                {testResult.type === "human" ? (
                  <>
                    <User className="h-5 w-5 text-emerald-400" />
                    <span className="text-white font-semibold">응답 결과</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-mono">
                      사람 - 무료
                    </span>
                  </>
                ) : (
                  <>
                    <Bot className="h-5 w-5 text-amber-400" />
                    <span className="text-white font-semibold">응답 결과</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-mono">
                      AI - 402 결제 필요
                    </span>
                  </>
                )}
              </div>
              <pre className="p-6 text-sm overflow-x-auto text-gray-300 bg-black/30">
                <code>{JSON.stringify(testResult, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="container max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            어떻게 구분하나요?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">사람 감지</h3>
              </div>
              <ol className="space-y-4">
                <li className="flex gap-3 text-white/60">
                  <span className="text-emerald-400 font-mono">01</span>
                  페이지 방문
                </li>
                <li className="flex gap-3 text-white/60">
                  <span className="text-emerald-400 font-mono">02</span>
                  JavaScript 검증 자동 실행
                </li>
                <li className="flex gap-3 text-white/60">
                  <span className="text-emerald-400 font-mono">03</span>
                  브라우저에 토큰 저장
                </li>
                <li className="flex gap-3 text-white/60">
                  <span className="text-emerald-400 font-mono">04</span>
                  24시간 무료 접근
                </li>
              </ol>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bot className="h-6 w-6 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">AI 감지</h3>
              </div>
              <ol className="space-y-4">
                <li className="flex gap-3 text-white/60">
                  <span className="text-amber-400 font-mono">01</span>
                  AI 에이전트가 HTTP 요청
                </li>
                <li className="flex gap-3 text-white/60">
                  <span className="text-amber-400 font-mono">02</span>
                  JS 실행 불가 = 토큰 없음
                </li>
                <li className="flex gap-3 text-white/60">
                  <span className="text-amber-400 font-mono">03</span>
                  서버가 <code className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">402</code> 응답
                </li>
                <li className="flex gap-3 text-white/60">
                  <span className="text-amber-400 font-mono">04</span>
                  x402로 결제 후 접근
                </li>
              </ol>
            </div>
          </div>

          {/* curl example */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <Terminal className="h-4 w-4 text-white/40 ml-2" />
              <span className="text-sm text-white/40 font-mono">직접 테스트해보기</span>
            </div>
            <pre className="p-6 text-sm overflow-x-auto bg-transparent border-0">
              <code className="text-gray-300">{`# AI 에이전트 요청 시뮬레이션 (브라우저 없이, JS 없이)
curl -v http://localhost:3010/demo/protected-content \\
  -H "User-Agent: AI-Agent/1.0"

# 응답:
# HTTP/1.1 402 Payment Required
# PAYMENT-REQUIRED: eyJ4NDAyVmVyc2lvbiI6Mi...
#
# {
#   "error": "Payment Required",
#   "message": "AI agents must pay $0.01 USDC to access this content",
#   "price": 0.01
# }`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
