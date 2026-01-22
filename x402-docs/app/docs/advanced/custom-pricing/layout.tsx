import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://www.learn402.xyz";
const PAGE_URL = `${BASE_URL}/docs/advanced/custom-pricing`;

export const metadata: Metadata = {
  title: "커스텀 가격 전략",
  description:
    "x402에서 콘텐츠 유형, 복잡도, 사용 패턴에 따른 동적 가격 책정을 구현하는 방법을 알아봅니다. 시간대별, 볼륨 기반 가격 전략 예제 포함.",
  keywords: ["x402 가격 전략", "동적 가격 책정", "API 가격 정책", "마이크로페이먼트 전략"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 커스텀 가격 전략",
    description: "콘텐츠 유형과 사용 패턴에 따른 동적 가격 책정 구현",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/docs/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 커스텀 가격 전략",
    description: "동적 가격 책정 구현 가이드",
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
          { name: "가격 전략", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
