import type { Metadata } from "next";
import { ArticleSchema } from "@/components/StructuredData";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const BASE_URL = "https://x402-learn-kr.vercel.app";
const PAGE_URL = `${BASE_URL}/learn/eip712`;

export const metadata: Metadata = {
  title: "EIP-712 서명",
  description:
    "EIP-712 타입화된 구조적 데이터 서명의 원리와 x402에서의 활용 방법을 설명합니다. USDC transferWithAuthorization을 위한 서명 구조를 알아봅니다.",
  keywords: ["EIP-712", "타입 서명", "구조적 데이터", "이더리움 서명", "transferWithAuthorization"],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "EIP-712 서명",
    description: "타입화된 구조적 데이터 서명의 원리와 x402에서의 활용",
    type: "article",
    url: PAGE_URL,
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "EIP-712 서명",
    description: "타입화된 구조적 데이터 서명의 원리와 x402 활용",
    images: [`${BASE_URL}/learn/opengraph-image`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ArticleSchema
        title="EIP-712 서명"
        description="EIP-712 타입화된 구조적 데이터 서명의 원리와 x402에서의 활용 방법을 설명합니다. USDC transferWithAuthorization을 위한 서명 구조를 알아봅니다."
        url={PAGE_URL}
        section="Cryptography"
      />
      <BreadcrumbSchema
        items={[
          { name: "홈", url: BASE_URL },
          { name: "배우기", url: `${BASE_URL}/learn` },
          { name: "EIP-712 서명", url: PAGE_URL },
        ]}
      />
      {children}
    </>
  );
}
