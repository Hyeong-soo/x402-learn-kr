import type { Metadata } from "next";
import { ArticleSchema } from "@/components/StructuredData";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/learn/how-it-works`;

export const metadata: Metadata = {
  title: "x402 작동 원리",
  description:
    "x402 프로토콜의 결제 플로우를 상세히 설명합니다. HTTP 요청, 402 응답, EIP-712 서명 생성, 퍼실리테이터 검증까지 전체 과정을 단계별로 알아봅니다.",
  keywords: ["x402 작동 원리", "결제 플로우", "402 응답", "EIP-712 서명", "퍼실리테이터"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 작동 원리",
    description: "x402 프로토콜의 결제 플로우를 상세히 설명합니다",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 작동 원리",
    description: "x402 프로토콜의 결제 플로우 상세 설명",
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title="x402 작동 원리"
        description="x402 프로토콜의 결제 플로우를 상세히 설명합니다. HTTP 요청, 402 응답, EIP-712 서명 생성, 퍼실리테이터 검증까지 전체 과정을 단계별로 알아봅니다."
        url={PAGE_URL}
        section="Protocol Design"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "배우기", url: `${BASE_URL}/learn` },
          { name: "작동 원리", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
