"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Globe, Shield, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatIsX402Page() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/learn" className="hover:text-white">학습</Link>
          <span>/</span>
          <span className="text-white">x402란 무엇인가?</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          x402란 무엇인가?
        </h1>

        <div className="prose prose-invert max-w-none">
          {/* Introduction */}
          <div className="glass rounded-2xl p-8 mb-8">
            <p className="text-lg text-white/80 leading-relaxed">
              x402는 <span className="text-emerald-400 font-semibold">HTTP 402 Payment Required</span> 상태 코드를
              활용한 인터넷 네이티브 결제 프로토콜입니다. AI 에이전트가 웹 리소스에 접근할 때
              자동으로 암호화폐 결제를 처리할 수 있게 해줍니다.
            </p>
          </div>

          {/* HTTP 402 History */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Globe className="h-6 w-6 text-emerald-400" />
              HTTP 402의 역사
            </h2>
            <div className="glass rounded-xl p-6 space-y-4">
              <p className="text-white/70">
                HTTP 402 상태 코드는 1999년 HTTP/1.1 스펙에서 "미래 사용을 위해 예약됨"으로
                정의되었습니다. 인터넷 결제 시스템을 위해 남겨둔 코드였지만, 당시에는
                적절한 결제 인프라가 없어 25년 넘게 사용되지 않았습니다.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <span className="text-amber-400">402 Payment Required</span>
                <br />
                <span className="text-white/50">// RFC 2616 (1999): "This code is reserved for future use."</span>
              </div>
              <p className="text-white/70">
                블록체인과 스테이블코인의 등장으로, 드디어 HTTP 402를 실현할 수 있는
                기술적 기반이 마련되었습니다.
              </p>
            </div>
          </section>

          {/* Why x402 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Zap className="h-6 w-6 text-emerald-400" />
              왜 x402인가?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-6">
                <h3 className="text-emerald-400 font-medium mb-3">기존 결제의 문제점</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    계정 생성 필요 (이메일, 비밀번호)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    신용카드 정보 입력
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    중개 플랫폼 수수료 (15-30%)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    지역별 결제 제한
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    AI 에이전트가 사용 불가
                  </li>
                </ul>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-emerald-400 font-medium mb-3">x402의 해결책</h3>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    지갑 주소만으로 결제 (계정 불필요)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    암호화 서명으로 승인
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    네트워크 수수료만 발생 (~$0.001)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    전 세계 어디서나 동일하게 작동
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    AI 에이전트 네이티브 지원
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-emerald-400" />
              핵심 특징
            </h2>
            <div className="space-y-4">
              <div className="glass rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">1. 허가 불필요 (Permissionless)</h3>
                <p className="text-white/70 text-sm">
                  중앙 기관의 승인 없이 누구나 x402를 구현하고 사용할 수 있습니다.
                  개방형 프로토콜이므로 특정 회사나 플랫폼에 종속되지 않습니다.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">2. 계정 불필요 (Accountless)</h3>
                <p className="text-white/70 text-sm">
                  이메일, 비밀번호, 개인정보 입력이 필요 없습니다.
                  암호화폐 지갑의 서명만으로 결제가 완료됩니다.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">3. 프로그래머블 (Programmable)</h3>
                <p className="text-white/70 text-sm">
                  코드로 자동화 가능합니다. AI 에이전트가 예산 내에서
                  자율적으로 결제하고 리소스에 접근할 수 있습니다.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-white font-medium mb-2">4. 마이크로페이먼트 (Micropayments)</h3>
                <p className="text-white/70 text-sm">
                  $0.001 단위의 소액 결제가 경제적으로 가능합니다.
                  API 호출당, 페이지뷰당 과금 모델을 쉽게 구현할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <Coins className="h-6 w-6 text-emerald-400" />
              활용 사례
            </h2>
            <div className="glass rounded-xl p-6">
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-mono text-sm shrink-0">01</span>
                  <div>
                    <span className="text-white font-medium">AI 에이전트 API 과금</span>
                    <p className="text-sm mt-1">Claude, GPT 등 AI가 외부 API를 호출할 때 자동 결제</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-mono text-sm shrink-0">02</span>
                  <div>
                    <span className="text-white font-medium">프리미엄 콘텐츠</span>
                    <p className="text-sm mt-1">구독 없이 개별 기사/동영상 단건 결제</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-mono text-sm shrink-0">03</span>
                  <div>
                    <span className="text-white font-medium">오픈소스 후원</span>
                    <p className="text-sm mt-1">AI가 오픈소스 문서/코드 접근 시 자동 후원</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-mono text-sm shrink-0">04</span>
                  <div>
                    <span className="text-white font-medium">데이터 마켓플레이스</span>
                    <p className="text-sm mt-1">실시간 데이터 피드에 쿼리당 과금</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-12">
            <div className="glass rounded-xl p-6">
              <h3 className="text-white font-medium mb-4 text-center">x402 생태계 현황 (2025년 1월)</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-400">75M+</div>
                  <div className="text-sm text-white/50">총 거래 수</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">$24M+</div>
                  <div className="text-sm text-white/50">총 거래량</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">8+</div>
                  <div className="text-sm text-white/50">지원 네트워크</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn">
              <ArrowLeft className="mr-2 h-4 w-4" />
              학습 목록
            </Link>
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <Link href="/learn/how-it-works">
              작동 원리
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
