"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Workflow, Server, Smartphone, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      num: 1,
      title: "초기 요청",
      from: "클라이언트",
      to: "서버",
      description: "AI 에이전트가 보호된 리소스에 일반적인 HTTP GET 요청을 보냅니다.",
      code: `GET /api/premium-data HTTP/1.1
Host: example.com
User-Agent: AI-Agent/1.0
Accept: application/json`,
    },
    {
      num: 2,
      title: "402 응답",
      from: "서버",
      to: "클라이언트",
      description: "서버가 결제가 필요함을 알리며, 결제 정보를 PAYMENT-REQUIRED 헤더에 담아 반환합니다.",
      code: `HTTP/1.1 402 Payment Required
PAYMENT-REQUIRED: base64(...)

{
  "x402Version": 2,
  "accepts": [{
    "scheme": "exact",
    "network": "eip155:84532",
    "amount": "10000",
    "asset": "0x036CbD53...",
    "payTo": "0x742d35Cc..."
  }]
}`,
    },
    {
      num: 3,
      title: "EIP-712 서명 생성",
      from: "클라이언트",
      to: "클라이언트",
      description: "클라이언트가 USDC의 transferWithAuthorization을 위한 EIP-712 타입 데이터 서명을 생성합니다.",
      code: `// EIP-712 Typed Data
{
  "domain": {
    "name": "USDC",
    "version": "2",
    "chainId": 84532,
    "verifyingContract": "0x036CbD53..."
  },
  "message": {
    "from": "0x390e4Ce3...",
    "to": "0x742d35Cc...",
    "value": "10000",
    "validAfter": 0,
    "validBefore": 1768474060,
    "nonce": "0xabc123..."
  }
}`,
    },
    {
      num: 4,
      title: "서명과 함께 재요청",
      from: "클라이언트",
      to: "서버",
      description: "생성한 결제 서명을 PAYMENT-SIGNATURE 헤더에 담아 원래 요청을 다시 보냅니다.",
      code: `GET /api/premium-data HTTP/1.1
Host: example.com
PAYMENT-SIGNATURE: base64({
  "signature": "0x...",
  "authorization": {...}
})`,
    },
    {
      num: 5,
      title: "퍼실리테이터 검증",
      from: "서버",
      to: "퍼실리테이터",
      description: "서버가 퍼실리테이터에게 결제 서명의 유효성 검증을 요청합니다. 온체인 실행 없이 빠르게 검증됩니다.",
      code: `POST /verify
{
  "x402Version": 2,
  "paymentPayload": "...",
  "paymentRequirements": "..."
}

// Response
{
  "isValid": true,
  "payer": "0x390e4Ce3..."
}`,
    },
    {
      num: 6,
      title: "온체인 정산",
      from: "퍼실리테이터",
      to: "블록체인",
      description: "퍼실리테이터가 transferWithAuthorization을 호출하여 USDC를 실제로 전송합니다.",
      code: `// USDC Contract Call
USDC.transferWithAuthorization(
  from: "0x390e4Ce3...",
  to: "0x742d35Cc...",
  value: 10000,
  validAfter: 0,
  validBefore: 1768474060,
  nonce: "0xabc123...",
  v, r, s  // signature
)

// Transaction Hash
0xfd5a8643...`,
    },
    {
      num: 7,
      title: "콘텐츠 반환",
      from: "서버",
      to: "클라이언트",
      description: "결제가 확인되면 서버가 보호된 콘텐츠를 반환합니다.",
      code: `HTTP/1.1 200 OK
PAYMENT-RESPONSE: base64({
  "settled": true,
  "txHash": "0xfd5a8643..."
})

{
  "data": "프리미엄 콘텐츠..."
}`,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/learn" className="hover:text-white">학습</Link>
          <span>/</span>
          <span className="text-white">작동 원리</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          작동 원리
        </h1>

        {/* Overview */}
        <div className="glass rounded-2xl p-8 mb-12">
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            x402는 HTTP 요청-응답 사이클 내에서 결제를 처리합니다.
            클라이언트, 서버, 퍼실리테이터, 블록체인 4개의 구성 요소가 협력하여
            빠르고 안전한 결제를 구현합니다.
          </p>

          {/* Simple Flow Diagram */}
          <div className="flex items-center justify-between bg-black/30 rounded-xl p-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                <Smartphone className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="text-xs text-white/60">클라이언트</span>
            </div>
            <ArrowRight className="h-5 w-5 text-white/30" />
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                <Server className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xs text-white/60">서버</span>
            </div>
            <ArrowRight className="h-5 w-5 text-white/30" />
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                <Building2 className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-xs text-white/60">퍼실리테이터</span>
            </div>
            <ArrowRight className="h-5 w-5 text-white/30" />
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-2">
                <svg className="h-6 w-6 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <span className="text-xs text-white/60">블록체인</span>
            </div>
          </div>
        </div>

        {/* Step by Step */}
        <div className="space-y-6 mb-12">
          {steps.map((step, index) => (
            <div key={step.num} className="glass rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 p-4 border-b border-white/10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index < 4 ? "bg-emerald-500/20 text-emerald-400" :
                  index < 6 ? "bg-purple-500/20 text-purple-400" :
                  "bg-blue-500/20 text-blue-400"
                }`}>
                  <span className="font-mono font-bold">{step.num}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{step.title}</h3>
                  <span className="text-xs text-white/50">
                    {step.from} → {step.to}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-white/70 text-sm mb-4">{step.description}</p>
                <pre className="bg-black/40 rounded-lg p-4 text-xs overflow-x-auto">
                  <code className="text-emerald-400">{step.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Key Points */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            핵심 포인트
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-2">가스비는 누가 내나요?</h3>
              <p className="text-white/70 text-sm">
                퍼실리테이터가 대신 트랜잭션을 전송합니다.
                가스비는 결제 금액에서 차감되거나 퍼실리테이터가 부담합니다.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-2">실패하면 어떻게 되나요?</h3>
              <p className="text-white/70 text-sm">
                결제는 온체인에서 원자적으로 실행됩니다.
                실패하면 토큰이 전송되지 않고, 콘텐츠도 제공되지 않습니다.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-2">얼마나 빠른가요?</h3>
              <p className="text-white/70 text-sm">
                검증(Step 5)은 ~100ms, 온체인 정산(Step 6)은 ~2초 소요됩니다.
                클라이언트 관점에서 전체 흐름은 2-3초 내에 완료됩니다.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <h3 className="text-emerald-400 font-medium mb-2">replay attack 방지는?</h3>
              <p className="text-white/70 text-sm">
                각 서명에 고유한 nonce가 포함되어 있고,
                validBefore 타임스탬프로 유효 기간이 제한됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass rounded-xl p-6">
          <p className="text-white/70 mb-4">
            직접 결제 플로우를 시각화로 확인해보세요
          </p>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <Link href="/demo/visualizer">
              <Workflow className="mr-2 h-4 w-4" />
              결제 플로우 시각화 보기
            </Link>
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn/what-is-x402">
              <ArrowLeft className="mr-2 h-4 w-4" />
              x402란 무엇인가?
            </Link>
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <Link href="/learn/components">
              구성 요소
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
