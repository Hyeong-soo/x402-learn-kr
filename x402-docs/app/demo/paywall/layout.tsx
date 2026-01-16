import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/demo/paywall`;

export const metadata: Metadata = {
  title: "페이월 체험",
  description:
    "x402 페이월의 사람 vs AI 접근 차이를 직접 체험해보세요. 브라우저에서는 무료, AI 에이전트는 결제가 필요한 구조를 확인할 수 있습니다.",
  keywords: ["x402 페이월", "AI 결제 데모", "사람 무료", "AI 유료", "접근 제어"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 페이월 체험",
    description: "사람 vs AI 접근 차이를 직접 체험해보세요",
    type: "website",
    url: PAGE_URL,
    images: [`${BASE_URL}/demo/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 페이월 체험",
    description: "사람 vs AI 접근 차이 체험",
    images: [`${BASE_URL}/demo/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "데모", url: `${BASE_URL}/demo` },
          { name: "페이월", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
