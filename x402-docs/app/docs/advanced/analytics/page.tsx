import Link from "next/link";
import { BarChart3, TrendingUp, DollarSign, Users, Activity, Database, LineChart, PieChart, Lightbulb, CheckCircle2 } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";

// 미들웨어가 항상 실행되도록 동적 렌더링 강제
export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/docs" className="hover:text-white">문서</Link>
          <span>/</span>
          <Link href="/docs" className="hover:text-white">고급</Link>
          <span>/</span>
          <span className="text-white">분석 및 수익 추적</span>
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
            분석 및 수익 추적
          </h1>
          <p className="text-lg text-white/60">
            AI 에이전트의 사용 패턴을 분석하고 수익 지표를 추적하여 콘텐츠 전략을 최적화하세요.
          </p>
        </div>

        {/* Notice */}
        <div className="glass rounded-xl p-6 mb-12 border border-purple-500/30">
          <p className="text-white/80">
            <strong className="text-purple-400">참고:</strong> 아래 코드 예제들은{" "}
            <em className="text-purple-300">개념적 구현</em>을 보여줍니다.
            실제 구현은 사용하는 데이터베이스와 분석 도구에 따라 달라질 수 있습니다.
          </p>
        </div>

        {/* Key Metrics Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-400" />
            핵심 지표
          </h2>
          <p className="text-white/60 mb-8">
            x402를 통해 추적할 수 있는 핵심 비즈니스 지표입니다.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold">총 수익</h3>
              </div>
              <p className="text-white/60 text-sm">
                AI 에이전트로부터 발생한 전체 USDC 수익을 추적합니다.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold">고유 에이전트 수</h3>
              </div>
              <p className="text-white/60 text-sm">
                콘텐츠에 접근한 고유한 AI 에이전트의 수를 파악합니다.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold">요청 빈도</h3>
              </div>
              <p className="text-white/60 text-sm">
                시간대별, 일별, 주별 요청 패턴을 분석합니다.
              </p>
            </div>

            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold">인기 콘텐츠</h3>
              </div>
              <p className="text-white/60 text-sm">
                가장 많이 요청되는 문서와 경로를 식별합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Data Collection */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <Database className="h-6 w-6 text-blue-400" />
            데이터 수집
          </h2>
          <p className="text-white/60 mb-6">
            미들웨어에서 결제 이벤트를 캡처하여 분석 데이터를 수집합니다.
          </p>

          <div className="glass rounded-xl p-6">
            <CodeBlock
              code={`// analytics.ts
// 결제 이벤트를 수집하고 저장하는 분석 모듈

import { PaymentEvent } from "x402-middleware";

// 결제 이벤트 타입 정의
interface AnalyticsEvent {
  timestamp: Date;
  path: string;           // 요청된 문서 경로
  agentId: string;        // AI 에이전트 식별자
  amount: number;         // 결제 금액 (USDC)
  txHash: string;         // 블록체인 트랜잭션 해시
  network: string;        // 사용된 네트워크 (예: "base")
  userAgent: string;      // 에이전트 User-Agent 헤더
}

// 결제 완료 시 호출되는 콜백 함수
export async function trackPayment(event: PaymentEvent): Promise<void> {
  const analyticsEvent: AnalyticsEvent = {
    timestamp: new Date(),
    path: event.request.path,
    agentId: event.payment.from,      // 결제자 지갑 주소
    amount: event.payment.amount,
    txHash: event.payment.txHash,
    network: event.payment.network,
    userAgent: event.request.headers["user-agent"] || "unknown",
  };

  // 데이터베이스에 저장
  // 사용하는 DB에 맞게 구현 (PostgreSQL, MongoDB 등)
  await db.collection("x402_payments").insertOne(analyticsEvent);

  // 실시간 대시보드 업데이트 (선택사항)
  await updateRealtimeDashboard(analyticsEvent);
}`}
              language="typescript"
            />
          </div>
        </section>

        {/* Revenue Dashboard */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <LineChart className="h-6 w-6 text-emerald-400" />
            수익 대시보드
          </h2>
          <p className="text-white/60 mb-6">
            수집된 데이터를 기반으로 수익 지표를 계산합니다.
          </p>

          <div className="glass rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-emerald-400 text-sm font-mono">예제</span>
              <h3 className="text-white font-semibold">수익 집계 쿼리</h3>
            </div>
            <CodeBlock
              code={`// revenue-queries.ts
// 수익 지표를 계산하는 쿼리 함수들

// 기간별 총 수익 계산
export async function getTotalRevenue(
  startDate: Date,
  endDate: Date
): Promise<number> {
  const result = await db.collection("x402_payments").aggregate([
    {
      $match: {
        timestamp: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ]).toArray();

  return result[0]?.total || 0;
}

// 일별 수익 추이
export async function getDailyRevenue(days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return db.collection("x402_payments").aggregate([
    {
      $match: { timestamp: { $gte: startDate } }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
        },
        revenue: { $sum: "$amount" },
        requests: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]).toArray();
}

// 인기 콘텐츠 TOP 10
export async function getTopContent(limit: number = 10) {
  return db.collection("x402_payments").aggregate([
    {
      $group: {
        _id: "$path",
        revenue: { $sum: "$amount" },
        requests: { $sum: 1 },
        uniqueAgents: { $addToSet: "$agentId" }
      }
    },
    {
      $project: {
        path: "$_id",
        revenue: 1,
        requests: 1,
        uniqueAgents: { $size: "$uniqueAgents" }
      }
    },
    { $sort: { revenue: -1 } },
    { $limit: limit }
  ]).toArray();
}`}
              language="typescript"
            />
          </div>
        </section>

        {/* Agent Analysis */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <PieChart className="h-6 w-6 text-purple-400" />
            에이전트 분석
          </h2>
          <p className="text-white/60 mb-6">
            어떤 AI 에이전트가 콘텐츠를 가장 많이 소비하는지 파악합니다.
          </p>

          <div className="glass rounded-xl p-6">
            <CodeBlock
              code={`// agent-analytics.ts
// AI 에이전트별 사용 패턴 분석

// 에이전트별 사용량 및 지출 현황
export async function getAgentStats() {
  return db.collection("x402_payments").aggregate([
    {
      $group: {
        _id: "$agentId",
        totalSpent: { $sum: "$amount" },
        requestCount: { $sum: 1 },
        firstSeen: { $min: "$timestamp" },
        lastSeen: { $max: "$timestamp" },
        contentAccessed: { $addToSet: "$path" }
      }
    },
    {
      $project: {
        agentId: "$_id",
        totalSpent: 1,
        requestCount: 1,
        firstSeen: 1,
        lastSeen: 1,
        uniquePages: { $size: "$contentAccessed" },
        avgSpentPerRequest: {
          $divide: ["$totalSpent", "$requestCount"]
        }
      }
    },
    { $sort: { totalSpent: -1 } }
  ]).toArray();
}

// User-Agent 기반 에이전트 유형 분류
export function categorizeAgent(userAgent: string): string {
  const patterns = [
    { regex: /Claude/i, category: "Claude (Anthropic)" },
    { regex: /GPT|OpenAI/i, category: "GPT (OpenAI)" },
    { regex: /Cursor/i, category: "Cursor IDE" },
    { regex: /GitHub Copilot/i, category: "GitHub Copilot" },
    { regex: /Perplexity/i, category: "Perplexity AI" },
  ];

  for (const { regex, category } of patterns) {
    if (regex.test(userAgent)) return category;
  }
  return "Other AI Agent";
}

// 에이전트 유형별 통계
export async function getAgentTypeDistribution() {
  const payments = await db.collection("x402_payments")
    .find({})
    .toArray();

  const distribution: Record<string, { count: number; revenue: number }> = {};

  for (const payment of payments) {
    const category = categorizeAgent(payment.userAgent);
    if (!distribution[category]) {
      distribution[category] = { count: 0, revenue: 0 };
    }
    distribution[category].count++;
    distribution[category].revenue += payment.amount;
  }

  return distribution;
}`}
              language="typescript"
            />
          </div>
        </section>

        {/* Visualization Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <Activity className="h-6 w-6 text-amber-400" />
            시각화 예시
          </h2>
          <p className="text-white/60 mb-6">
            수집된 데이터를 대시보드로 시각화하는 예시입니다.
          </p>

          {/* Mock Dashboard */}
          <div className="glass rounded-xl p-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-white/50 text-sm mb-1">이번 달 수익</p>
                <p className="text-2xl font-bold text-emerald-400">$127.45</p>
                <p className="text-emerald-400/60 text-xs">+23% vs 지난달</p>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-white/50 text-sm mb-1">총 요청 수</p>
                <p className="text-2xl font-bold text-blue-400">12,745</p>
                <p className="text-blue-400/60 text-xs">+15% vs 지난달</p>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-white/50 text-sm mb-1">고유 에이전트</p>
                <p className="text-2xl font-bold text-purple-400">234</p>
                <p className="text-purple-400/60 text-xs">+8% vs 지난달</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-white font-medium mb-4">인기 콘텐츠 TOP 5</h4>
              <div className="space-y-3">
                {[
                  { path: "/docs/api/authentication", requests: 1234, revenue: "$12.34" },
                  { path: "/docs/guides/quickstart", requests: 987, revenue: "$9.87" },
                  { path: "/docs/advanced/custom-pricing", requests: 756, revenue: "$15.12" },
                  { path: "/docs/api/webhooks", requests: 543, revenue: "$5.43" },
                  { path: "/docs/enterprise/security", requests: 321, revenue: "$16.05" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-black/20 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white/30 font-mono text-sm w-4">{i + 1}</span>
                      <span className="text-white/80 text-sm font-mono">{item.path}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/50 text-sm">{item.requests} 요청</span>
                      <span className="text-emerald-400 font-medium">{item.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                <h4 className="text-white font-medium mb-1">실시간 모니터링</h4>
                <p className="text-white/60 text-sm">
                  이상 패턴(갑작스러운 트래픽 증가, 실패율 상승 등)을 즉시 감지할 수 있도록 실시간 알림을 설정하세요.
                </p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-mono text-sm">2</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">데이터 보존 정책</h4>
                <p className="text-white/60 text-sm">
                  상세 로그는 90일, 집계 데이터는 영구 보존하는 등 효율적인 데이터 관리 정책을 수립하세요.
                </p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-mono text-sm">3</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">A/B 테스트</h4>
                <p className="text-white/60 text-sm">
                  다양한 가격 전략을 테스트하고 수익 최적화를 위한 데이터 기반 의사결정을 하세요.
                </p>
              </div>
            </div>

            <div className="glass rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-mono text-sm">4</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">프라이버시 고려</h4>
                <p className="text-white/60 text-sm">
                  에이전트 ID는 지갑 주소로 익명화되어 있지만, 사용 패턴 데이터는 신중하게 다루세요.
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
                  <span className="text-emerald-400 font-semibold">인기 콘텐츠</span>의 가격을 올리기보다는,
                  인기 콘텐츠와 관련된 <span className="text-amber-400 font-semibold">심화 콘텐츠</span>를 만들어
                  추가 수익을 창출하세요. 이 전략이 장기적으로 더 높은 수익을 가져옵니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/docs/advanced/custom-pricing">
              ← 커스텀 가격 전략
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
