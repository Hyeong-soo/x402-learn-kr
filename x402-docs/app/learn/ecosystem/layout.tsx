import type { Metadata } from "next";
import { ArticleSchema } from "@/components/StructuredData";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/learn/ecosystem`;

export const metadata: Metadata = {
  title: "x402 생태계",
  description:
    "x402 프로토콜을 지원하는 기업들과 SDK를 소개합니다. Coinbase, Google, Visa 등 주요 파트너와 TypeScript, Python, Go SDK 활용 방법을 알아봅니다.",
  keywords: ["x402 생태계", "Coinbase", "x402 SDK", "AI 결제 파트너", "블록체인 생태계"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 생태계",
    description: "x402 프로토콜을 지원하는 기업들과 SDK 소개",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 생태계",
    description: "x402 프로토콜을 지원하는 기업들과 SDK",
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title="x402 생태계"
        description="x402 프로토콜을 지원하는 기업들과 SDK를 소개합니다. Coinbase, Google, Visa 등 주요 파트너와 TypeScript, Python, Go SDK 활용 방법을 알아봅니다."
        url={PAGE_URL}
        section="Industry"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "배우기", url: `${BASE_URL}/learn` },
          { name: "생태계", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
