import type { Metadata } from "next";
import { ArticleSchema } from "@/components/StructuredData";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/learn/what-is-x402`;

export const metadata: Metadata = {
  title: "x402란 무엇인가?",
  description:
    "HTTP 402 Payment Required 상태 코드를 활용한 인터넷 네이티브 결제 프로토콜 x402의 개념과 역사를 알아봅니다. AI 에이전트 자동 결제의 새로운 표준.",
  keywords: ["x402", "HTTP 402", "Payment Required", "AI 결제", "인터넷 결제 프로토콜"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402란 무엇인가?",
    description: "HTTP 402 상태 코드를 활용한 인터넷 네이티브 결제 프로토콜의 개념과 역사",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402란 무엇인가?",
    description: "HTTP 402 상태 코드를 활용한 인터넷 네이티브 결제 프로토콜",
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title="x402란 무엇인가?"
        description="HTTP 402 Payment Required 상태 코드를 활용한 인터넷 네이티브 결제 프로토콜 x402의 개념과 역사를 알아봅니다."
        url={PAGE_URL}
        section="Blockchain Technology"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "배우기", url: `${BASE_URL}/learn` },
          { name: "x402란?", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
