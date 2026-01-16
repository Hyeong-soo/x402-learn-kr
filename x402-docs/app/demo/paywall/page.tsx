"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Unlock,
  User,
  Bot,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  Copy,
  Terminal,
} from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export default function PaywallDemoPage() {
  const [humanVerified, setHumanVerified] = useState<boolean | null>(null);
  const [showCurlExample, setShowCurlExample] = useState(false);

  useEffect(() => {
    // Check if human token exists, create one if not
    const checkOrCreateHumanToken = async () => {
      try {
        // First check if we have a valid token
        const checkResponse = await fetch("/api/verify-human");
        const checkData = await checkResponse.json();

        if (checkData.verified) {
          setHumanVerified(true);
          return;
        }

        // No valid token - create one (proves we're a browser with JS)
        const createResponse = await fetch("/api/verify-human", {
          method: "POST",
        });
        const createData = await createResponse.json();

        if (createData.success) {
          setHumanVerified(true);
        } else {
          setHumanVerified(false);
        }
      } catch {
        setHumanVerified(false);
      }
    };
    checkOrCreateHumanToken();
  }, []);

  const curlCommand = `curl -X GET "http://localhost:3010/demo/protected-content" \\
  -H "User-Agent: AI-Agent/1.0" \\
  -H "Accept: application/json"`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            페이월 체험
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            같은 페이지에 사람과 AI 에이전트가 접근할 때 어떤 차이가 있는지 직접 확인해보세요.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Human Access Card */}
          <div className="glass rounded-2xl p-6 border border-emerald-500/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <User className="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">사람 (브라우저)</h2>
                <p className="text-emerald-400 text-sm">무료 접근</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                {humanVerified ? (
                  <Check className="h-5 w-5 text-emerald-400" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-white/30" />
                )}
                <span>JavaScript 실행 가능</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                {humanVerified ? (
                  <Check className="h-5 w-5 text-emerald-400" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-white/30" />
                )}
                <span>Human Token 보유</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                {humanVerified ? (
                  <Unlock className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Lock className="h-5 w-5 text-white/40" />
                )}
                <span>프리미엄 콘텐츠 접근</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              {humanVerified ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">인증 완료 - 무료 접근 가능</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-400">
                  <div className="animate-spin h-5 w-5 border-2 border-amber-400 border-t-transparent rounded-full" />
                  <span className="font-medium">인증 확인 중...</span>
                </div>
              )}
            </div>

            <Button
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-black"
              asChild
            >
              <Link href="/demo/protected-content">
                프리미엄 콘텐츠 보기 (무료)
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* AI Access Card */}
          <div className="glass rounded-2xl p-6 border border-amber-500/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Bot className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">AI 에이전트</h2>
                <p className="text-amber-400 text-sm">$0.01 USDC 결제 필요</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <X className="h-5 w-5 text-red-400" />
                <span>JavaScript 실행 불가</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <X className="h-5 w-5 text-red-400" />
                <span>Human Token 없음</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Lock className="h-5 w-5 text-amber-400" />
                <span>402 Payment Required</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-amber-400">
                <Lock className="h-5 w-5" />
                <span className="font-medium">결제 후 접근 가능</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
              onClick={() => setShowCurlExample(!showCurlExample)}
            >
              <Terminal className="mr-2 h-4 w-4" />
              AI 에이전트 시뮬레이션
            </Button>
          </div>
        </div>

        {/* Curl Example */}
        {showCurlExample && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                AI 에이전트처럼 요청 보내기
              </h3>
              <p className="text-white/50 mb-4">
                터미널에서 아래 명령어를 실행하면 AI 에이전트와 같은 응답을 받습니다.
                (브라우저가 아니므로 Human Token이 없어 402 응답)
              </p>
              <div className="relative">
                <CodeBlock code={curlCommand} language="bash" />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 text-white/50 hover:text-white"
                  onClick={() => copyToClipboard(curlCommand)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                <h4 className="text-amber-400 font-medium mb-2">예상 응답:</h4>
                <CodeBlock
                  code={`{
  "error": "Payment Required",
  "message": "AI agents must pay $0.01 USDC",
  "price": 0.01,
  "network": "eip155:84532",
  "paymentDetails": { ... }
}`}
                  language="json"
                />
              </div>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              어떻게 구분하나요?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-emerald-400 font-medium">사람 (브라우저)</h3>
                <ol className="space-y-3 text-white/70 text-sm">
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-mono shrink-0">1.</span>
                    <span>페이지 첫 방문 시 <code className="text-emerald-400">/verify</code> 페이지로 리다이렉트</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-mono shrink-0">2.</span>
                    <span>JavaScript가 자동 실행되어 서버에 검증 요청</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-mono shrink-0">3.</span>
                    <span>서버가 HMAC-SHA256 서명된 토큰을 쿠키로 발급</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-400 font-mono shrink-0">4.</span>
                    <span>24시간 동안 모든 보호된 페이지 무료 접근</span>
                  </li>
                </ol>
              </div>

              <div className="space-y-4">
                <h3 className="text-amber-400 font-medium">AI 에이전트</h3>
                <ol className="space-y-3 text-white/70 text-sm">
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-mono shrink-0">1.</span>
                    <span>HTTP 요청만 가능, JavaScript 실행 불가</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-mono shrink-0">2.</span>
                    <span><code className="text-amber-400">Accept: text/html</code> 헤더 없음</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-mono shrink-0">3.</span>
                    <span>Human Token 쿠키 없음</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-mono shrink-0">4.</span>
                    <span><code className="text-amber-400">402 Payment Required</code> 응답 수신</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center">
              <Link
                href="/learn/how-it-works"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
              >
                자세한 작동 원리 보기
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
