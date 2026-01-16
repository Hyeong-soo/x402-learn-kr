import type { Metadata } from "next";
import { ArticleSchema } from "@/components/StructuredData";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/learn/components`;

export const metadata: Metadata = {
  title: "x402 구성 요소",
  description:
    "x402 프로토콜의 4가지 핵심 구성 요소를 설명합니다. 클라이언트, 리소스 서버, 퍼실리테이터, 블록체인 네트워크의 역할과 상호작용 방식을 알아봅니다.",
  keywords: ["x402 구성 요소", "클라이언트", "리소스 서버", "퍼실리테이터", "블록체인"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "x402 구성 요소",
    description: "클라이언트, 서버, 퍼실리테이터, 블록체인 네트워크의 역할과 상호작용",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "x402 구성 요소",
    description: "x402 프로토콜의 4가지 핵심 구성 요소 설명",
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title="x402 구성 요소"
        description="x402 프로토콜의 4가지 핵심 구성 요소를 설명합니다. 클라이언트, 리소스 서버, 퍼실리테이터, 블록체인 네트워크의 역할과 상호작용 방식을 알아봅니다."
        url={PAGE_URL}
        section="Architecture"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "배우기", url: `${BASE_URL}/learn` },
          { name: "구성 요소", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
