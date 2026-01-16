import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/docs/advanced/analytics`;

export const metadata: Metadata = {
  title: "분석 및 수익 추적",
  description:
    "x402를 통한 AI 에이전트 사용 패턴 분석과 수익 지표 추적 방법을 알아봅니다. 핵심 KPI, 대시보드 구축, 콘텐츠 전략 최적화 가이드.",
  keywords: ["x402 분석", "AI 사용 분석", "수익 추적", "API 분석", "콘텐츠 최적화"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 분석 및 수익 추적",
    description: "AI 에이전트 사용 패턴 분석과 수익 지표 추적",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/docs/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 분석 및 수익 추적",
    description: "AI 사용 패턴 분석과 수익 추적 가이드",
    images: [`${BASE_URL}/docs/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "문서", url: `${BASE_URL}/docs` },
          { name: "고급", url: `${BASE_URL}/docs/advanced` },
          { name: "분석", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
