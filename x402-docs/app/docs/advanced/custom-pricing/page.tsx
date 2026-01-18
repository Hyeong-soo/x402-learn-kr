import Link from "next/link";
import { ArrowRight, DollarSign, Clock, TrendingUp, Layers, Lightbulb, CheckCircle2 } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";

// 미들웨어가 항상 실행되도록 동적 렌더링 강제
export const dynamic = "force-dynamic";

export default function CustomPricingPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/docs" className="hover:text-white">문서</Link>
          <span>/</span>
          <Link href="/docs" className="hover:text-white">고급</Link>
          <span>/</span>
          <span className="text-white">커스텀 가격 전략</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-mono">
              <DollarSign className="h-4 w-4" />
              AI: $0.01
            </span>
            <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
              사람: 무료
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            커스텀 가격 전략
          </h1>
          <p className="text-lg text-white/60">
            콘텐츠 유형, 복잡도, 사용 패턴에 따른 동적 가격 책정을 구현하세요.
          </p>
        </div>

        {/* Notice */}
        <div className="glass rounded-xl p-6 mb-12 border border-blue-500/30">
          <p className="text-white/80">
            <strong className="text-blue-400">안내:</strong> 브라우저에서 이 페이지를 보고 있다면 무료입니다!
            AI 에이전트가 프로그래밍 방식으로 이 페이지에 접근하면 $0.01 USDC가 부과됩니다.
          </p>
        </div>

        {/* Conceptual Notice */}
        <div className="glass rounded-xl p-6 mb-12 border border-purple-500/30">
          <p className="text-white/80">
            <strong className="text-purple-400">참고:</strong> 아래 코드 예제들은 동적 가격 책정의{" "}
            <em className="text-purple-300">개념적 구현</em>을 보여줍니다.
            실제 구현은 사용하는 프레임워크와 x402 SDK 버전에 따라 달라질 수 있습니다.
          </p>
        </div>

        {/* Dynamic Pricing Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            동적 가격 책정
          </h2>
          <p className="text-white/60 mb-8">
            고정 가격 대신 다양한 요소에 기반한 동적 가격 책정을 구현할 수 있습니다.
          </p>

          {/* Content-based pricing */}
          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Layers className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <span className="text-blue-400 text-sm font-mono">전략 1</span>
                <h3 className="text-white font-semibold">콘텐츠 기반 가격</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              콘텐츠 길이에 따라 가격을 동적으로 결정합니다. 긴 콘텐츠일수록 AI가 더 많은 가치를 얻으므로 높은 가격을 책정합니다.
            </p>
            <CodeBlock
              code={`// x402.config.ts
// 콘텐츠 길이에 따라 가격을 동적으로 결정하는 예제입니다.

export const x402Config = {
  // USDC를 받을 지갑 주소
  wallet: "0x...",

  // 동적 가격 결정 함수
  // path: 요청된 URL 경로 (예: "/docs/api/users")
  // metadata: 페이지 메타데이터 (wordCount, category 등)
  getPricing: (path: string, metadata: any) => {
    // 콘텐츠의 단어 수를 기준으로 가격 책정
    // metadata.wordCount는 빌드 시 자동 계산됩니다
    const wordCount = metadata.wordCount || 0;

    // 5000단어 초과: 상세한 기술 문서 → $0.05 (5센트)
    if (wordCount > 5000) return 0.05;

    // 1000~5000단어: 일반적인 가이드 → $0.02 (2센트)
    if (wordCount > 1000) return 0.02;

    // 1000단어 미만: 짧은 레퍼런스 → $0.01 (1센트)
    return 0.01;
  },
};`}
              language="typescript"
            />
          </div>

          {/* Time-based pricing */}
          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <span className="text-amber-400 text-sm font-mono">전략 2</span>
                <h3 className="text-white font-semibold">시간 기반 가격</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              피크 시간대(트래픽이 많은 시간)에는 높은 가격을 책정합니다. 수요-공급 원칙에 따른 동적 가격 전략입니다.
            </p>
            <CodeBlock
              code={`// 시간대별 가격 차등 적용 예제

getPricing: (path: string) => {
  // 현재 시간을 UTC 기준으로 가져옵니다
  const hour = new Date().getUTCHours();

  // 미국 업무 시간대 (UTC 14:00-22:00 = PST 6:00-14:00)
  // 이 시간대에 AI 에이전트 요청이 가장 많습니다
  const isPeakHour = hour >= 14 && hour <= 22;

  // 피크 시간: $0.02 (2센트)
  // 비피크 시간: $0.01 (1센트) - 50% 할인 효과
  return isPeakHour ? 0.02 : 0.01;
};`}
              language="typescript"
            />
          </div>

          {/* Usage-based pricing */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-emerald-400 text-sm font-mono">전략 3</span>
                <h3 className="text-white font-semibold">사용량 기반 가격</h3>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4">
              자주 사용하는 AI 에이전트에게 볼륨 할인을 제공하여 지속적인 사용을 유도합니다.
            </p>
            <CodeBlock
              code={`// 사용량 기반 볼륨 할인 예제

getPricing: async (path: string, context: RequestContext) => {
  // context에서 AI 에이전트의 고유 ID를 추출
  // 이 ID는 결제 서명에서 자동으로 파싱됩니다
  const { aiAgentId } = context;

  // 데이터베이스에서 이 에이전트의 월간 사용량 조회
  // getUsage()는 직접 구현해야 하는 함수입니다
  const monthlyUsage = await getUsage(aiAgentId);

  // 볼륨 할인 티어:
  // 10,000회 초과: 50% 할인 → $0.005 (0.5센트)
  if (monthlyUsage > 10000) return 0.005;

  // 1,000~10,000회: 20% 할인 → $0.008 (0.8센트)
  if (monthlyUsage > 1000) return 0.008;

  // 1,000회 미만: 기본 가격 → $0.01 (1센트)
  return 0.01;
};`}
              language="typescript"
            />
          </div>
        </section>

        {/* Content Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <Layers className="h-6 w-6 text-purple-400" />
            콘텐츠 카테고리별 가격표
          </h2>
          <p className="text-white/60 mb-6">
            콘텐츠를 분류하고 가치에 따라 가격을 책정하세요.
          </p>

          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/80 font-medium">카테고리</th>
                  <th className="text-left p-4 text-white/80 font-medium">예시</th>
                  <th className="text-left p-4 text-white/80 font-medium">권장 가격</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-emerald-400 font-medium">시작하기</td>
                  <td className="p-4 text-white/60">설치, 빠른 시작</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-sm">
                      무료 또는 $0.005
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-blue-400 font-medium">API 레퍼런스</td>
                  <td className="p-4 text-white/60">메서드 문서</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-sm">
                      $0.01
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-purple-400 font-medium">튜토리얼</td>
                  <td className="p-4 text-white/60">단계별 가이드</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-sm">
                      $0.02
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-4 text-amber-400 font-medium">고급 주제</td>
                  <td className="p-4 text-white/60">아키텍처, 베스트 프랙티스</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 text-sm">
                      $0.03-0.05
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400 font-medium">엔터프라이즈</td>
                  <td className="p-4 text-white/60">스케일링, 보안</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-sm">
                      $0.05-0.10
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tiered Access */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-amber-400" />
            티어별 접근 구현
          </h2>
          <p className="text-white/60 mb-6">
            경로 패턴을 기반으로 선언적 가격 정책을 정의합니다.
          </p>

          <div className="glass rounded-xl p-6">
            <CodeBlock
              code={`// middleware.ts
// 티어(등급)별 가격 정책을 선언적으로 정의하는 예제입니다.
// 콘텐츠의 가치에 따라 4단계로 가격을 차등 적용합니다.

import { x402Middleware, TieredPricing } from "x402-middleware";

// TieredPricing 클래스로 경로별 가격 매핑 생성
const pricing = new TieredPricing({
  tiers: {
    // =====================================
    // 무료 티어 (Free Tier)
    // =====================================
    // 진입 장벽을 낮추기 위해 시작 문서는 무료로 제공
    // AI 에이전트도 이 경로는 무료로 접근 가능
    free: {
      paths: ["/docs/getting-started/**", "/docs/installation"],
      price: 0,  // $0.00 - 완전 무료
    },

    // =====================================
    // 기본 티어 (Basic Tier)
    // =====================================
    // API 레퍼런스, 가이드 등 일반적인 문서
    // 대부분의 요청이 이 티어에 해당
    basic: {
      paths: ["/docs/api/**", "/docs/guides/**"],
      price: 0.01,  // $0.01 (1센트) - 기본 가격
    },

    // =====================================
    // 고급 티어 (Advanced Tier)
    // =====================================
    // 아키텍처, 베스트 프랙티스 등 심화 내용
    // 더 높은 가치를 제공하므로 2배 가격
    advanced: {
      paths: ["/docs/advanced/**"],
      price: 0.02,  // $0.02 (2센트)
    },

    // =====================================
    // 엔터프라이즈 티어 (Enterprise Tier)
    // =====================================
    // 스케일링, 보안, 규정 준수 등 전문 내용
    // 기업용 고가치 콘텐츠에 프리미엄 가격 적용
    enterprise: {
      paths: ["/docs/enterprise/**"],
      price: 0.05,  // $0.05 (5센트) - 프리미엄 가격
    },
  },
});

// 설정된 pricing 객체를 미들웨어에 전달
// 요청이 들어오면 자동으로 경로를 매칭하여 가격 적용
export const middleware = x402Middleware({ pricing });`}
              language="typescript"
            />
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            베스트 프랙티스
          </h2>

          <div className="grid gap-4">
            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-mono text-sm">1</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">낮은 가격으로 시작</h4>
                <p className="text-white/60 text-sm">
                  $0.01로 시작하고 수요에 따라 조정하세요. 초기에는 접근성을 높이는 것이 중요합니다.
                </p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-mono text-sm">2</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">시작 문서는 무료로</h4>
                <p className="text-white/60 text-sm">
                  Getting Started 문서를 무료로 제공하여 진입 장벽을 낮추세요.
                </p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-mono text-sm">3</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">가치 기반 가격 책정</h4>
                <p className="text-white/60 text-sm">
                  엔터프라이즈 콘텐츠는 더 높은 가격을 책정할 수 있습니다. 콘텐츠의 가치를 반영하세요.
                </p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-mono text-sm">4</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">모니터링 및 조정</h4>
                <p className="text-white/60 text-sm">
                  분석 데이터를 활용하여 가격을 최적화하세요. 사용 패턴을 관찰하고 대응하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tip */}
        <section className="mb-12">
          <div className="glass rounded-2xl p-8 border border-emerald-500/30">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 shrink-0">
                <Lightbulb className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">프로 팁</h3>
                <p className="text-white/60">
                  가장 성공적인 프로젝트들은 기본 문서를 <span className="text-emerald-400 font-semibold">$0.01</span>로,
                  특화된 엔터프라이즈 콘텐츠는 <span className="text-amber-400 font-semibold">$0.05 이상</span>으로 책정합니다.
                  이렇게 하면 접근성과 수익을 모두 극대화할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/docs/getting-started">
              ← 빠른 시작
            </Link>
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <Link href="/docs">
              문서 목록 →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
