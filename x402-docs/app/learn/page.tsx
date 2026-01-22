import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Workflow, Coins, Globe, Cpu } from "lucide-react";
import { CourseSchema } from "@/components/StructuredData";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://www.learn402.xyz";
const PAGE_URL = `${BASE_URL}/learn`;

export const metadata: Metadata = {
  title: "x402 프로토콜 배우기",
  description:
    "AI 에이전트 결제의 새로운 표준, x402를 단계별로 학습하세요. 기초 개념부터 EIP-712 서명, USDC 전송까지 한국어로 쉽게 설명합니다.",
  keywords: ["x402 학습", "AI 결제 튜토리얼", "EIP-712", "USDC 전송", "블록체인 교육"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 프로토콜 배우기",
    description: "AI 에이전트 결제의 새로운 표준, x402를 단계별로 학습하세요.",
    type: "website",
    url: PAGE_URL,
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 프로토콜 배우기",
    description: "AI 에이전트 결제의 새로운 표준, x402를 단계별로 학습하세요.",
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
};

export default function LearnPage() {
  const topics = [
    {
      href: "/learn/what-is-x402",
      icon: BookOpen,
      title: "x402란 무엇인가?",
      description: "HTTP 402 상태 코드의 역사부터 x402 프로토콜의 탄생 배경까지",
      color: "emerald",
    },
    {
      href: "/learn/how-it-works",
      icon: Workflow,
      title: "작동 원리",
      description: "요청, 402 응답, 서명, 검증, 정산까지 전체 플로우 상세 설명",
      color: "blue",
    },
    {
      href: "/learn/components",
      icon: Layers,
      title: "구성 요소",
      description: "클라이언트, 서버, 퍼실리테이터 각 역할과 상호작용 방식",
      color: "purple",
    },
    {
      href: "/learn/eip712",
      icon: Cpu,
      title: "EIP-712 서명",
      description: "타입화된 데이터 서명의 구조와 보안 원리",
      color: "pink",
    },
    {
      href: "/learn/usdc-transfer",
      icon: Coins,
      title: "USDC 가스리스 전송",
      description: "EIP-3009 transferWithAuthorization의 작동 방식",
      color: "amber",
    },
    {
      href: "/learn/ecosystem",
      icon: Globe,
      title: "생태계",
      description: "Coinbase, Google, Visa 등 주요 파트너와 활용 사례",
      color: "cyan",
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
    blue: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
    pink: { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
    amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
  };

  return (
    <>
      <CourseSchema
        name="x402 프로토콜 완전 가이드"
        description="AI 에이전트 결제의 새로운 표준, x402를 단계별로 학습하세요. 기초 개념부터 EIP-712 서명, USDC 전송까지."
        url={PAGE_URL}
        courseCode="X402-KR-101"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "배우기", url: PAGE_URL },
        ]}
      />
      <div className="min-h-screen py-20">
        <div className="container px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <BookOpen className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-white/80">개념 학습</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              x402 프로토콜 배우기
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              AI 에이전트 결제의 새로운 표준, x402를 단계별로 학습하세요.
              <br />
              기초 개념부터 심화 내용까지 한국어로 쉽게 설명합니다.
            </p>
          </div>

          {/* Topic Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {topics.map((topic, index) => {
              const colors = colorClasses[topic.color];
              const Icon = topic.icon;
              return (
                <Link key={topic.href} href={topic.href} className="block group">
                  <div className={`glass glass-hover rounded-2xl p-6 h-full border ${colors.border} border-opacity-0 group-hover:border-opacity-100 transition-all`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${colors.bg} shrink-0`}>
                        <Icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-sm font-mono ${colors.text}`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                            {topic.title}
                          </h3>
                        </div>
                        <p className="text-sm text-white/50">
                          {topic.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Start */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                빠르게 시작하기
              </h2>
              <p className="text-white/50 mb-6">
                이론보다 실습을 선호한다면, 바로 데모를 체험해보세요.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo/visualizer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                >
                  결제 플로우 시각화
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/demo/paywall"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                >
                  페이월 체험
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  구현 가이드
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
